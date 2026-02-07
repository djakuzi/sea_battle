import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@app-redux/store';
import { saveStateLocalStorage } from '@app-common/script/utils/localStorage';
import { actionsAspectRatio, TypeAspectRatio, KEY_ASPECT_RATIO } from '@app-redux/slice/aspect-ratio/aspectRatio.slice';
import { STANDARD_ASPECT_RATIOS } from '@app-core/data/acpect-ratio/standartAspectRatio';


function calculateAspectRatio(): string | undefined {
  if (typeof window === 'undefined' || !window.screen) {
    return undefined;
  }

  const screenWidth = window.screen.width;
  const screenHeight = window.screen.height;

  if (!screenWidth || !screenHeight || isNaN(screenWidth) || isNaN(screenHeight)) {
    return undefined;
  }

  const aspectRatio = screenWidth / screenHeight;

  const EPSILON = 0.01;

  for (const [name, ratio] of STANDARD_ASPECT_RATIOS) {
    if (Math.abs(aspectRatio - ratio) < EPSILON) {
      return name;
    }
  }

  let closestRatio = STANDARD_ASPECT_RATIOS[0][0];
  let minDiff = Infinity;

  for (const [name, ratio] of STANDARD_ASPECT_RATIOS) {
    const diff = Math.abs(aspectRatio - ratio);
    if (diff < minDiff) {
      minDiff = diff;
      closestRatio = name;
    }
  }

  if (minDiff > 0.1) {
    return simplifyRatio(screenWidth, screenHeight);
  }

  return closestRatio;
}

function simplifyRatio(width: number, height: number): string {
  const w = Math.round(width);
  const h = Math.round(height);
  const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : a);
  const divisor = gcd(w, h);
  return `${w / divisor}:${h / divisor}`;
}

export function useAspectRatio() {
  const dispatch = useDispatch();
  const aspectRatio = useSelector((state: RootState) => state.aspectRatio.aspectRatio);

  function setAspectRatio(): void {
    const res = calculateAspectRatio();
    const isAspectRatio = res === aspectRatio;

    if (!aspectRatio || (!isAspectRatio && res)) {
      dispatch(actionsAspectRatio.setAspectRatio(res));
      saveStateLocalStorage<TypeAspectRatio>(KEY_ASPECT_RATIO, res);
    } else if (!res) {
      const error = 'Произошла ошибка. Похоже размер вашего экрана не поддерживается. Попробуйте перезайти в игрую';

      dispatch(actionsAspectRatio.setError(error));
      dispatch(actionsAspectRatio.setAspectRatio(undefined));
      console.error(error);
    }
  }

  useEffect(() => {
    setAspectRatio();
    window.addEventListener('resize', setAspectRatio);

    return (): void => {
      window.removeEventListener('resize', setAspectRatio);
    };
  }, []);

  return {
    aspectRatio
  };
}

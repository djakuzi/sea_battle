import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@app-redux/store';
import { saveStateLocalStorage } from '@app-common/script/utils/localStorage';
import { actionsAspectRatio, KEY_ASPECT_RATIO, TypeAspectRatio } from '@app-redux/slice/aspectRatio.slice';

const STANDARD_RATIOS: [string, number][] = [
  ['1:1', 1 / 1],
  ['5:4', 5 / 4],
  ['4:3', 4 / 3],
  ['3:2', 3 / 2],
  ['16:10', 16 / 10],
  ['16:9', 16 / 9],
  ['18:9', 18 / 9],
  ['19:9', 19 / 9],
  ['19.5:9', 19.5 / 9],
  ['20:9', 20 / 9],
  ['21:9', 21 / 9],
  ['32:9', 32 / 9],
];

// Выносим логику определения соотношения в отдельную функцию
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

  for (const [name, ratio] of STANDARD_RATIOS) {
    if (Math.abs(aspectRatio - ratio) < EPSILON) {
      return name;
    }
  }

  let closestRatio = STANDARD_RATIOS[0][0];
  let minDiff = Infinity;

  for (const [name, ratio] of STANDARD_RATIOS) {
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

// Создаем кастомный хук
export function useAspectRatio(): string | undefined {
  const dispatch = useDispatch();
  const aspectRatio = useSelector((state: RootState) => state.aspectRatio.aspectRatio);

  function setAspectRatio(): void {
    const res = calculateAspectRatio();
    const isAspectRatio = res === aspectRatio;

    if (!aspectRatio || (!isAspectRatio && res)) {
      dispatch(actionsAspectRatio.set(res));
      saveStateLocalStorage<TypeAspectRatio>(KEY_ASPECT_RATIO, res);
    } else if (!res) {
      const error = 'Произошла ошибка. Похоже размер вашего экрана не поддерживается. Попробуйте перезайти в игрую';

      dispatch(actionsAspectRatio.setError(error));
      dispatch(actionsAspectRatio.set(undefined));
      console.error(error);
    }
  }

  useEffect(() => {
    setAspectRatio();
    window.addEventListener('resize', setAspectRatio);

    // Убираем обработчик при размонтировании
    return (): void => {
      window.removeEventListener('resize', setAspectRatio);
    };
  }, []);

  return aspectRatio;
}

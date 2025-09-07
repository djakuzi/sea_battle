import { useState, useEffect, useCallback, RefObject } from 'react';

function getWidthRect(rect: HTMLDivElement | null): number {
  if (!rect) return 0;
  return rect.offsetWidth / 10;
}

function debounce<T extends (...args: unknown[]) => void>(func: T, delay: number): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function (this: unknown, ...args: Parameters<T>) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}

export function useGetWidthRect(ref: RefObject<HTMLDivElement | null> | undefined): number {
  const [widthRect, setWidthRect] = useState<number>(0);

  const updateWidth = useCallback(() => {
    if (!ref || !ref.current) return;
    const newWidth = getWidthRect(ref.current);
    setWidthRect((prev) => (prev !== newWidth ? newWidth : prev));
  }, [ref]);

  useEffect(() => {
    if (!ref || !ref.current) return;

    const observer = new ResizeObserver((entries: ResizeObserverEntry[]) => {
      for (const entry of entries) {
        if (entry.target === ref.current) {
            const updateDebounce = debounce(updateWidth, 10);
            updateDebounce();
        }
      }
    });

    observer.observe(ref.current);
    updateWidth();

    return ():void => {
      observer.disconnect();
    };
  }, [ref, updateWidth]);

  return widthRect;
}

import React, { useEffect, useRef } from 'react';
import { isNullOrUndefined } from '@utils';

export default function useTimeout(callback: () => void, delay?: number): void {
  const savedCallback: React.MutableRefObject<(() => void) | undefined> = useRef<() => void>();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current?.();
    }
    if (!isNullOrUndefined(delay)) {
      const id = setTimeout(tick, delay);
      return () => clearTimeout(id);
    }
  }, [delay]);
}

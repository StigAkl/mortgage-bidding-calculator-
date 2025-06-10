"use client";

import { useCallback, useRef } from "react";

export function useDebouncedUpdate<T>(
  updateFn: (value: T) => void,
  delay = 500
) {
  const timeoutRef = useRef<NodeJS.Timeout>(null);

  const debouncedUpdate = useCallback(
    (value: T) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        updateFn(value);
      }, delay);
    },
    [updateFn, delay]
  );

  return debouncedUpdate;
}

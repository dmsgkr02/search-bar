import React, { useState, useEffect } from 'react';

const ARROW_DOWN = 'ArrowDown';
const ARROW_UP = 'ArrowUp';

export default function useKeyEvent(
  length: number,
  isFocus: boolean,
): [number, (event: React.KeyboardEvent<HTMLInputElement>) => void] {
  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    setActiveIndex(-1);
  }, [length, isFocus]);

  const onKeyListener = (event: React.KeyboardEvent) => {
    switch (event.key) {
      case ARROW_UP: {
        if (activeIndex <= -1) {
          setActiveIndex(length);
          break;
        }
        setActiveIndex(prev => prev - 1);
        break;
      }
      case ARROW_DOWN: {
        if (activeIndex >= length) {
          setActiveIndex(-1);
          break;
        }
        setActiveIndex(prev => prev + 1);
        break;
      }
      default: {
        break;
      }
    }
  };

  return [activeIndex, onKeyListener];
}

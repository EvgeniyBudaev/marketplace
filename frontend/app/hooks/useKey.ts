import { useEffect, useState } from "react";

type TKeyPressed = {
  enter: boolean;
  event: KeyboardEvent | null;
  keydown: boolean;
  keyup: boolean;
};

export const useKey = (targetKey: string): TKeyPressed => {
  const [keyPressed, setKeyPressed] = useState<TKeyPressed>({
    enter: false,
    event: null,
    keydown: false,
    keyup: false,
  });

  useEffect(() => {
    const enterHandler = (event: KeyboardEvent) => {
      if (event.key === targetKey) {
        setKeyPressed((prevState) => ({
          ...prevState,
          enter: true,
          event,
          keydown: false,
          keyup: false,
        }));
      }
    };
    const downHandler = (event: KeyboardEvent) => {
      if (event.key === targetKey) {
        setKeyPressed((prevState) => ({
          ...prevState,
          enter: false,
          event,
          keydown: true,
          keyup: false,
        }));
      }
    };
    const upHandler = (event: KeyboardEvent) => {
      if (event.key === targetKey) {
        setKeyPressed((prevState) => ({
          ...prevState,
          enter: false,
          event,
          keydown: false,
          keyup: true,
        }));
      }
    };

    window.addEventListener("keypress", enterHandler);
    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);

    return () => {
      window.removeEventListener("keypress", enterHandler);
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
    };
  }, [targetKey]);

  return keyPressed;
};

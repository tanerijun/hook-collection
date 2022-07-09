// useClickOutside check if a click happened outside the element (elRef)
// implemented using Node.contains()

import { useEffect, useRef } from "react";

export default function useClickOutside(
  elRef: React.RefObject<HTMLButtonElement>,
  callback: Function
) {
  // callbackRef is used for optimization, otherwise the users will have to wrap their callback in React.useCallback themselves
  const callbackRef = useRef<Function>();
  callbackRef.current = callback;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        !(elRef?.current?.contains(e.target as Node) && callbackRef.current)
      ) {
        callbackRef.current!(e);
      }
    };

    document.addEventListener("click", handleClickOutside, true);

    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [elRef, callbackRef]);
}

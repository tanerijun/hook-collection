// useClickOutside check if a click happened outside the element (elRef)
// implemented using Node.contains()

import { useEffect, useRef } from "react";

export default function useClickOutside(
  elRef: React.RefObject<HTMLButtonElement>,
  callback: Function
) {
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!(elRef?.current?.contains(e.target as Node) && callback)) {
        callback(e);
      }
    };

    document.addEventListener("click", handleClickOutside, true);

    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [elRef, callback]);
}

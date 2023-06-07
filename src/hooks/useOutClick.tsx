import { useEffect, useRef } from "react";

export const useOutClick = (callback: () => void) => {
  const ref = useRef(null);

  useEffect(() => {
    /* montagem */
    function modalOutClick(event: any) {
      const target = event.target;
      const element: any = ref.current;

      if (!element.contains(target)) {
        callback();
      }
    }
    window.addEventListener("mousedown", modalOutClick);

    return () => {
      window.removeEventListener("mousedown", modalOutClick);
    };
  }, []);

  return ref;
};

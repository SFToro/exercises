import { useRef, useCallback, useState } from "react";

export const useDebouncer = () => {
  // const [debouncedInput, setDebounced] = useState("");
  const timeoutRef = useRef(0);

  // const debounce = useCallback(({ query, cb }) => {
  //   clearTimeout(timeoutRef.current);
  //   timeoutRef.current = setTimeout(() => {
  //     setDebounced(query);
  //     cb({ query });
  //   }, 750);
  // }, []);

  const debounce = ({ query }) => {
    clearTimeout(timeoutRef.current);

    return new Promise((resolve, reject) => {
      timeoutRef.current = setTimeout(() => {
        resolve(query);
      }, 750);
    });
  };

  return { debounce };
};

import { useEffect } from "react";

const useOnDestroy = (callback: () => void) => {
  useEffect(() => {
    return () => {
      callback();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useOnDestroy;

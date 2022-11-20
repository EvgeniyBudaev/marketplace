import { useState, useCallback, useRef, useEffect } from "react";

const useWindowScroll = ({ timerLength }): boolean => {
  const [isOffset, setIsOffset] = useState(false);
  const timer = useRef(0);

  const handleScrollEvent = useCallback(() => {
    const offset = window.pageYOffset;
    setIsOffset(offset > 60);
  }, []);

  const handleScroll = useCallback(() => {
    if (timer.current) clearTimeout(timer.current);
    setTimeout(handleScrollEvent, timerLength);
  }, [handleScrollEvent, timerLength]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll, timerLength]);

  return isOffset;
};

export default useWindowScroll;

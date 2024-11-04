import React, { useEffect, useState } from "react";

export const useHover = (ref: any, dep: any) => {
  const [isHover, setIsHover] = useState(false);

  const handleIsHover = () => setIsHover(true);
  const handleNottHover = () => setIsHover(false);

  useEffect(() => {
    if (!ref.current) return;

    ref.current.addEventListener("mouseenter", handleIsHover);
    ref.current.addEventListener("mouseleave", handleNottHover);

    return () => {
      if (ref.current) {
        ref.current.removeEventListener("mouseenter", handleIsHover);
        ref.current.removeEventListener("mouseleave", handleNottHover);
      }
    };
  }, [dep]);

  return { isHover };
};

import React, { useState, useEffect } from "react";
import CircularProgressButton from "./CircularProgressButton";

const CircleProgress = () => {
  const [percentage, setPercentage] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercentage = (scrollTop / scrollHeight) * 100;
    setPercentage(Math.min(100, Math.max(0, scrollPercentage)));
    setIsVisible(scrollTop > 0);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      {isVisible && (
        <CircularProgressButton percentage={percentage} onClick={scrollToTop} />
      )}
    </div>
  );
};

export default CircleProgress;

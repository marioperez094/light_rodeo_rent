//External Imports
import { useState, useEffect } from "react";

const useInView = (options: {}) => {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
    );

    const element = document.getElementById(options.id);
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    }; 
  }, []);

  return isInView;
};

export default useInView;
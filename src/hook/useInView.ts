import { useEffect, useRef, useState } from 'react';

const useInView = (callback: () => void) => {
  const [isInView, setIsInView] = useState<boolean>(false);
  const elementRef = useRef<any>(null);

  const observerCallBack = (entrys: IntersectionObserverEntry[]) => {
    const [entry] = entrys;
    setIsInView(entry.isIntersecting);
    if (entry.isIntersecting === true) {
      callback();
    }
  };
  useEffect(() => {
    const observer = new IntersectionObserver(observerCallBack, { threshold: 0.5 });
    if (elementRef.current) {
      observer.observe(elementRef.current);
    }
    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  });

  return { isInView, elementRef };
};

export default useInView;

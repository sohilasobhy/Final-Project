import React, { useEffect, useRef } from 'react';
import Odometer from 'odometer';
import 'odometer/themes/odometer-theme-default.css';
import 'intersection-observer'; // Import the polyfill if you installed it

const Counter = ({ initialCount = 0, targetValue = 45.2, incrementValue = 0.1, updateInterval = 100, format = '(,ddd)', duration = 2000 }) => {
  const odometerRef = useRef(null);
  const countRef = useRef(initialCount);
  const observerRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    const odometer = new Odometer({
      el: odometerRef.current,
      value: initialCount,
      format: '(,ddd).dd',
      duration,
    });
    odometer.render();

    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          intervalRef.current = setInterval(() => {
            if (countRef.current < targetValue) {
              countRef.current += incrementValue;
              if (countRef.current > targetValue) {
                countRef.current = targetValue;
              }
              odometer.update(countRef.current.toFixed(1));
            } else {
              clearInterval(intervalRef.current);
            }
          }, updateInterval);

          if (observerRef.current) {
            observerRef.current.disconnect();
          }
        }
      });
    };

    observerRef.current = new IntersectionObserver(handleIntersection, {
      threshold: 0.1,
    });

    if (odometerRef.current) {
      observerRef.current.observe(odometerRef.current);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [initialCount, targetValue, incrementValue, updateInterval, duration]);

  return (
    <div className='d-flex align-items-center gap-2'>
      <div ref={odometerRef} />
    </div>
  );
};

export default Counter;

import { useEffect, useState } from "react";

const AnimatedCounter = ({ value, prefix = "", suffix = "", duration = 1200, className = "" }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const endValue = Number(value);
    if (Number.isNaN(endValue)) return;

    let startTime = null;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const nextValue = Math.floor(endValue * eased);

      setDisplayValue(nextValue);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setDisplayValue(endValue);
      }
    };

    requestAnimationFrame(step);
  }, [value, duration]);

  return (
    <span className={className}>
      {prefix}
      {displayValue.toLocaleString()}
      {suffix}
    </span>
  );
};

export default AnimatedCounter;

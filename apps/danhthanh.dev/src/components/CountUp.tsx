import { animate } from 'motion/react';
import { useEffect, useRef } from 'react';

interface CountUpProps {
  from: number;
  to: number;
}

function CountUp({ from, to }: CountUpProps) {
  const nodeRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = nodeRef.current;
    if (!node) return () => {}; // ✅ Always return a function

    const controls = animate(from, to, {
      duration: 1.4,
      ease: 'easeOut',
      onUpdate(value) {
        node.textContent = Math.round(value).toString();
      },
    });

    return () => controls.stop(); // ✅ Consistent return type
  }, [from, to]);

  return <span ref={nodeRef}>{to}</span>;
}

export default CountUp;

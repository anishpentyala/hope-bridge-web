import { useState, useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';

/**
 * Parses a display value like "5,000+", "$25", "100%", "5K+", "2 hrs"
 * Returns { prefix, num, suffix, formatted }
 */
function parseValue(val) {
  const s = String(val).trim();
  // Match optional prefix (non-digit/dot), then number (with commas), then suffix
  const match = s.match(/^([^0-9]*)([0-9,]+(?:\.[0-9]*)?)(.*)$/);
  if (!match) return { prefix: '', num: 0, suffix: s };
  return {
    prefix: match[1],
    num: parseFloat(match[2].replace(/,/g, '')),
    suffix: match[3],
  };
}

/**
 * Formats a number back with commas if >= 1000
 */
function fmt(n, originalNum) {
  if (originalNum >= 1000) return Math.round(n).toLocaleString();
  if (Number.isInteger(originalNum)) return Math.round(n).toString();
  return n.toFixed(1);
}

/**
 * CountUp — animates a numeric stat from 0 to its target when it enters the viewport.
 *
 * Usage:
 *   <CountUp value="5,000+" className="text-5xl font-black text-blue-600" />
 *   <CountUp value="$25"    className="text-4xl font-black text-gray-900" />
 *   <CountUp value="100%"   className="text-3xl font-black text-blue-600" />
 *
 * Props:
 *   value      — original string like "5,000+", "$25", "100%", "5K+", "2 hrs"
 *   className  — CSS classes for the span
 *   duration   — animation duration in ms (default 1600)
 */
export default function CountUp({ value, className = '', duration = 1600 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 });
  const [display, setDisplay] = useState('0');
  const { prefix, num, suffix } = parseValue(value);

  useEffect(() => {
    if (!isInView) return;
    if (num === 0) { setDisplay('0'); return; }

    let startTime = null;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Cubic ease-out
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(fmt(eased * num, num));
      if (progress < 1) requestAnimationFrame(animate);
    };

    const raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [isInView, num, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}{display}{suffix}
    </span>
  );
}

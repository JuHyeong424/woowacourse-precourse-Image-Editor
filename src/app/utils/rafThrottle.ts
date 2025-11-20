export default function rafThrottle<T extends any[]>(fn: (...args: T) => void) {
  let ticking = false;

  return (...args: T): void => {
    if (ticking) return;

    ticking = true;

    requestAnimationFrame(() => {
      fn(...args);
      ticking = false;
    });
  };
}

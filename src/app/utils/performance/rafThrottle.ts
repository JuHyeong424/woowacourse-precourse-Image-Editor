export default function rafThrottle<T>(fn: (arg: T) => void) {
  let ticking = false;

  return (arg: T) => {
    if (ticking) return;

    ticking = true;

    requestAnimationFrame(() => {
      fn(arg);
      ticking = false;
    });
  };
}

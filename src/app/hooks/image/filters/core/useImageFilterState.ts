import {useCallback, useEffect, useState} from "react";

export default function useImageFilterState(image: HTMLImageElement | null) {
  const [filters, setFilters] = useState({
    vignette: 0,
    clarity: 0,
    shadows: 0,
    highlights: 0,
    tint: 0,
    temperature: 0,
    hue: 0,
    sharpen: false,
    blur: false,
    invert: false,
    exposure: 0,
    saturation: 100,
    contrast: 100,
    brightness: 100,
    isGray: false,
  });

  useEffect(() => {
    setFilters({ vignette: 0, clarity: 0, shadows: 0, highlights: 0, tint: 0, temperature:0, hue: 0, sharpen: false, blur: false, invert: false, exposure: 0, saturation: 100, contrast: 100, brightness: 100, isGray: false });
  }, [image]);

  const setFilter = useCallback(<K extends keyof typeof filters>(
      key: K,
      value: typeof filters[K]
    ) => {
      setFilters(prev => ({...prev, [key]: value}));
    }, []);

  return { filters, setFilter };
}

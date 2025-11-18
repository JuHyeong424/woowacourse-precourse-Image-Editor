import {useCallback, useEffect, useState} from "react";

export default function useImageFilterState(image: HTMLImageElement | null) {
  const [filters, setFilters] = useState({
    temperature: 0,
    hue: 0,
    sharpen: false,
    blur: false,
    invert: false,
    exposure: 100,
    saturation: 100,
    contrast: 100,
    brightness: 100,
    isGray: false,
  });

  useEffect(() => {
    setFilters({ temperature:0, hue: 0, sharpen: false, blur: false, invert: false, exposure: 100, saturation: 100, contrast: 100, brightness: 100, isGray: false });
  }, [image]);

  const setFilter = useCallback(<K extends keyof typeof filters>(
      key: K,
      value: typeof filters[K]
    ) => {
      setFilters(prev => ({...prev, [key]: value}));
    }, []);

  return { filters, setFilter };
}

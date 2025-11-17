import {useCallback, useEffect, useState} from "react";

export default function useImageFilterState(image: HTMLImageElement | null) {
  const [filters, setFilters] = useState({
    brightness: 100,
    isGray: false,
  });

  useEffect(() => {
    setFilters({brightness: 100, isGray: false});
  }, [image]);

  const setFilter = useCallback(<K extends keyof typeof filters>(
      key: K,
      value: typeof filters[K]
    ) => {
      setFilters(prev => ({...prev, [key]: value}));
    }, []);

  return { filters, setFilter };
}

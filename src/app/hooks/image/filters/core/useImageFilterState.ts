import {useCallback, useEffect, useState} from "react";
import {INITIAL_FILTER_STATE} from "@/app/config/filter/filterConstants";
import {FilterState} from "@/app/types/filterStateTypes";

export default function useImageFilterState(image: HTMLImageElement | null) {
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTER_STATE);

  useEffect(() => {
    setFilters(INITIAL_FILTER_STATE);
  }, [image]);


  const setFilter = useCallback(<K extends keyof typeof filters>(
      key: K,
      value: typeof filters[K]
    ) => {
      setFilters(prev => ({...prev, [key]: value}));
    }, []);

  return { filters, setFilter };
}

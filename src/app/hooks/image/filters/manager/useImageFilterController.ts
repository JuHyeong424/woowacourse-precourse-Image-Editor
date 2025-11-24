import {WasmModule} from "@/lib/wasm-loader";
import {GetCanvasImageData} from "@/app/types/filterTypes";
import {useCallback, useEffect, useMemo} from "react";
import useImageFilterState from "@/app/hooks/image/filters/core/useImageFilterState";
import useImageFilterPipeline from "@/app/hooks/image/filters/pipeline/useImageFilterPipeline";
import rafThrottle from "@/app/utils/performance/rafThrottle";
import {FilterState} from "@/app/types/filterStateTypes";
import {FINAL_FILTER_APPLY_DELAY} from "@/app/config/filter/filter";
import useImageFilters from "@/app/hooks/image/filters/manager/useImageFilters";
import {getFilterConfigs} from "@/app/config/filter/filterConfigs";
import {mapAiFilters} from "@/app/utils/ai/mapAiFilters";

interface UseImageFilterControllerProps {
  wasm: WasmModule | null;
  image: HTMLImageElement | null;
  originalPixels: ImageData["data"] | null;
  getCanvasImageData: GetCanvasImageData;
}

export default function useImageFilterController({ wasm, image, originalPixels, getCanvasImageData }: UseImageFilterControllerProps) {
  const filterFunctions = useImageFilters();

  const {filters, setFilter} = useImageFilterState(image);

  const filterConfigs = useMemo(() => getFilterConfigs(filterFunctions), [filterFunctions]);

  const applyAllFilters = useImageFilterPipeline({
    wasm,
    image,
    originalPixels,
    getCanvasImageData,
    filters: filterFunctions,
    filterConfigs
  });

  const disabled = !wasm || !image;

  const throttledApply = useMemo(
    () => rafThrottle((f: FilterState) => applyAllFilters(f)),
    [applyAllFilters]
  );

  useEffect(() => {
    if (disabled) return;

    throttledApply(filters);

    const id = setTimeout(() => {
      applyAllFilters(filters);
    }, FINAL_FILTER_APPLY_DELAY);

    return () => clearTimeout(id);
  }, [filters, disabled, throttledApply, applyAllFilters]);

  const applyFiltersFromAi = useCallback((params: FilterState) => {
      const mapped = mapAiFilters(params);

      (Object.keys(mapped) as (keyof FilterState)[]).forEach((key) => {
        setFilter(key, mapped[key]);
      });
    },
    [setFilter]
  );

  return {
    filters,
    setFilter,
    applyAllFilters,
    disabled,
    applyFiltersFromAi
  };
}

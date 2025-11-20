import {WasmModule} from "@/lib/wasm-loader";
import {GetCanvasImageData} from "@/app/types/filterTypes";
import {useEffect, useMemo} from "react";
import useImageFilterState from "@/app/hooks/image/filters/core/useImageFilterState";
import useImageFilterPipeline from "@/app/hooks/image/filters/pipeline/useImageFilterPipeline";
import rafThrottle from "@/app/utils/rafThrottle";
import {FilterState} from "@/app/types/filterStateTypes";
import useFilterFunctions from "@/app/hooks/image/filters/manager/useFilterFunctions";
import {FINAL_FILTER_APPLY_DELAY} from "@/app/constants/filter";

interface UseImageFilterControllerProps {
  wasm: WasmModule | null;
  image: HTMLImageElement | null;
  originalPixels: ImageData["data"] | null;
  getCanvasImageData: GetCanvasImageData;
}

export default function useImageFilterController(
  {
    wasm,
    image,
    originalPixels,
    getCanvasImageData
  }: UseImageFilterControllerProps) {
  const filterFunctions = useFilterFunctions();

  const {filters, setFilter} = useImageFilterState(image);

  const applyAllFilters = useImageFilterPipeline({
    wasm,
    image,
    originalPixels,
    getCanvasImageData,
    filters: filterFunctions
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

  return {
    filters,
    setFilter,
    applyAllFilters,
    disabled
  };
}

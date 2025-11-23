import {WasmModule} from "@/lib/wasm-loader";
import {GetCanvasImageData} from "@/app/types/filterTypes";
import {useCallback, useEffect, useMemo} from "react";
import useImageFilterState from "@/app/hooks/image/filters/core/useImageFilterState";
import useImageFilterPipeline from "@/app/hooks/image/filters/pipeline/useImageFilterPipeline";
import rafThrottle from "@/app/utils/rafThrottle";
import {FilterState} from "@/app/types/filterStateTypes";
import {FINAL_FILTER_APPLY_DELAY} from "@/app/constants/filter";
import useImageFilters from "@/app/hooks/image/filters/manager/useImageFilters";
import {getFilterConfigs} from "@/app/config/filterConfigs";

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

  const applyFiltersFromAi = useCallback((p: FilterState) => {
    const mapped: FilterState = {
      brightness: 100 + p.brightness,
      contrast: 100 + p.contrast,
      saturation: 100 + p.saturation,
      exposure: p.exposure,
      temperature: p.temperature,
      tint: p.tint,
      highlights: p.highlights,
      shadows: p.shadows,
      clarity: p.clarity,

      vignette: p.vignette,
      hue: p.hue,

      sharpen: p.sharpen,
      blur: p.blur,
      invert: p.invert,
      isGray: p.isGray,
    };

    (Object.keys(mapped) as (keyof FilterState)[]).forEach((key) => {
      setFilter(key, mapped[key]);
    });
  }, [setFilter]);

  return {
    filters,
    setFilter,
    applyAllFilters,
    disabled,
    applyFiltersFromAi
  };
}

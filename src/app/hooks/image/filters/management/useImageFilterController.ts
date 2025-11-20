import useImageFilters from "@/app/hooks/image/filters/management/useImageFilters";
import {WasmModule} from "@/lib/wasm-loader";
import {GetCanvasImageData} from "@/app/types/filterTypes";
import {useCallback, useEffect, useMemo} from "react";
import useImageFilterState from "@/app/hooks/image/filters/management/useImageFilterState";
import useImageFilterPipeline from "@/app/hooks/image/filters/management/useImageFilterPipeline";
import rafThrottle from "@/app/utils/rafThrottle";

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
  const {
    applyVignette,
    applyClarity,
    applyHighlightShadow,
    applyTint,
    applyTemperature,
    applyHue,
    applySharpen,
    applyBlur,
    applyInvert,
    applyExposure,
    applySaturation,
    applyContrast,
    applyBrightness,
    applyGrayscale,
    resetColor
  } = useImageFilters();

  const { filters, setFilter } = useImageFilterState(image);

  const applyAllFilters = useCallback(
    useImageFilterPipeline({
    wasm,
    image,
    originalPixels,
    getCanvasImageData,
    applyVignette,
    applyClarity,
    applyHighlightShadow,
    applyTint,
    applyTemperature,
    applyHue,
    applySharpen,
    applyBlur,
    applyInvert,
    applyExposure,
    applySaturation,
    applyContrast,
    applyBrightness,
    applyGrayscale,
    resetColor
  }), [wasm, image, originalPixels]);

  const disabled = !wasm || !image;
  const throttledApply = useMemo(
    () => rafThrottle(applyAllFilters),
    [applyAllFilters]
  );

  useEffect(() => {
    if (disabled) return;
    throttledApply(filters);
  }, [filters, throttledApply, disabled]);

  useEffect(() => {
    if (disabled) return;

    const id = setTimeout(() => {
      applyAllFilters(filters);
    }, 120);

    return () => clearTimeout(id);
  }, [filters]);

  return {
    filters,
    setFilter,
    applyAllFilters,
    disabled
  };
}

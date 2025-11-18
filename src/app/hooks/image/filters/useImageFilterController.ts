import useImageFilters from "@/app/hooks/image/filters/useImageFilters";
import {WasmModule} from "@/lib/wasm-loader";
import {GetCanvasImageData} from "@/app/types/filterTypes";
import {useEffect} from "react";
import useImageFilterState from "@/app/hooks/image/filters/useImageFilterState";
import useImageFilterPipeline from "@/app/hooks/image/filters/useImageFilterPipeline";

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
  const { applyContrast, applyBrightness, applyGrayscale, resetColor } = useImageFilters();

  const { filters, setFilter } = useImageFilterState(image);

  const applyAllFilters = useImageFilterPipeline({
    wasm,
    image,
    originalPixels,
    getCanvasImageData,
    applyContrast,
    applyBrightness,
    applyGrayscale,
    resetColor
  });

  useEffect(() => {
    applyAllFilters(filters);
  }, [filters, applyAllFilters]);

  const disabled = !wasm || !image;

  return {
    filters,
    setFilter,
    applyAllFilters,
    disabled
  };
}

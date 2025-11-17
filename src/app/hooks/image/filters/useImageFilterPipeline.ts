import {useCallback} from "react";
import {WasmModule} from "@/lib/wasm-loader";
import {ApplyBrightness, ApplyGrayscale, GetCanvasImageData, ResetColor} from "@/app/types/filterTypes";

interface Filters {
  brightness: number;
  isGray: boolean;
}

interface useImageFilterPipelineProps {
  wasm: WasmModule | null;
  image: HTMLImageElement | null;
  originalPixels: ImageData["data"] | null;
  getCanvasImageData: GetCanvasImageData;
  applyBrightness: ApplyBrightness;
  applyGrayscale: ApplyGrayscale;
  resetColor: ResetColor;
}

export default function useImageFilterPipeline({
    wasm,
    image,
    originalPixels,
    getCanvasImageData,
    applyBrightness,
    applyGrayscale,
    resetColor
}: useImageFilterPipelineProps) {
  return useCallback((filters: Filters) => {
    if (!wasm || !image || !originalPixels) return;

    resetColor(getCanvasImageData, originalPixels);

    if (filters.brightness !== 100) {
      applyBrightness(wasm, getCanvasImageData, filters.brightness, originalPixels);
    }

    if (filters.isGray) {
      applyGrayscale(wasm, getCanvasImageData);
    }
  }, [
    wasm,
    image,
    originalPixels,
    getCanvasImageData,
    applyBrightness,
    applyGrayscale,
    resetColor,
  ]);
}

import {useCallback} from "react";
import {WasmModule} from "@/lib/wasm-loader";
import {ApplyBrightness, ApplyContrast, ApplyGrayscale, GetCanvasImageData, ResetColor} from "@/app/types/filterTypes";

interface Filters {
  contrast: number;
  brightness: number;
  isGray: boolean;
}

interface useImageFilterPipelineProps {
  wasm: WasmModule | null;
  image: HTMLImageElement | null;
  originalPixels: ImageData["data"] | null;
  getCanvasImageData: GetCanvasImageData;
  applyContrast: ApplyContrast;
  applyBrightness: ApplyBrightness;
  applyGrayscale: ApplyGrayscale;
  resetColor: ResetColor;
}

export default function useImageFilterPipeline({
    wasm,
    image,
    originalPixels,
    getCanvasImageData,
    applyContrast,
    applyBrightness,
    applyGrayscale,
    resetColor
}: useImageFilterPipelineProps) {
  return useCallback((filters: Filters) => {
    if (!wasm || !image || !originalPixels) return;

    resetColor(getCanvasImageData, originalPixels);

    if (filters.brightness !== 100) {
      applyBrightness(wasm, getCanvasImageData, filters.brightness);
    }

    if (filters.contrast !== 100) {
      applyContrast(wasm, getCanvasImageData, filters.contrast);
    }

    if (filters.isGray) {
      applyGrayscale(wasm, getCanvasImageData);
    }
  }, [
    wasm,
    image,
    originalPixels,
    getCanvasImageData,
    applyContrast,
    applyBrightness,
    applyGrayscale,
    resetColor,
  ]);
}

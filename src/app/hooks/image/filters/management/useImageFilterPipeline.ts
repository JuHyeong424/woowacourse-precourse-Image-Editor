import {useCallback} from "react";
import {WasmModule} from "@/lib/wasm-loader";
import {
  ApplyBrightness,
  ApplyContrast, ApplyExposure,
  ApplyGrayscale, ApplyInvert,
  ApplySaturation,
  GetCanvasImageData,
  ResetColor
} from "@/app/types/filterTypes";

interface Filters {
  invert: boolean;
  exposure: number;
  saturation: number;
  contrast: number;
  brightness: number;
  isGray: boolean;
}

interface useImageFilterPipelineProps {
  wasm: WasmModule | null;
  image: HTMLImageElement | null;
  originalPixels: ImageData["data"] | null;
  getCanvasImageData: GetCanvasImageData;
  applyInvert: ApplyInvert;
  applyExposure: ApplyExposure;
  applySaturation: ApplySaturation;
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
    applyInvert,
    applyExposure,
    applySaturation,
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

    if (filters.saturation !== 100) {
      applySaturation(wasm, getCanvasImageData, filters.saturation);
    }

    if (filters.exposure !== 100) {
      applyExposure(wasm, getCanvasImageData, filters.exposure);
    }

    if (filters.invert) {
      applyInvert(wasm, getCanvasImageData);
    }

    if (filters.isGray) {
      applyGrayscale(wasm, getCanvasImageData);
    }
  }, [
    wasm,
    image,
    originalPixels,
    getCanvasImageData,
    applyInvert,
    applyExposure,
    applySaturation,
    applyContrast,
    applyBrightness,
    applyGrayscale,
    resetColor,
  ]);
}

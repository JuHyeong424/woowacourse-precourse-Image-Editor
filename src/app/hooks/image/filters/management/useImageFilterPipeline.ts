import {useCallback} from "react";
import {WasmModule} from "@/lib/wasm-loader";
import {
  ApplyBlur,
  ApplyBrightness,
  ApplyContrast, ApplyExposure,
  ApplyGrayscale, ApplyHue, ApplyInvert,
  ApplySaturation, ApplySharpen, ApplyTemperature, ApplyTint,
  GetCanvasImageData,
  ResetColor
} from "@/app/types/filterTypes";

interface Filters {
  tint: number;
  temperature: number;
  hue: number;
  sharpen: boolean;
  blur: boolean;
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
  applyTint: ApplyTint;
  applyTemperature: ApplyTemperature;
  applyHue: ApplyHue;
  applySharpen: ApplySharpen;
  applyBlur: ApplyBlur;
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

    if (filters.hue !== 0) {
      applyHue(wasm, getCanvasImageData, filters.hue);
    }

    if (filters.temperature !== 0) {
      applyTemperature(wasm, getCanvasImageData, filters.temperature);
    }

    if (filters.tint !== 0) {
      applyTint(wasm, getCanvasImageData, filters.tint);
    }

    if (filters.invert) {
      applyInvert(wasm, getCanvasImageData);
    }

    if (filters.blur) {
      applyBlur(wasm, getCanvasImageData);
    }

    if (filters.sharpen) {
      applySharpen(wasm, getCanvasImageData);
    }

    if (filters.isGray) {
      applyGrayscale(wasm, getCanvasImageData);
    }
  }, [
    wasm,
    image,
    originalPixels,
    getCanvasImageData,
    applyTint,
    applySharpen,
    applyBlur,
    applyInvert,
    applyExposure,
    applySaturation,
    applyContrast,
    applyBrightness,
    applyGrayscale,
    resetColor,
  ]);
}

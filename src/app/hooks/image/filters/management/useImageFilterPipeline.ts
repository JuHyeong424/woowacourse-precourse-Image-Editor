import {useCallback} from "react";
import {WasmModule} from "@/lib/wasm-loader";
import {
  ApplyBlur,
  ApplyBrightness, ApplyClarity,
  ApplyContrast, ApplyExposure,
  ApplyGrayscale, ApplyHighlightShadow, ApplyHue, ApplyInvert,
  ApplySaturation, ApplySharpen, ApplyTemperature, ApplyTint, ApplyVignette,
  GetCanvasImageData,
  ResetColor
} from "@/app/types/filterTypes";

interface Filters {
  vignette: number;
  clarity: number;
  shadows:number;
  highlights: number;
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
  filters: {
    applyVignette: ApplyVignette;
    applyClarity: ApplyClarity;
    applyHighlightShadow: ApplyHighlightShadow;
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
  };
}

export default function useImageFilterPipeline({
    wasm,
    image,
    originalPixels,
    getCanvasImageData,
    filters
}: useImageFilterPipelineProps) {
  return useCallback((state: Filters) => {
    if (!wasm || !image || !originalPixels) return;

    const {
      applyBrightness,
      applyContrast,
      applySaturation,
      applyExposure,
      applyHue,
      applyTemperature,
      applyTint,
      applyHighlightShadow,
      applyClarity,
      applyVignette,
      applyInvert,
      applyBlur,
      applySharpen,
      applyGrayscale,
      resetColor
    } = filters;

    resetColor(getCanvasImageData, originalPixels);

    if (state.brightness !== 100) applyBrightness(wasm, getCanvasImageData, state.brightness);
    if (state.contrast !== 100) applyContrast(wasm, getCanvasImageData, state.contrast);
    if (state.saturation !== 100) applySaturation(wasm, getCanvasImageData, state.saturation);
    if (state.exposure !== 0) applyExposure(wasm, getCanvasImageData, state.exposure);
    if (state.hue !== 0) applyHue(wasm, getCanvasImageData, state.hue);
    if (state.temperature !== 0) applyTemperature(wasm, getCanvasImageData, state.temperature);
    if (state.tint !== 0) applyTint(wasm, getCanvasImageData, state.tint);

    if (state.shadows !== 0 || state.highlights !== 0)
      applyHighlightShadow(wasm, getCanvasImageData, state.shadows, state.highlights);

    if (state.clarity !== 0) applyClarity(wasm, getCanvasImageData, state.clarity);
    if (state.vignette !== 0) applyVignette(wasm, getCanvasImageData, state.vignette);

    if (state.invert) applyInvert(wasm, getCanvasImageData);
    if (state.blur) applyBlur(wasm, getCanvasImageData);
    if (state.sharpen) applySharpen(wasm, getCanvasImageData);
    if (state.isGray) applyGrayscale(wasm, getCanvasImageData);
  }, [
    wasm,
    image,
    originalPixels,
    getCanvasImageData,
    filters
  ]);
}

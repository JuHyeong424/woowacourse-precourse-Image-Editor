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
import {FilterState} from "@/app/types/filterStateTypes";

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
  return useCallback((state: FilterState) => {
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

    const numericFilterMap = [
      ["brightness", applyBrightness, 100],
      ["contrast", applyContrast, 100],
      ["saturation", applySaturation, 100],
      ["exposure", applyExposure, 0],
      ["hue", applyHue, 0],
      ["temperature", applyTemperature, 0],
      ["tint", applyTint, 0],
      ["clarity", applyClarity, 0],
      ["vignette", applyVignette, 0],
    ] as const;

    numericFilterMap.forEach(([key, fn, defaultValue]) => {
      if (state[key] !== defaultValue) fn(wasm, getCanvasImageData, state[key]);
    });

    if (state.shadows !== 0 || state.highlights !== 0)
      applyHighlightShadow(wasm, getCanvasImageData, state.shadows, state.highlights);

    const booleanFilterMap = [
      ["invert", applyInvert],
      ["blur", applyBlur],
      ["sharpen", applySharpen],
      ["isGray", applyGrayscale],
    ] as const;

    booleanFilterMap.forEach(([key, fn]) => {
      if (state[key]) fn(wasm, getCanvasImageData);
    })
  }, [wasm, image, originalPixels, getCanvasImageData, filters]);
}

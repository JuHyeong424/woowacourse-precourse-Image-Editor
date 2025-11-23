import {
  ApplyBlur, ApplyBrightness,
  ApplyClarity, ApplyContrast, ApplyExposure, ApplyGrayscale,
  ApplyHighlightShadow,
  ApplyHue, ApplyInvert, ApplySaturation, ApplySharpen,
  ApplyTemperature,
  ApplyTint,
  ApplyVignette, ResetColor
} from "@/app/types/filterTypes";
import {FILTER_TYPE} from "@/app/config/filter/filterConstants";

export interface FilterFunctions {
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
}

export interface FilterState {
  vignette: number;
  clarity: number;
  shadows: number;
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

export type FilterType = typeof FILTER_TYPE[keyof typeof FILTER_TYPE];

export interface FilterConfig {
  key: keyof FilterState;
  type: FilterType;
  apply: (...args: any[]) => void;
  defaultValue?: number | boolean;
  condition?: (state: FilterState) => boolean;
}

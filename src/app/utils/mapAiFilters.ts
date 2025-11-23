// src/app/utils/mapAiFilters.ts
import { FilterState } from "@/app/types/filterStateTypes";

export function mapAiFilters(p: FilterState): FilterState {
  return {
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
}

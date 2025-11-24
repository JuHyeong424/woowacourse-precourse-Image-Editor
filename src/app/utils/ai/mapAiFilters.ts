import { FilterState } from "@/app/types/filterStateTypes";

const NORMALIZED_BASE_PERCENT = 100;

function addBasePercent (value: number): number {
  return NORMALIZED_BASE_PERCENT + value;
}

export function mapAiFilters(aiFilters: FilterState): FilterState {
  return {
    brightness: addBasePercent(aiFilters.brightness),
    contrast: addBasePercent(aiFilters.contrast),
    saturation: addBasePercent(aiFilters.saturation),
    exposure: aiFilters.exposure,
    temperature: aiFilters.temperature,
    tint: aiFilters.tint,
    highlights: aiFilters.highlights,
    shadows: aiFilters.shadows,
    clarity: aiFilters.clarity,
    vignette: aiFilters.vignette,
    hue: aiFilters.hue,
    sharpen: aiFilters.sharpen,
    blur: aiFilters.blur,
    invert: aiFilters.invert,
    isGray: aiFilters.isGray,
  };
}

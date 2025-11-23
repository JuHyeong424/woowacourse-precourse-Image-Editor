import { FilterConfig, FilterFunctions, FilterState } from "@/app/types/imageFilterTypes";
import { FILTER_TYPE, INITIAL_FILTER_STATE } from "@/app/config/filter/filterConstants";

export const getFilterConfigs = (filters: FilterFunctions): FilterConfig[] => [
  { key: 'brightness', type: FILTER_TYPE.NUMERIC, apply: filters.applyBrightness, defaultValue: INITIAL_FILTER_STATE.brightness },
  { key: 'contrast', type: FILTER_TYPE.NUMERIC, apply: filters.applyContrast, defaultValue: INITIAL_FILTER_STATE.contrast },
  { key: 'saturation', type: FILTER_TYPE.NUMERIC, apply: filters.applySaturation, defaultValue: INITIAL_FILTER_STATE.saturation },
  { key: 'exposure', type: FILTER_TYPE.NUMERIC, apply: filters.applyExposure, defaultValue: INITIAL_FILTER_STATE.exposure },
  { key: 'hue', type: FILTER_TYPE.NUMERIC, apply: filters.applyHue, defaultValue: INITIAL_FILTER_STATE.hue },
  { key: 'temperature', type: FILTER_TYPE.NUMERIC, apply: filters.applyTemperature, defaultValue: INITIAL_FILTER_STATE.temperature },
  { key: 'tint', type: FILTER_TYPE.NUMERIC, apply: filters.applyTint, defaultValue: INITIAL_FILTER_STATE.tint },
  { key: 'clarity', type: FILTER_TYPE.NUMERIC, apply: filters.applyClarity, defaultValue: INITIAL_FILTER_STATE.clarity },
  { key: 'vignette', type: FILTER_TYPE.NUMERIC, apply: filters.applyVignette, defaultValue: INITIAL_FILTER_STATE.vignette },

  { key: 'invert', type: FILTER_TYPE.BOOLEAN, apply: filters.applyInvert, defaultValue: INITIAL_FILTER_STATE.invert },
  { key: 'blur', type: FILTER_TYPE.BOOLEAN, apply: filters.applyBlur, defaultValue: INITIAL_FILTER_STATE.blur },
  { key: 'sharpen', type: FILTER_TYPE.BOOLEAN, apply: filters.applySharpen, defaultValue: INITIAL_FILTER_STATE.sharpen },
  { key: 'isGray', type: FILTER_TYPE.BOOLEAN, apply: filters.applyGrayscale, defaultValue: INITIAL_FILTER_STATE.isGray },

  {
    key: 'shadows',
    type: FILTER_TYPE.SPECIAL,
    apply: filters.applyHighlightShadow,
    condition: (state: FilterState) => state.shadows !== 0 || state.highlights !== 0,
  },
];

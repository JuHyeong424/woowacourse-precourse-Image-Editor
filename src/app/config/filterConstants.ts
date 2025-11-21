import {FilterState} from "@/app/types/filterStateTypes";

export const INITIAL_FILTER_STATE: FilterState = {
  vignette: 0,
  clarity: 0,
  shadows: 0,
  highlights: 0,
  tint: 0,
  temperature: 0,
  hue: 0,
  sharpen: false,
  blur: false,
  invert: false,
  exposure: 0,
  saturation: 100,
  contrast: 100,
  brightness: 100,
  isGray: false,
};

export const FILTER_TYPE = {
  NUMERIC: 'numeric',
  BOOLEAN: 'boolean',
  SPECIAL: 'special',
} as const;

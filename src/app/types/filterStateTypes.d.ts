export type FilterState = {
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
  isGray: boolean;
  exposure: number;
  saturation: number;
  contrast: number;
  brightness: number;
};

type SetFilter = <K extends keyof FilterState>(
  key: K,
  value: FilterState[K]
) => void;

export type BooleanFilterKey = "invert" | "isGray" | "blur" | "sharpen";
export type NumberFilterKey = | "exposure" | "saturation" | "contrast" | "brightness" | "hue" | "temperature" | "tint" | "shadows" | "highlights" | "clarity" | "vignette";

export interface FilterProps {
  filters: FilterState;
  setFilter: SetFilter;
  disabled: boolean;
}

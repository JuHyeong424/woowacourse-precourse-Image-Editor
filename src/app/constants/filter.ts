import {BooleanFilterKey, NumberFilterKey} from "@/app/types/filterStateTypes";

export const FINAL_FILTER_APPLY_DELAY = 120;

export const BUTTON_FILTERS: {
  key: BooleanFilterKey;
  label: string;
  id: string;
}[] = [
  { key: "isGray", label: "흑백 필터", id: "grayscale" },
  { key: "invert", label: "색 반전 필터", id: "invert" },
  { key: "blur", label: "블러 필터", id: "blur" },
  { key: "sharpen", label: "선명도 필터", id: "sharpen" },
];

export const SLIDER_FLITER: { key: NumberFilterKey; label: string; min: number; max: number; }[] = [
  { key: "brightness", label: "밝기 조절", min: 0, max: 200 },
  { key: "contrast", label: "대비 조절", min: 0, max: 200 },
  { key: "saturation", label: "채도 조절", min: 0, max: 200 },
  { key: "exposure", label: "감마 조절", min: -100, max: 100 },
  { key: "hue", label: "색조 회전", min: 0, max: 360 },
  { key: "temperature", label: "색온도", min: -100, max: 100 },
  { key: "tint", label: "색감", min: -100, max: 100 },
  { key: "shadows", label: "섀도우 조절", min: -100, max: 100 },
  { key: "highlights", label: "하이라이트 조절", min: -100, max: 100 },
  { key: "clarity", label: "로컬 대비 조절", min: -100, max: 100 },
  { key: "vignette", label: "비네트 강도 조절", min: -100, max: 100 },
];

import { BooleanFilterKey } from "@/app/types/filterStateTypes";

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

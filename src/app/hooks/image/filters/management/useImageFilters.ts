import useFilterBrightness from "@/app/hooks/image/filters/useFilterBrightness";
import useFilterGrayscale from "@/app/hooks/image/filters/useFilterGrayscale";
import useFilterResetColor from "@/app/hooks/image/filters/useFilterResetColor";
import {useMemo} from "react";
import useFilterContrast from "@/app/hooks/image/filters/useFilterContrast";

export default function useImageFilters() {
  const { applyContrast } = useFilterContrast();
  const { applyBrightness } = useFilterBrightness();
  const { applyGrayscale } = useFilterGrayscale();
  const { resetColor } = useFilterResetColor();

  return useMemo(() => ({
    applyContrast,
    applyBrightness,
    applyGrayscale,
    resetColor,
  }), [applyContrast, applyBrightness, applyGrayscale, resetColor])
}

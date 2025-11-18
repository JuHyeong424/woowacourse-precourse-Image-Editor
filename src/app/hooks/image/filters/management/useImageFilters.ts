import useFilterBrightness from "@/app/hooks/image/filters/useFilterBrightness";
import useFilterGrayscale from "@/app/hooks/image/filters/useFilterGrayscale";
import useFilterResetColor from "@/app/hooks/image/filters/useFilterResetColor";
import {useMemo} from "react";
import useFilterContrast from "@/app/hooks/image/filters/useFilterContrast";
import useFilterSaturation from "@/app/hooks/image/filters/useFilterSaturation";
import useFilterExposure from "@/app/hooks/image/filters/useFilterExposure";
import useFilterInvert from "@/app/hooks/image/filters/useFilterInvert";
import useFilterBlur from "@/app/hooks/image/filters/useFilterBlur";

export default function useImageFilters() {
  const { applyBlur } = useFilterBlur();
  const { applyInvert } = useFilterInvert();
  const { applyExposure } = useFilterExposure();
  const { applySaturation } = useFilterSaturation();
  const { applyContrast } = useFilterContrast();
  const { applyBrightness } = useFilterBrightness();
  const { applyGrayscale } = useFilterGrayscale();
  const { resetColor } = useFilterResetColor();

  return useMemo(() => ({
    applyBlur,
    applyInvert,
    applyExposure,
    applySaturation,
    applyContrast,
    applyBrightness,
    applyGrayscale,
    resetColor,
  }), [applyBlur, applyInvert, applyExposure, applySaturation, applyContrast, applyBrightness, applyGrayscale, resetColor])
}

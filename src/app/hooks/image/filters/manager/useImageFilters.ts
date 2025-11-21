import useFilterBrightness from "@/app/hooks/image/filters/useFilterBrightness";
import useFilterGrayscale from "@/app/hooks/image/filters/useFilterGrayscale";
import useFilterResetColor from "@/app/hooks/image/filters/useFilterResetColor";
import {useMemo} from "react";
import useFilterContrast from "@/app/hooks/image/filters/useFilterContrast";
import useFilterSaturation from "@/app/hooks/image/filters/useFilterSaturation";
import useFilterExposure from "@/app/hooks/image/filters/useFilterExposure";
import useFilterInvert from "@/app/hooks/image/filters/useFilterInvert";
import useFilterBlur from "@/app/hooks/image/filters/useFilterBlur";
import useFilterSharpen from "@/app/hooks/image/filters/useFilterSharpen";
import useFilterHue from "@/app/hooks/image/filters/useFilterHue";
import useFilterTemperature from "@/app/hooks/image/filters/useFilterTemperature";
import useFilterTint from "@/app/hooks/image/filters/useFilterTinit";
import useFilterHighlightShadow from "@/app/hooks/image/filters/useFilterHighlightShadow";
import useFilterClarity from "@/app/hooks/image/filters/useFilterClarity";
import useFilterVignette from "@/app/hooks/image/filters/useFilterVignette";
import {FilterFunctions} from "@/app/types/imageFilterTypes";

export default function useImageFilters():FilterFunctions {
  const { applyVignette } = useFilterVignette();
  const { applyClarity } = useFilterClarity();
  const { applyHighlightShadow } = useFilterHighlightShadow();
  const { applyTint } = useFilterTint();
  const { applyTemperature } = useFilterTemperature();
  const { applyHue } = useFilterHue();
  const { applySharpen } = useFilterSharpen();
  const { applyBlur } = useFilterBlur();
  const { applyInvert } = useFilterInvert();
  const { applyExposure } = useFilterExposure();
  const { applySaturation } = useFilterSaturation();
  const { applyContrast } = useFilterContrast();
  const { applyBrightness } = useFilterBrightness();
  const { applyGrayscale } = useFilterGrayscale();
  const { resetColor } = useFilterResetColor();

  return useMemo(() => ({
    applyVignette,
    applyClarity,
    applyHighlightShadow,
    applyTint,
    applyTemperature,
    applyHue,
    applySharpen,
    applyBlur,
    applyInvert,
    applyExposure,
    applySaturation,
    applyContrast,
    applyBrightness,
    applyGrayscale,
    resetColor,
  }), [applyVignette, applyClarity, applyHighlightShadow, applyTint, applyTemperature, applyHue, applySharpen, applyBlur, applyInvert, applyExposure, applySaturation, applyContrast, applyBrightness, applyGrayscale, resetColor])
}

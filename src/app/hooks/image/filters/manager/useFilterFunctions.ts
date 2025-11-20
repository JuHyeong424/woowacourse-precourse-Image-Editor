import useImageFilters from "@/app/hooks/image/filters/manager/useImageFilters";

export default function useFilterFunctions() {
  const {
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
    resetColor
  } = useImageFilters();

  return {
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
    resetColor
  };
}

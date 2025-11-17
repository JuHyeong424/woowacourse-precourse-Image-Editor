import useImageFilters from "@/app/hooks/image/filters/useImageFilters";
import {WasmModule} from "@/lib/wasm-loader";
import {GetCanvasImageData} from "@/app/types/filterTypes";
import {useCallback, useEffect, useState} from "react";

interface UseImageFilterControllerProps {
  wasm: WasmModule | null;
  image: HTMLImageElement | null;
  originalPixels: ImageData["data"] | null;
  getCanvasImageData: GetCanvasImageData;
}

export default function useImageFilterController(
  {
    wasm,
    image,
    originalPixels,
    getCanvasImageData
  }: UseImageFilterControllerProps) {
  const {applyBrightness, applyGrayscale, resetColor} = useImageFilters();
  const [filters, setFilters] = useState({
    brightness: 100,
    isGray: false,
  });

  const {brightness, isGray} = filters;

  useEffect(() => {
    setFilters({brightness: 100, isGray: false});
  }, [image]);

  const setFilter = useCallback(<K extends keyof typeof filters>(
      key: K,
      value: typeof filters[K]
    ) => {
      setFilters(prev => ({...prev, [key]: value}));
    }, []
  );

  const applyAllFilters = useCallback(() => {
    if (!wasm || !image || !originalPixels) return;

    resetColor(getCanvasImageData, originalPixels);

    if (brightness !== 100) {
      applyBrightness(wasm, getCanvasImageData, brightness, originalPixels);
    }

    if (isGray) {
      applyGrayscale(wasm, getCanvasImageData);
    }
  }, [
    wasm,
    image,
    originalPixels,
    brightness,
    isGray,
    resetColor,
    applyBrightness,
    applyGrayscale,
    getCanvasImageData
  ]);

  useEffect(() => {
    applyAllFilters();
  }, [brightness, isGray, applyAllFilters]);

  const disabled = !wasm || !image;

  return {
    filters,
    setFilter,
    applyAllFilters,
    disabled
  };
}

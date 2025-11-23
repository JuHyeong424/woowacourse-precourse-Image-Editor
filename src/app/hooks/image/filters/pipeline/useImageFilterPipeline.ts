import {useCallback} from "react";
import {WasmModule} from "@/lib/wasm-loader";
import {GetCanvasImageData} from "@/app/types/filterTypes";
import {FilterState} from "@/app/types/filterStateTypes";
import {FilterConfig, FilterFunctions} from "@/app/types/imageFilterTypes";
import {FILTER_TYPE} from "@/app/config/filter/filterConstants";

interface useImageFilterPipelineProps {
  wasm: WasmModule | null;
  image: HTMLImageElement | null;
  originalPixels: ImageData["data"] | null;
  getCanvasImageData: GetCanvasImageData;
  filters: FilterFunctions;
  filterConfigs: FilterConfig[];
}

export default function useImageFilterPipeline(
  {
    wasm,
    image,
    originalPixels,
    getCanvasImageData,
    filters,
    filterConfigs,
  }: useImageFilterPipelineProps) {
  return useCallback((state: FilterState) => {
    if (!wasm || !image || !originalPixels) return;

    filters.resetColor(getCanvasImageData, originalPixels);

    filterConfigs.forEach(config => {
      const {key, type, apply, defaultValue, condition} = config;

      switch (type) {
        case FILTER_TYPE.NUMERIC:
          if (state[key] !== defaultValue) apply(wasm, getCanvasImageData, state[key]);
          break;

        case FILTER_TYPE.BOOLEAN:
          if (state[key]) apply(wasm, getCanvasImageData);
          break;

        case FILTER_TYPE.SPECIAL:
          if (condition?.(state)) apply(wasm, getCanvasImageData, state.shadows, state.highlights);
          break;
      }
    });
  }, [wasm, image, originalPixels, getCanvasImageData, filters, filterConfigs]);
}

import useFilterBase from "@/app/hooks/image/filters/useFilterBase";
import {WasmModule} from "@/lib/wasm-loader";
import {GetCanvasImageData} from "@/app/types/filterTypes";

export default function useFilterExposure() {
  const { prepareFilter } = useFilterBase();

  const applyExposure = (
    wasm: WasmModule | null,
    getCanvasImageData: GetCanvasImageData,
    newValue: number,
  ) => {
    const info = prepareFilter(wasm, getCanvasImageData);
    if (!info) return;

    const { ctx, imageData } = info;

    wasm?.saturation(imageData.data, newValue / 100);
    ctx.putImageData(imageData, 0, 0);
  }

  return { applyExposure };
}

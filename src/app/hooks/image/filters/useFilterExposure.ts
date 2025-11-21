import useFilterBase from "@/app/hooks/image/filters/core/useFilterBase";
import {WasmModule} from "@/lib/wasm-loader";
import {GetCanvasImageData} from "@/app/types/filterTypes";
import {CANVAS_ORIGIN_X, CANVAS_ORIGIN_Y} from "@/app/constants/canvas";

export default function useFilterExposure() {
  const { prepareFilter } = useFilterBase();

  const applyExposure = (
    wasm: WasmModule | null,
    getCanvasImageData: GetCanvasImageData,
    value: number,
  ) => {
    const info = prepareFilter(wasm, getCanvasImageData);
    if (!info) return;

    const { ctx, imageData } = info;
    const uint8View = new Uint8Array(imageData.data.buffer);

    wasm?.exposure(uint8View, value);
    ctx.putImageData(imageData, CANVAS_ORIGIN_X, CANVAS_ORIGIN_Y);
  }

  return { applyExposure };
}

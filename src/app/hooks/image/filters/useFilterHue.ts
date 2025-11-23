import useFilterBase from "@/app/hooks/image/filters/core/useFilterBase";
import {WasmModule} from "@/lib/wasm-loader";
import {GetCanvasImageData} from "@/app/types/filterTypes";
import {CANVAS_ORIGIN_X, CANVAS_ORIGIN_Y} from "@/app/config/constants/canvas";

export default function useFilterHue() {
  const { prepareFilter } = useFilterBase();

  const applyHue = (
    wasm: WasmModule | null,
    getCanvasImageData: GetCanvasImageData,
    degrees: number,
  ) => {
    const info = prepareFilter(wasm, getCanvasImageData);
    if (!info) return;

    const { ctx, imageData } = info;
    const unit8View = new Uint8Array(imageData.data.buffer);

    wasm?.hue(unit8View, degrees);
    ctx.putImageData(imageData, CANVAS_ORIGIN_X, CANVAS_ORIGIN_Y);
  }

  return { applyHue };
}

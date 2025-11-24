import useFilterBase from "@/app/hooks/image/filters/core/useFilterBase";
import {WasmModule} from "@/lib/wasm-loader";
import {GetCanvasImageData} from "@/app/types/filterTypes";
import {CANVAS_ORIGIN_X, CANVAS_ORIGIN_Y} from "@/app/config/constants/canvas";

export default function useFilterSharpen() {
  const { prepareFilter } = useFilterBase();

  const applySharpen = (
    wasm: WasmModule | null,
    getCanvasImageData: GetCanvasImageData,
  ) => {
    const info = prepareFilter(wasm, getCanvasImageData);
    if (!info) return;

    const { ctx, imageData, canvas } = info;
    const unit8View = new Uint8Array(imageData.data.buffer);

    wasm?.sharpen(unit8View, canvas.width, canvas.height);
    ctx.putImageData(imageData, CANVAS_ORIGIN_X, CANVAS_ORIGIN_Y);
  };

  return { applySharpen };
}

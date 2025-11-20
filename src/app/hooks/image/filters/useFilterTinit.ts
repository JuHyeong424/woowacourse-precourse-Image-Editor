import useFilterBase from "@/app/hooks/image/filters/core/useFilterBase";
import {WasmModule} from "@/lib/wasm-loader";
import {GetCanvasImageData} from "@/app/types/filterTypes";

export default function useFilterTint() {
  const { prepareFilter } = useFilterBase();

  const applyTint = (
    wasm: WasmModule | null,
    getCanvasImageData: GetCanvasImageData,
    tint: number,
  ) => {
    const info = prepareFilter(wasm, getCanvasImageData);
    if (!info) return;

    const { ctx, imageData } = info;
    const unit8View = new Uint8Array(imageData.data.buffer);

    wasm?.tint(unit8View, tint);
    ctx.putImageData(imageData, 0, 0);
  }

  return { applyTint };
}

import useFilterBase from "@/app/hooks/image/filters/useFilterBase";
import {WasmModule} from "@/lib/wasm-loader";
import {GetCanvasImageData} from "@/app/types/filterTypes";

export default function useFilterSaturation() {
  const { prepareFilter } = useFilterBase();

  const applySaturation = (
    wasm: WasmModule | null,
    getCanvasImageData: GetCanvasImageData,
    value: number,
  ) => {
    const info = prepareFilter(wasm, getCanvasImageData);
    if (!info) return;

    const { ctx, imageData } = info;
    const uint8View = new Uint8Array(imageData.data.buffer);

    wasm?.saturation(uint8View, value / 100);
    ctx.putImageData(imageData, 0, 0);
  }

  return { applySaturation };
}

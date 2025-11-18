import useFilterBase from "@/app/hooks/image/filters/useFilterBase";
import {WasmModule} from "@/lib/wasm-loader";
import {GetCanvasImageData} from "@/app/types/filterTypes";

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
    ctx.putImageData(imageData, 0, 0);
  }

  return { applyHue };
}

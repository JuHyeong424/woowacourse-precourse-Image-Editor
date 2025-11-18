import useFilterBase from "@/app/hooks/image/filters/useFilterBase";
import {WasmModule} from "@/lib/wasm-loader";
import {GetCanvasImageData} from "@/app/types/filterTypes";

export default function useFilterInvert() {
  const { prepareFilter } = useFilterBase();

  const applyInvert = (
    wasm: WasmModule | null,
    getCanvasImageData: GetCanvasImageData,
    newValue: number,
  ) => {
    const info = prepareFilter(wasm, getCanvasImageData);
    if (!info) return;

    const { ctx, imageData } = info;

    wasm?.invert(imageData.data);
    ctx.putImageData(imageData, 0, 0);
  }

  return { applyInvert };
}

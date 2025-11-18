import useFilterBase from "@/app/hooks/image/filters/useFilterBase";
import {WasmModule} from "@/lib/wasm-loader";
import {GetCanvasImageData} from "@/app/types/filterTypes";

export default function useFilterContrast() {
  const { prepareFilter } = useFilterBase();

  const applyContrast = (
    wasm: WasmModule | null,
    getCanvasImageData: GetCanvasImageData,
    newValue: number,
  ) => {
    const info = prepareFilter(wasm, getCanvasImageData);
    if (!info) return;

    const { ctx, imageData } = info;

    wasm?.contrast(imageData.data, newValue);
    ctx.putImageData(imageData, 0, 0);
  };

  return { applyContrast };
}

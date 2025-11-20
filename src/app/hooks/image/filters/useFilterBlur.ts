import useFilterBase from "@/app/hooks/image/filters/core/useFilterBase";
import {WasmModule} from "@/lib/wasm-loader";
import {GetCanvasImageData} from "@/app/types/filterTypes";

export default function useFilterBlur() {
  const { prepareFilter } = useFilterBase();

  const applyBlur = (
    wasm: WasmModule | null,
    getCanvasImageData: GetCanvasImageData,
  ) => {
    const info = prepareFilter(wasm, getCanvasImageData);
    if (!info) return;

    const { ctx, imageData, canvas } = info;
    const uint8View = new Uint8Array(imageData.data.buffer);

    wasm?.blur(uint8View, canvas.width, canvas.height);
    ctx.putImageData(imageData, 0, 0);
  };

  return { applyBlur };
}

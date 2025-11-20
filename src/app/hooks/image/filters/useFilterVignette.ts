import useFilterBase from "@/app/hooks/image/filters/useFilterBase";
import {WasmModule} from "@/lib/wasm-loader";
import {GetCanvasImageData} from "@/app/types/filterTypes";

export default function useFilterVignette() {
  const { prepareFilter } = useFilterBase();

  const applyVignette = (
    wasm: WasmModule | null,
    getCanvasImageData: GetCanvasImageData,
    vignette: number,
  ) => {
    const info = prepareFilter(wasm, getCanvasImageData);
    if (!info) return;

    const { ctx, imageData, canvas } = info;
    const unit8View = new Uint8Array(imageData.data.buffer);

    wasm?.vignette(unit8View, canvas.width, canvas.height, vignette);
    ctx.putImageData(imageData, 0, 0);
  };

  return { applyVignette };
}

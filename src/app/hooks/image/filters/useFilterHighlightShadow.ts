import useFilterBase from "@/app/hooks/image/filters/core/useFilterBase";
import {WasmModule} from "@/lib/wasm-loader";
import {GetCanvasImageData} from "@/app/types/filterTypes";

export default function useFilterHighlightShadow() {
  const { prepareFilter } = useFilterBase();

  const applyHighlightShadow = (
    wasm: WasmModule | null,
    getCanvasImageData: GetCanvasImageData,
    shadows: number,
    highlights: number,
  ) => {
    const info = prepareFilter(wasm, getCanvasImageData);
    if (!info) return;

    const { ctx, imageData } = info;
    const unit8View = new Uint8Array(imageData.data.buffer);

    wasm?.highlights_shadow(unit8View, shadows, highlights);
    ctx.putImageData(imageData, 0, 0);
  };

  return { applyHighlightShadow };
}

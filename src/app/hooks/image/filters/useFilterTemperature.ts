import useFilterBase from "@/app/hooks/image/filters/useFilterBase";
import {WasmModule} from "@/lib/wasm-loader";
import {GetCanvasImageData} from "@/app/types/filterTypes";

export default function useFilterTemperature() {
  const { prepareFilter } = useFilterBase();

  const applyTemperature = (
    wasm: WasmModule | null,
    getCanvasImageData: GetCanvasImageData,
    temperature: number,
  ) => {
    const info = prepareFilter(wasm, getCanvasImageData);
    if (!info) return;

    const { ctx, imageData } = info;
    const unit8View = new Uint8Array(imageData.data.buffer);

    wasm?.temperature(unit8View, temperature);
    ctx.putImageData(imageData, 0, 0);
  }

  return { applyTemperature };
}

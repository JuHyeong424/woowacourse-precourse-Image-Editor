import {WasmModule} from "@/lib/wasm-loader";
import useFilterBase from "@/app/hooks/image/filters/core/useFilterBase";
import {CANVAS_ORIGIN_X, CANVAS_ORIGIN_Y} from "@/app/config/constants/canvas";

interface CanvasInfo {
  ctx: CanvasRenderingContext2D;
  imageData: ImageData;
  canvas: HTMLCanvasElement;
}

type GetCanvasImageData = () => CanvasInfo | null;

export default function useFilterBrightness() {
  const { prepareFilter } = useFilterBase();

  const applyBrightness = (
    wasm: WasmModule | null,
    getCanvasImageData: GetCanvasImageData,
    newValue: number,
  ) => {
    const info = prepareFilter(wasm, getCanvasImageData);
    if (!info) return;

    const { ctx, imageData } = info;
    const uint8View = new Uint8Array(imageData.data.buffer);

    wasm?.brightness(uint8View, newValue);
    ctx.putImageData(imageData, CANVAS_ORIGIN_X, CANVAS_ORIGIN_Y);
  };

  return { applyBrightness };
}

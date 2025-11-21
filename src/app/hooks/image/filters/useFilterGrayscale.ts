import {WasmModule} from "@/lib/wasm-loader";
import useFilterBase from "@/app/hooks/image/filters/core/useFilterBase";
import {CANVAS_ORIGIN_X, CANVAS_ORIGIN_Y} from "@/app/constants/canvas";

interface CanvasInfo {
  ctx: CanvasRenderingContext2D;
  imageData: ImageData;
  canvas: HTMLCanvasElement;
}

type GetCanvasImageData = () => CanvasInfo | null;

export default function useFilterGrayscale() {
  const { prepareFilter } = useFilterBase();

  const applyGrayscale = (
    wasm: WasmModule | null,
    getCanvasImageData: GetCanvasImageData,
  ) => {
    const info = prepareFilter(wasm, getCanvasImageData);
    if (!info) return;

    const { ctx, imageData } = info;
    const uint8View = new Uint8Array(imageData.data.buffer);

    wasm?.grayscale(uint8View);
    ctx.putImageData(imageData, CANVAS_ORIGIN_X, CANVAS_ORIGIN_Y);
  };

  return { applyGrayscale };
}

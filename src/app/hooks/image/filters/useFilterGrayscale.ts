import {WasmModule} from "@/lib/wasm-loader";
import useFilterBase from "@/app/hooks/image/filters/useFilterBase";

interface CanvasInfo {
  ctx: CanvasRenderingContext2D;
  imageData: ImageData;
}

type GetCanvasImageData = () => CanvasInfo | null;

export default function useFilterGrayscale() {
  const { prepareFilter } = useFilterBase();

  const applyGrayscale = (
    wasm: WasmModule | null,
    image: HTMLImageElement | null,
    getCanvasImageData: GetCanvasImageData
  ) => {
    const info = prepareFilter(wasm, getCanvasImageData);
    if (!info) return;

    const { ctx, imageData } = info;

    wasm?.grayscale(imageData.data);
    ctx.putImageData(imageData, 0, 0);
  };

  return { applyGrayscale };
}

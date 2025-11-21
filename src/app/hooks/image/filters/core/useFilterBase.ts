import {WasmModule} from "@/lib/wasm-loader";

interface CanvasInfo {
  ctx: CanvasRenderingContext2D;
  imageData: ImageData;
  canvas: HTMLCanvasElement;
}

type GetCanvasImageData = () => CanvasInfo | null;

export default function useFilterBase() {
  const prepareFilter = (
    wasm: WasmModule | null,
    getCanvasImageData: GetCanvasImageData,
  )=> {
    if (!wasm) return;

    const info = getCanvasImageData();
    if (!info) return;

    return info;
  }

  return { prepareFilter };
}

import {WasmModule} from "@/lib/wasm-loader";

interface CanvasInfo {
  ctx: CanvasRenderingContext2D;
  imageData: ImageData;
}

type GetCanvasImageData = () => CanvasInfo | null;

export default function useFilterBrightness() {
  const applyBrightness = (
    wasm: WasmModule | null,
    getCanvasImageData: GetCanvasImageData,
    newValue: number,
    originalPixels: Uint8ClampedArray<ArrayBuffer> | null,
  ) => {
    if (!wasm) return;

    const info = getCanvasImageData();
    if (!info) return;

    const { ctx, imageData } = info;

    if (originalPixels) imageData.data.set(originalPixels);

    wasm.brightness(imageData.data, newValue);
    ctx.putImageData(imageData, 0, 0);
  };

  return { applyBrightness };
}

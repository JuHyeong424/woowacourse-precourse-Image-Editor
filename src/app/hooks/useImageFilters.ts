import {WasmModule} from "@/lib/wasm-loader";

interface CanvasInfo {
  ctx: CanvasRenderingContext2D;
  imageData: ImageData;
}

type GetCanvasImageData = () => CanvasInfo | null;

export default function useImageFilters() {
  const applyGrayscale = (
    wasm: WasmModule | null,
    image: HTMLImageElement | null,
    getCanvasImageData: GetCanvasImageData
  ) => {
    if (!wasm || !image) return;

    const info = getCanvasImageData();
    if (!info) return;

    const { ctx, imageData } = info;

    wasm.grayscale(imageData.data);
    ctx.putImageData(imageData, 0, 0);
  };

  const resetColor = (
    getCanvasImageData: GetCanvasImageData,
    originalPixels: ImageData["data"] | null,
  ) => {
    const info = getCanvasImageData();
    if (!info) return;

    const { ctx, imageData } = info;

    imageData.data.set(originalPixels!);
    ctx.putImageData(imageData, 0, 0);
  };

  return { applyGrayscale, resetColor };
}
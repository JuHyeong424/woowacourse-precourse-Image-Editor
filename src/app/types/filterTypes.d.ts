import { WasmModule } from "@/lib/wasm-loader";

export type GetCanvasImageData = () => {
  ctx: CanvasRenderingContext2D;
  imageData: ImageData;
  canvas: HTMLCanvasElement;
} | null;

export interface UseAllFiltersProps {
  wasm: WasmModule | null;
  image: HTMLImageElement | null;
  originalPixels: ImageData["data"] | null;

  brightness: number;
  isGray: boolean;

  resetColor: (
    getter: GetCanvasImageData,
    originalPixels: ImageData["data"] | null
  ) => void;

  applyBrightness: (
    wasm: WasmModule,
    getter: GetCanvasImageData,
    brightness: number,
    originalPixels: ImageData["data"] | null
  ) => void;

  applyGrayscale: (
    wasm: WasmModule,
    getter: GetCanvasImageData
  ) => void;

  getCanvasImageData: GetCanvasImageData;
}

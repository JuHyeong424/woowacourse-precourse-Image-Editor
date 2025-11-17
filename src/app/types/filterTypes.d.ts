import { WasmModule } from "@/lib/wasm-loader";

export type GetCanvasImageData = () => {
  ctx: CanvasRenderingContext2D;
  imageData: ImageData;
  canvas: HTMLCanvasElement;
} | null;

export type ApplyBrightness = (
  wasm: WasmModule | null,
  getCanvasImageData: GetCanvasImageData,
  value: number,
  originalPixels: ImageData["data"] | null
) => void;

export type ApplyGrayscale = (
  wasm: WasmModule | null,
  getCanvasImageData: GetCanvasImageData
) => void;

type ResetColor = (
  getCanvasImageData: GetCanvasImageData,
  originalPixels: ImageData["data"] | null
) => void;


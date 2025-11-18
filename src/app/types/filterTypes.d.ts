import { WasmModule } from "@/lib/wasm-loader";

export type GetCanvasImageData = () => {
  ctx: CanvasRenderingContext2D;
  imageData: ImageData;
  canvas: HTMLCanvasElement;
} | null;

export type ApplyTemperature = (
  wasm: WasmModule | null,
  getCanvasImageData: GetCanvasImageData,
  temperature: number,
) => void;

export type ApplyHue = (
  wasm: WasmModule | null,
  getCanvasImageData: GetCanvasImageData,
  degrees: number,
) => void;

export type ApplySharpen = (
  wasm: WasmModule | null,
  getCanvasImageData: GetCanvasImageData
) => void;

export type ApplyBlur = (
  wasm: WasmModule | null,
  getCanvasImageData: GetCanvasImageData
) => void;

export type ApplyInvert = (
  wasm: WasmModule | null,
  getCanvasImageData: GetCanvasImageData
) => void;

export type ApplyExposure = (
  wasm: WasmModule | null,
  getCanvasImageData: GetCanvasImageData,
  value: number,
) => void;

export type ApplySaturation = (
  wasm: WasmModule | null,
  getCanvasImageData: GetCanvasImageData,
  value: number,
) => void;

export type ApplyContrast = (
  wasm: WasmModule | null,
  getCanvasImageData: GetCanvasImageData,
  value: number,
) => void;

export type ApplyBrightness = (
  wasm: WasmModule | null,
  getCanvasImageData: GetCanvasImageData,
  value: number,
) => void;

export type ApplyGrayscale = (
  wasm: WasmModule | null,
  getCanvasImageData: GetCanvasImageData
) => void;

export type ResetColor = (
  getCanvasImageData: GetCanvasImageData,
  originalPixels: ImageData["data"] | null
) => void;


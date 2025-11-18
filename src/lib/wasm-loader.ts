import type {
  grayscale as GrayscaleType,
  brightness as BrightnessType,
  contrast as ContrastType,
  saturation as SaturationType,
} from '@/wasm/rust_core';

export interface WasmModule {
  grayscale: typeof GrayscaleType;
  brightness: typeof BrightnessType;
  contrast: typeof ContrastType;
  saturation: typeof SaturationType;
}

export const loadWASM = async (): Promise<WasmModule> => {
  if (typeof window === 'undefined') {
    return {
      grayscale: () => {},
      brightness: () => {},
      contrast: () => {},
      saturation: () => {},
    };
  }
  const wasm = await import('@/wasm/rust_core');
  await wasm.default();
  return {
    grayscale: wasm.grayscale,
    brightness: wasm.brightness,
    contrast: wasm.contrast,
    saturation: wasm.saturation,
  };
}

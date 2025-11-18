import type {
  grayscale as GrayscaleType,
  brightness as BrightnessType,
  contrast as ContrastType,
  saturation as SaturationType,
  exposure as ExposureType,
  invert as InvertType,
  blur as BlurType,
  sharpen as SharpenType,
  hue as HueType,
  temperature as TemperatureType,
  tint as TintType,
} from '@/wasm/rust_core';

export interface WasmModule {
  grayscale: typeof GrayscaleType;
  brightness: typeof BrightnessType;
  contrast: typeof ContrastType;
  saturation: typeof SaturationType;
  exposure: typeof ExposureType;
  invert: typeof InvertType;
  blur: typeof BlurType;
  sharpen: typeof SharpenType;
  hue: typeof HueType;
  temperature: typeof TemperatureType;
  tint: typeof TintType;
}

export const loadWASM = async (): Promise<WasmModule> => {
  if (typeof window === 'undefined') {
    return {
      grayscale: () => {},
      brightness: () => {},
      contrast: () => {},
      saturation: () => {},
      exposure: () => {},
      invert: () => {},
      blur: () => {},
      sharpen: () => {},
      hue: () => {},
      temperature: () => {},
      tint: () => {},
    };
  }
  const wasm = await import('@/wasm/rust_core');
  await wasm.default();
  return {
    grayscale: wasm.grayscale,
    brightness: wasm.brightness,
    contrast: wasm.contrast,
    saturation: wasm.saturation,
    exposure: wasm.exposure,
    invert: wasm.invert,
    blur: wasm.blur,
    sharpen: wasm.sharpen,
    hue: wasm.hue,
    temperature: wasm.temperature,
    tint: wasm.tint,
  };
}

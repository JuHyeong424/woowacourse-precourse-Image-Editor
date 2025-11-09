import type { grayscale as GrayscaleType } from '@/wasm/rust_core';

export interface WasmModule {
  grayscale: typeof GrayscaleType;
}

export const loadWASM = async (): Promise<WasmModule> => {
  if (typeof window === 'undefined') {
    return {
      grayscale: () => {},
    };
  }
  const wasm = await import('@/wasm/rust_core');
  await wasm.default();
  return wasm;
}

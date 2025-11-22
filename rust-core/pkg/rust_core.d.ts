/* tslint:disable */
/* eslint-disable */
export function saturation(data: Uint8Array, value: number): void;
export function tint(data: Uint8Array, tint: number): void;
export function temperature(data: Uint8Array, temp: number): void;
export function blur(data: Uint8Array, width: number, height: number): void;
export function clarity(data: Uint8Array, width: number, height: number, clarity: number): void;
export function invert(data: Uint8Array): void;
export function contrast(data: Uint8Array, value: number): void;
export function vignette(data: Uint8Array, width: number, height: number, vignette: number): void;
export function brightness(data: Uint8Array, value: number): void;
export function sharpen(data: Uint8Array, width: number, height: number): void;
export function highlights_shadow(data: Uint8Array, shadow: number, highlights: number): void;
export function grayscale(data: Uint8Array): void;
export function hue(data: Uint8Array, degrees: number): void;
export function exposure(data: Uint8Array, value: number): void;

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly blur: (a: number, b: number, c: any, d: number, e: number) => void;
  readonly brightness: (a: number, b: number, c: any, d: number) => void;
  readonly clarity: (a: number, b: number, c: any, d: number, e: number, f: number) => void;
  readonly contrast: (a: number, b: number, c: any, d: number) => void;
  readonly exposure: (a: number, b: number, c: any, d: number) => void;
  readonly grayscale: (a: number, b: number, c: any) => void;
  readonly highlights_shadow: (a: number, b: number, c: any, d: number, e: number) => void;
  readonly hue: (a: number, b: number, c: any, d: number) => void;
  readonly invert: (a: number, b: number, c: any) => void;
  readonly saturation: (a: number, b: number, c: any, d: number) => void;
  readonly sharpen: (a: number, b: number, c: any, d: number, e: number) => void;
  readonly temperature: (a: number, b: number, c: any, d: number) => void;
  readonly tint: (a: number, b: number, c: any, d: number) => void;
  readonly vignette: (a: number, b: number, c: any, d: number, e: number, f: number) => void;
  readonly __wbindgen_externrefs: WebAssembly.Table;
  readonly __wbindgen_malloc: (a: number, b: number) => number;
  readonly __wbindgen_start: () => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;
/**
* Instantiates the given `module`, which can either be bytes or
* a precompiled `WebAssembly.Module`.
*
* @param {{ module: SyncInitInput }} module - Passing `SyncInitInput` directly is deprecated.
*
* @returns {InitOutput}
*/
export function initSync(module: { module: SyncInitInput } | SyncInitInput): InitOutput;

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {{ module_or_path: InitInput | Promise<InitInput> }} module_or_path - Passing `InitInput` directly is deprecated.
*
* @returns {Promise<InitOutput>}
*/
export default function __wbg_init (module_or_path?: { module_or_path: InitInput | Promise<InitInput> } | InitInput | Promise<InitInput>): Promise<InitOutput>;

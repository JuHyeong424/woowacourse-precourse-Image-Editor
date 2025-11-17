import {useEffect, useState} from "react";
import {WasmModule} from "@/lib/wasm-loader";

export default function useWasmLoader() {
  const [wasm, setWasm] = useState<WasmModule | null>(null);

  useEffect(() => {
    const initWasm = async () => {
      const { loadWASM } = await import('@/lib/wasm-loader');
      const wasmModule = await loadWASM();
      setWasm(wasmModule);
    };
    initWasm();
  }, []);

  return { wasm };
}

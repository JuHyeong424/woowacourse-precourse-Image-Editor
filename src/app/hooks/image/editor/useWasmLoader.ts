import {useEffect, useState} from "react";
import {WasmModule} from "@/lib/wasm-loader";

export default function useWasmLoader() {
  const [wasm, setWasm] = useState<WasmModule | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const initWasm = async () => {
      try {
        const { loadWASM } = await import('@/lib/wasm-loader');
        const wasmModule = await loadWASM();

        if (isMounted) setWasm(wasmModule);
      } catch (e) {
        console.error("WASM 로드 실패:", e);
        if (isMounted) setError("WASM 모듈 로드 실패");
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    initWasm();

    return () => { isMounted = false; }
  }, []);

  return { wasm, loading, error };
}

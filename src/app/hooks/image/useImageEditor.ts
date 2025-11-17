import {useEffect, useRef, useState} from "react";
import {WasmModule} from "@/lib/wasm-loader";
import useInitializeCanvas from "@/app/hooks/cavas/useInitializeCanvas";

export default function useImageEditor() {
  const [wasm, setWasm] = useState<WasmModule | null>(null);
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [originalPixels, setOriginalPixels] = useState<ImageData["data"]  | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { initializeCanvas } = useInitializeCanvas({ canvasRef });

  useEffect(() => {
    const initWasm = async () => {
      const { loadWASM } = await import('@/lib/wasm-loader');
      const wasmModule = await loadWASM();
      setWasm(wasmModule);
    };
    initWasm();
  }, []);

  useEffect(() => {
    if (!image) return;

    const info = initializeCanvas(image);
    if (!info) return;

    setOriginalPixels(new Uint8ClampedArray(info.data));
  }, [image]);

  return {
    wasm,
    image,
    setImage,
    originalPixels,
    canvasRef
  };
}

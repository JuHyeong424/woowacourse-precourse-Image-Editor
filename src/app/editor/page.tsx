"use client"

import {useEffect, useRef, useState} from "react";
import {WasmModule} from "@/lib/wasm-loader";
import UploadedImageComponent from "@/app/editor/components/UploadedImageComponent";
import GrayScaleComponent from "@/app/editor/components/GrayScaleComponent";

export default function EditorPage() {
  const [wasm, setWasm] = useState<WasmModule | null>(null);
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const initWasm = async () => {
      const { loadWASM } = await import('@/lib/wasm-loader');
      const wasmModule = await loadWASM();
      setWasm(wasmModule);
    };
    initWasm();
  }, []);

  useEffect(() => {
    if (!image || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx) return;

    canvas.width = image.width;
    canvas.height = image.height;
    ctx.drawImage(image, 0, 0);
  }, [image]);

  return (
    <div className="flex flex-row bg-black text-white min-h-screen gap-6 p-12">
      <div className="flex flex-col p-4 border-2 min-w-[30%] h-full rounded-xl">
        <h2>편집 도구</h2>

        <GrayScaleComponent wasm={wasm} image={image} canvasRef={canvasRef} />

        <span>밝기 조절: 0</span>
        <input type="range" min="0" max="200" value={100} />
      </div>

      <UploadedImageComponent canvasRef={canvasRef} setImage={setImage} />
    </div>
  );
}

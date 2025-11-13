import {WasmModule} from "@/lib/wasm-loader";
import React from "react";

interface GrayScaleComponentProps {
  wasm: WasmModule | null,
  image: HTMLImageElement | null,
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
}

export default function GrayScaleComponent({ wasm, canvasRef, image}: GrayScaleComponentProps) {

  const applyGrayscale = () => {
    if (!wasm || !canvasRef.current || !image) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    wasm.grayscale(imageData.data);

    ctx.putImageData(imageData, 0, 0);
  };

  return (
    <div className="flex flex-row">
      <input type="checkbox" id="gray" onClick={applyGrayscale} disabled={!wasm || !image}/>
      <label>흑백 필터</label>
    </div>
  )
}

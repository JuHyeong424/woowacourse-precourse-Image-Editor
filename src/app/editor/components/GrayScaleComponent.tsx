import {WasmModule} from "@/lib/wasm-loader";
import React from "react";

interface GrayScaleComponentProps {
  wasm: WasmModule | null;
  image: HTMLImageElement | null;
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  originalPixels: ImageData["data"] | null;
}

export default function GrayScaleComponent({ wasm, canvasRef, image, originalPixels}: GrayScaleComponentProps) {

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

  const resetColor = () => {
    const canvas = canvasRef.current;
    if (!canvas || !originalPixels) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    imageData.data.set(originalPixels!);
    ctx.putImageData(imageData, 0, 0);
  };

  return (
    <div className="flex flex-row">
      <input
        type="checkbox"
        id="gray"
        disabled={!wasm || !image}
        onChange={(e) => {
          if (e.target.checked) {
            applyGrayscale();
          } else {
            resetColor();
          }
        }}
      />
      <label htmlFor="gray">흑백 필터</label>
    </div>
  );
}

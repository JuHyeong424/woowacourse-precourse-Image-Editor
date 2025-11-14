import {WasmModule} from "@/lib/wasm-loader";
import React from "react";
import useCanvasUtils from "@/app/hooks/useCanvasUtils";

interface GrayScaleComponentProps {
  wasm: WasmModule | null;
  image: HTMLImageElement | null;
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  originalPixels: ImageData["data"] | null;
}

export default function GrayScaleComponent({ wasm, canvasRef, image, originalPixels}: GrayScaleComponentProps) {
  const { getCanvasImageData } = useCanvasUtils({ canvasRef });

  const applyGrayscale = () => {
    if (!wasm || !image) return;

    const info = getCanvasImageData();
    if (!info) return;

    const { ctx, imageData } = info;

    wasm.grayscale(imageData.data);
    ctx.putImageData(imageData, 0, 0);
  };

  const resetColor = () => {
    const info = getCanvasImageData();
    if (!info) return;

    const { ctx, imageData } = info;

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

import {WasmModule} from "@/lib/wasm-loader";
import React, {useEffect, useState} from "react";
import useCanvasUtils from "@/app/hooks/useCanvasUtils";
import {reset} from "next/dist/lib/picocolors";

interface GrayScaleComponentProps {
  wasm: WasmModule | null;
  image: HTMLImageElement | null;
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  originalPixels: ImageData["data"] | null;
}

export default function GrayScaleComponent({ wasm, canvasRef, image, originalPixels}: GrayScaleComponentProps) {
  const { getCanvasImageData } = useCanvasUtils({ canvasRef });
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    setIsChecked(false);
  }, [image]);

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

  const handleChange = (e) => {
    const checked = e.target.checked;
    setIsChecked(checked);
    if (checked)  {
      applyGrayscale()
    } else {
      resetColor();
    }
  };

  return (
    <div className="flex flex-row">
      <input
        type="checkbox"
        id="gray"
        checked={isChecked}
        disabled={!wasm || !image}
        onChange={handleChange}
      />
      <label htmlFor="gray">흑백 필터</label>
    </div>
  );
}

import {WasmModule} from "@/lib/wasm-loader";
import React, {useEffect, useState} from "react";
import useCanvasUtils from "@/app/hooks/useCanvasUtils";
import useImageFilters from "@/app/hooks/useImageFilters";

interface GrayScaleComponentProps {
  wasm: WasmModule | null;
  image: HTMLImageElement | null;
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  originalPixels: ImageData["data"] | null;
}

export default function GrayScaleComponent({ wasm, canvasRef, image, originalPixels}: GrayScaleComponentProps) {
  const { getCanvasImageData } = useCanvasUtils({ canvasRef });
  const { applyGrayscale, resetColor } = useImageFilters();
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    setIsChecked(false);
  }, [image]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setIsChecked(checked);
    if (checked)  {
      applyGrayscale(wasm, image, getCanvasImageData)
    } else {
      resetColor(getCanvasImageData, originalPixels);
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

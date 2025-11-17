import {WasmModule} from "@/lib/wasm-loader";
import React, {useEffect, useState} from "react";
import useFilterGrayscale from "@/app/hooks/image/filters/useFilterGrayscale";
import useFilterResetColor from "@/app/hooks/image/filters/useFilterResetColor";

interface CanvasInfo {
  ctx: CanvasRenderingContext2D;
  imageData: ImageData;
}

type GetCanvasImageData = () => CanvasInfo | null;

interface GrayScaleComponentProps {
  wasm: WasmModule | null;
  image: HTMLImageElement | null;
  originalPixels: ImageData["data"] | null;
  getCanvasImageData: GetCanvasImageData;
  isChecked: boolean;
  setIsChecked: (v: boolean) => void;
}

export default function GrayScaleComponent({ wasm, image, originalPixels, getCanvasImageData, isChecked, setIsChecked }: GrayScaleComponentProps) {
  const { applyGrayscale } = useFilterGrayscale();
  const { resetColor } = useFilterResetColor();

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

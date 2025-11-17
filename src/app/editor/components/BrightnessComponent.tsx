import {WasmModule} from "@/lib/wasm-loader";
import React, {useEffect, useState} from "react";
import useFilterBrightness from "@/app/hooks/image/filters/useFilterBrightness";

interface CanvasInfo {
  ctx: CanvasRenderingContext2D;
  imageData: ImageData;
}

type GetCanvasImageData = () => CanvasInfo | null;

interface BrightnessComponentProps {
  wasm: WasmModule | null;
  image: HTMLImageElement | null;
  originalPixels: ImageData["data"] | null;
  getCanvasImageData: GetCanvasImageData;
  setIsChecked: (v: boolean) => void;
}

export default function BrightnessComponent({
                                              wasm,
                                              image,
                                              originalPixels,
                                              getCanvasImageData,
                                              setIsChecked
                                            }: BrightnessComponentProps) {
  const {applyBrightness} = useFilterBrightness();
  const [value, setValue] = useState(100);

  useEffect(() => {
    setValue(100);
  }, [image]);

  const handleBrightness = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(false);

    const newValue = Number(e.target.value);
    setValue(newValue);
    applyBrightness(wasm, getCanvasImageData, newValue, originalPixels);
  }

  return (
    <div className="flex flex-col gap-4 mt-6">
      <div className="text-xl font-semibold text-white flex items-center gap-2">
        <span>밝기 조절</span>
        <span className="text-blue-400">{value}</span>
      </div>

      <input
        type="range"
        min="0"
        max="200"
        value={value}
        onChange={handleBrightness}
        disabled={!wasm || !image}
        className="brightnessSlider"
      />
    </div>
  )
}

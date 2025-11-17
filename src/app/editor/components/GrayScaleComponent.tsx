import {WasmModule} from "@/lib/wasm-loader";
import React, {useEffect} from "react";
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
    <div className="flex items-center gap-3">
      <input
        type="checkbox"
        id="gray"
        checked={isChecked}
        disabled={!wasm || !image}
        onChange={handleChange}
        className="peer hidden"
      />

      <label
        htmlFor="gray"
        className="
        w-6 h-6 rounded-md border-2 border-gray-400
        flex items-center justify-center
        peer-checked:bg-blue-500 peer-checked:border-blue-500
        peer-disabled:opacity-40
        transition-all duration-200 cursor-pointer
      "
      >
        <svg
          className="
          w-4 h-4 text-white opacity-0 scale-50
          peer-checked:opacity-100 peer-checked:scale-100
          transition-all duration-200
        "
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          viewBox="0 0 24 24"
        >
          <path d="M5 13l4 4L19 7" />
        </svg>
      </label>

      <span className="text-xl cursor-pointer select-none" onClick={() => setIsChecked(!isChecked)}>
      흑백 필터
    </span>
    </div>
  );
}

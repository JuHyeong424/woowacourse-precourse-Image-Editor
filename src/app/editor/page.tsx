"use client"

import UploadedImageComponent from "@/app/editor/components/ImageFile/UploadedImageComponent";
import GrayScaleComponent from "@/app/editor/components/GrayScaleComponent";
import useImageEditor from "@/app/hooks/image/editor/useImageEditor";
import useGetCanvasImageData from "@/app/hooks/canvas/useGetCanvasImageData";
import BrightnessComponent from "@/app/editor/components/BrightnessComponent";
import {useCallback, useEffect, useState} from "react";
import useImageFilters from "@/app/hooks/image/filters/useImageFilters";

export default function EditorPage() {
  const {
    wasm,
    image,
    setImage,
    originalPixels,
    canvasRef
  } = useImageEditor();

  const { getCanvasImageData } = useGetCanvasImageData({ canvasRef });
  const { applyBrightness, applyGrayscale, resetColor } = useImageFilters();

  const [brightness, setBrightness] = useState(100);
  const [isGray, setIsGray] = useState(false);

  useEffect(() => {
    setBrightness(100);
    setIsGray(false);
  }, [image]);

  const applyAllFilters = useCallback(() => {
    if (!wasm || !image || !originalPixels) return;

    resetColor(getCanvasImageData, originalPixels);

    if (brightness !== 100) applyBrightness(wasm, getCanvasImageData, brightness, originalPixels);

    if (isGray) applyGrayscale(wasm, getCanvasImageData);
  }, [wasm, image, originalPixels, brightness, isGray, getCanvasImageData, resetColor, applyBrightness, applyGrayscale]);

  useEffect(() => {
    applyAllFilters();
  }, [brightness, isGray, applyAllFilters]);

  return (
    <div className="flex flex-row bg-black text-white h-screen gap-6 p-12">
      <div className="flex flex-col p-4 border-2 min-w-[30%] h-full rounded-xl">
        <h2 className="text-2xl text-center font-bold m-4">편집 도구</h2>
        <div className="flex flex-col gap-4">
          <GrayScaleComponent
            disabled={!wasm || !image}
            isGray={isGray}
            setIsGray={setIsGray}
          />
          <BrightnessComponent
            disabled={!wasm || !image}
            brightness={brightness}
            setBrightness={setBrightness}
          />
        </div>
      </div>
      <UploadedImageComponent canvasRef={canvasRef} image={image} setImage={setImage} />
    </div>
  );
}

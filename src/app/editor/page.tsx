"use client"

import UploadedImageComponent from "@/app/editor/components/ImageFile/UploadedImageComponent";
import GrayScaleComponent from "@/app/editor/components/GrayScaleComponent";
import useImageEditor from "@/app/hooks/image/editor/useImageEditor";
import useGetCanvasImageData from "@/app/hooks/canvas/useGetCanvasImageData";
import BrightnessComponent from "@/app/editor/components/BrightnessComponent";
import {useState} from "react";

export default function EditorPage() {
  const [isChecked, setIsChecked] = useState(false);
  const {
    wasm,
    image,
    setImage,
    originalPixels,
    canvasRef
  } = useImageEditor();

  const { getCanvasImageData } = useGetCanvasImageData({ canvasRef });

  return (
    <div className="flex flex-row bg-black text-white h-screen gap-6 p-12">
      <div className="flex flex-col p-4 border-2 min-w-[30%] h-full rounded-xl">
        <h2 className="text-2xl text-center font-bold m-4">편집 도구</h2>
        <div className="flex flex-col gap-4">
          <GrayScaleComponent
            wasm={wasm}
            image={image}
            originalPixels={originalPixels}
            getCanvasImageData={getCanvasImageData}
            isChecked={isChecked}
            setIsChecked={setIsChecked}
          />
          <BrightnessComponent
            wasm={wasm}
            image={image}
            originalPixels={originalPixels}
            getCanvasImageData={getCanvasImageData}
            setIsChecked={setIsChecked}
          />
        </div>
      </div>
      <UploadedImageComponent canvasRef={canvasRef} image={image} setImage={setImage} />
    </div>
  );
}

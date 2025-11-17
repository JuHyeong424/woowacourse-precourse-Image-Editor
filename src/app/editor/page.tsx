"use client"

import UploadedImageComponent from "@/app/editor/components/ImageFile/UploadedImageComponent";
import GrayScaleComponent from "@/app/editor/components/GrayScaleComponent";
import useImageEditor from "@/app/hooks/image/editor/useImageEditor";
import useGetCanvasImageData from "@/app/hooks/cavas/useGetCanvasImageData";

export default function EditorPage() {
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
        <h2>편집 도구</h2>

        <GrayScaleComponent
          wasm={wasm}
          image={image}
          canvasRef={canvasRef}
          originalPixels={originalPixels}
          getCanvasImageData={getCanvasImageData}
        />

        <span>밝기 조절: 0</span>
        <input type="range" min="0" max="200" value={100} />
      </div>

      <UploadedImageComponent canvasRef={canvasRef} image={image} setImage={setImage} />
    </div>
  );
}

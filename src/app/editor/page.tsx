"use client"

import UploadedImageComponent from "@/app/editor/components/ImageFile/UploadedImageComponent";
import GrayScaleComponent from "@/app/editor/components/GrayScaleComponent";
import useImageEditor from "@/app/hooks/image/editor/useImageEditor";
import useGetCanvasImageData from "@/app/hooks/canvas/useGetCanvasImageData";
import BrightnessComponent from "@/app/editor/components/BrightnessComponent";
import useImageFilterController from "@/app/hooks/image/filters/useImageFilterController";
import ContrastComponent from "@/app/editor/components/ContrastComponent";

export default function EditorPage() {
  const {
    wasm,
    image,
    setImage,
    originalPixels,
    canvasRef
  } = useImageEditor();

  const { getCanvasImageData } = useGetCanvasImageData({ canvasRef });

  const {
    filters,
    setFilter,
    disabled
  } = useImageFilterController({
    wasm,
    image,
    originalPixels,
    getCanvasImageData
  });

  return (
    <div className="flex flex-row bg-black text-white h-screen gap-6 p-12">
      <div className="flex flex-col p-4 border-2 min-w-[30%] h-full rounded-xl">
        <h2 className="text-2xl text-center font-bold m-4">편집 도구</h2>
        <div className="flex flex-col gap-4">
          <GrayScaleComponent
            disabled={disabled}
            isGray={filters.isGray}
            setIsGray={(v) => setFilter("isGray", v)}
          />
          <BrightnessComponent
            disabled={disabled}
            brightness={filters.brightness}
            setBrightness={(v) => setFilter("brightness", v)}
          />
          <ContrastComponent
            disabled={disabled}
            contrast={filters.contrast}
            setContrast={(v) => setFilter("contrast", v)}
          />
        </div>
      </div>
      <UploadedImageComponent canvasRef={canvasRef} image={image} setImage={setImage} />
    </div>
  );
}

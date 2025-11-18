"use client"

import UploadedImageComponent from "@/app/editor/components/ImageFile/UploadedImageComponent";
import GrayScaleComponent from "@/app/editor/components/GrayScaleComponent";
import useImageEditor from "@/app/hooks/image/editor/useImageEditor";
import useGetCanvasImageData from "@/app/hooks/canvas/useGetCanvasImageData";
import useImageFilterController from "@/app/hooks/image/filters/management/useImageFilterController";
import SliderFilterComponent from "@/app/editor/components/SliderFilterComponent";
import InvertComponent from "@/app/editor/components/InvertComponent";

export default function EditorPage() {
  const {
    wasm,
    image,
    setImage,
    originalPixels,
    canvasRef
  } = useImageEditor();

  const { getCanvasImageData } = useGetCanvasImageData({ canvasRef });

  const { filters, setFilter, disabled} = useImageFilterController({
    wasm,
    image,
    originalPixels,
    getCanvasImageData
  });

  const sliderFilters = [
    { key: "brightness", label: "밝기 조절" },
    { key: "contrast", label: "대비 조절"},
    { key: "saturation", label: "채도 조절"},
    { key: "exposure", label: "감마 조절"},
  ]

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
          <InvertComponent
            disabled={disabled}
            invert={filters.invert}
            setInvert={(v) => setFilter("invert", v)}
          />
          {sliderFilters.map((filter) => (
            <SliderFilterComponent
              key={filter.key}
              disabled={disabled}
              label={filter.label}
              value={filters[filter.key]}
              setValue={(v) => setFilter(filter.key, v)}
              className='slider'
            />
          ))}
        </div>
      </div>
      <UploadedImageComponent canvasRef={canvasRef} image={image} setImage={setImage} />
    </div>
  );
}

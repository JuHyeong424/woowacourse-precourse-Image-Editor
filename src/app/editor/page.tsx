"use client"

import UploadedImageComponent from "@/app/editor/components/ImageFile/UploadedImageComponent";
import useImageEditor from "@/app/hooks/image/editor/useImageEditor";
import useGetCanvasImageData from "@/app/hooks/canvas/useGetCanvasImageData";
import useImageFilterController from "@/app/hooks/image/filters/management/useImageFilterController";
import SliderFilterComponent from "@/app/editor/components/SliderFilterComponent";
import ButtonFilterComponent from "@/app/editor/components/ButtonFilterComponent";

type FilterState = {
  invert: boolean;
  exposure: number;
  saturation: number;
  contrast: number;
  brightness: number;
  isGray: boolean;
};

type BooleanFilterKey = "invert" | "isGray";
type NumberFilterKey = | "exposure" | "saturation" | "contrast" | "brightness";

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

  const sliderFilters: { key: NumberFilterKey; label: string }[] = [
    { key: "brightness", label: "밝기 조절" },
    { key: "contrast", label: "대비 조절"},
    { key: "saturation", label: "채도 조절"},
    { key: "exposure", label: "감마 조절"},
  ];

  const buttonFilters: { key: BooleanFilterKey; label: string; id: string; }[] = [
    { key: "isGray", label: "흑백 필터", id: "grayscale" },
    { key: "invert", label: "색 반전 필터", id: "invert" },
  ];

  return (
    <div className="flex flex-row bg-black text-white h-screen gap-6 p-12">
      <div className="flex flex-col p-4 border-2 min-w-[30%] h-full rounded-xl">
        <h2 className="text-2xl text-center font-bold m-4">편집 도구</h2>
        <div className="flex flex-col gap-4">
          {buttonFilters.map((filter) => (
            <ButtonFilterComponent
              key={filter.key}
              disabled={disabled}
              label={filter.label}
              id={filter.id}
              value={filters[filter.key]}
              setValue={(v) => setFilter(filter.key, v)}
            />
          ))}
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

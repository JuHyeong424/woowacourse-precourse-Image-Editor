"use client"

import UploadedImageComponent from "@/app/editor/components/ImageFile/UploadedImageComponent";
import useImageEditor from "@/app/hooks/image/editor/useImageEditor";
import useGetCanvasImageData from "@/app/hooks/canvas/useGetCanvasImageData";
import useImageFilterController from "@/app/hooks/image/filters/management/useImageFilterController";
import SliderFilterComponent from "@/app/editor/components/SliderFilterComponent";
import ButtonFilterComponent from "@/app/editor/components/ButtonFilterComponent";

type FilterState = {
  vignette: number;
  clarity: number;
  shadows: number;
  highlights: number;
  tint: number;
  temperature: number;
  hue: number;
  sharpen: boolean;
  blur: boolean;
  invert: boolean;
  isGray: boolean;
  exposure: number;
  saturation: number;
  contrast: number;
  brightness: number;
};

type BooleanFilterKey = "invert" | "isGray" | "blur" | "sharpen";
type NumberFilterKey = | "exposure" | "saturation" | "contrast" | "brightness" | "hue" | "temperature" | "tint" | "shadows" | "highlights" | "clarity" | "vignette";

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

  const sliderFilters: { key: NumberFilterKey; label: string; min: number; max: number; }[] = [
    { key: "brightness", label: "밝기 조절", min: 0, max: 200 },
    { key: "contrast", label: "대비 조절", min: 0, max: 200 },
    { key: "saturation", label: "채도 조절", min: 0, max: 200 },
    { key: "exposure", label: "감마 조절", min: -100, max: 100 },
    { key: "hue", label: "색조 회전", min: 0, max: 360 },
    { key: "temperature", label: "색온도", min: -100, max: 100 },
    { key: "tint", label: "색감", min: -100, max: 100 },
    { key: "shadows", label: "섀도우 조절", min: -100, max: 100 },
    { key: "highlights", label: "하이라이트 조절", min: -100, max: 100 },
    { key: "clarity", label: "로컬 대비 조절", min: -100, max: 100 },
    { key: "vignette", label: "비네트 강도 조절", min: -100, max: 100 },
  ];

  const buttonFilters: { key: BooleanFilterKey; label: string; id: string; }[] = [
    { key: "isGray", label: "흑백 필터", id: "grayscale" },
    { key: "invert", label: "색 반전 필터", id: "invert" },
    { key: "blur", label: "블러 필터", id: "blur"},
    { key: "sharpen", label: "선명도 필터", id: "sharpen" },
  ];

  return (
    <div className="flex flex-row bg-black text-white h-screen gap-6 p-12">
      <div className="flex flex-col p-4 border-2 min-w-[30%] h-full rounded-xl overflow-y-auto overlay-scroll">
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
              min={filter.min}
              max={filter.max}
              className='slider'
            />
          ))}
        </div>
      </div>
      <UploadedImageComponent canvasRef={canvasRef} image={image} setImage={setImage} />
    </div>
  );
}

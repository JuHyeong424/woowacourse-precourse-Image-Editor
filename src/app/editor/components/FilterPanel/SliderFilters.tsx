import SliderFilterComponent from "@/app/editor/components/FilterPanel/SliderFilterComponent";
import React from "react";
import {FilterProps, NumberFilterKey} from "@/app/types/filterStateTypes";

export default function SliderFilters({ filters, setFilter, disabled }: FilterProps) {
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

  return (
    <div className="flex flex-col gap-4">
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
  )
}

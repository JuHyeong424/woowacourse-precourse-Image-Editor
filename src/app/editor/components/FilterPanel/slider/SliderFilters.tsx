import SliderFilterComponent from "@/app/editor/components/FilterPanel/slider/SliderFilterComponent";
import React from "react";
import {FilterProps} from "@/app/types/filterStateTypes";
import {SLIDER_FLITER} from "@/app/config/filter/filter";

export default function SliderFilters({ filters, setFilter, disabled }: FilterProps) {
  return (
    <div className="flex flex-col gap-4">
      {SLIDER_FLITER.map((filter) => (
        <SliderFilterComponent
          key={filter.key}
          id={filter.key}
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

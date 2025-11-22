import React from "react";
import ButtonFilters from "@/app/editor/components/FilterPanel/button/ButtonFilters";
import SliderFilters from "@/app/editor/components/FilterPanel/slider/SliderFilters";
import {FilterProps} from "@/app/types/filterStateTypes";

export default function FilterPanel({ filters, setFilter, disabled }: FilterProps) {
  return (
    <div className="flex flex-col p-4 border-2 min-w-[30%] small:h-[30%] medium:h-[30%] tablet:h-full laptop:h-full rounded-xl overflow-y-auto overlay-scroll">
      <h2 className="small:text-xl medium:text-xl tablet:text-2xl laptop:text-2xl text-center font-bold small:m-3 medium:m-3 tablet:m-4 laptop:m-4">편집 도구</h2>
      <ButtonFilters
        filters={filters}
        setFilter={setFilter}
        disabled={disabled}
      />
      <SliderFilters
        filters={filters}
        setFilter={setFilter}
        disabled={disabled}
      />
    </div>
  )
}

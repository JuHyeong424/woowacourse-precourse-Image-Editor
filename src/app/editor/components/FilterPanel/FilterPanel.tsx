import React from "react";
import ButtonFilters from "@/app/editor/components/FilterPanel/ButtonFilters";
import SliderFilters from "@/app/editor/components/FilterPanel/SliderFilters";

interface FilterPanelProps {

}

export default function FilterPanel({ filters, setFilter, disabled }: FilterPanelProps) {
  return (
    <div className="flex flex-col p-4 border-2 min-w-[30%] h-full rounded-xl overflow-y-auto overlay-scroll">
      <h2 className="text-2xl text-center font-bold m-4">편집 도구</h2>
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

import ButtonFilterComponent from "@/app/editor/components/FilterPanel/button/ButtonFilterComponent";
import React from "react";
import {BooleanFilterKey, FilterProps} from "@/app/types/filterStateTypes";

export default function ButtonFilters({ filters, setFilter, disabled }: FilterProps) {
  const buttonFilters: { key: BooleanFilterKey; label: string; id: string; }[] = [
    { key: "isGray", label: "흑백 필터", id: "grayscale" },
    { key: "invert", label: "색 반전 필터", id: "invert" },
    { key: "blur", label: "블러 필터", id: "blur"},
    { key: "sharpen", label: "선명도 필터", id: "sharpen" },
  ];

  return (
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
    </div>
  )
}
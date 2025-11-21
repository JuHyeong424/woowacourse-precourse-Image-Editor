import ButtonFilterComponent from "@/app/editor/components/FilterPanel/button/ButtonFilterComponent";
import React from "react";
import {FilterProps} from "@/app/types/filterStateTypes";
import {BUTTON_FILTERS} from "@/app/constants/filter";

export default function ButtonFilters({ filters, setFilter, disabled }: FilterProps) {
  return (
    <div className="flex flex-col gap-4">
      {BUTTON_FILTERS.map((filter) => (
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
import React from "react";

interface SliderFilterComponentProps {
  disabled: boolean;
  label: string;
  value: number;
  setValue: (v: number) => void;
  min: number;
  max: number;
  className: string;
  id: string;
}

export default function SliderFilterComponent({
    disabled,
    label,
    value,
    setValue,
    min,
    max,
    className,
    id
  }: SliderFilterComponentProps) {
  return (
    <div className="flex flex-col gap-4 small:my-2 medium:my-2 tablet:my-4 laptop:my-4">
      <div className="small:text-sm medium:text-sm tablet:text-xl laptop:text-xl font-semibold text-white flex items-center gap-2">
        <span>{label}</span>
        <span className="text-blue-400">{value}</span>
      </div>

      <input
        type="range"
        id={id}
        data-testid={`${id}-slider`}
        min={min}
        max={max}
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        disabled={disabled}
        className={className}
      />
    </div>
  )
}

import React from "react";

interface SliderFilterComponentProps {
  disabled: boolean;
  label: string;
  value: number;
  setValue: (v: number) => void;
  min: number;
  max: number;
  className: string;
}

export default function SliderFilterComponent({
    disabled,
    label,
    value,
    setValue,
    min,
    max,
    className
  }: SliderFilterComponentProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    setValue(newValue);
  };

  return (
    <div className="flex flex-col gap-4 mt-6">
      <div className="text-xl font-semibold text-white flex items-center gap-2">
        <span>{label}</span>
        <span className="text-blue-400">{value}</span>
      </div>

      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={handleChange}
        disabled={disabled}
        className={className}
      />
    </div>
  )
}

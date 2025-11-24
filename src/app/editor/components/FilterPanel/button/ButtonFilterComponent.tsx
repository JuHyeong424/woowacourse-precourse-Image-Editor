import React from "react";

interface ButtonFilterComponentProps {
  disabled: boolean;
  label: string;
  id: string;
  value: boolean;
  setValue: (v: boolean) => void;
}

export default function ButtonFilterComponent({
    disabled,
    label,
    id,
    value,
    setValue
  }: ButtonFilterComponentProps) {
  return (
    <div className="flex items-center gap-3">
      <input
        type="checkbox"
        id={id}
        checked={value}
        disabled={disabled}
        onChange={(e) => setValue(e.target.checked)}
        className="peer hidden"
      />

      <label
        htmlFor={id}
        data-testid={`${id}-button`}
        className="
          w-6 h-6 rounded-md border-2 border-gray-400
          flex items-center justify-center
          peer-checked:bg-blue-500 peer-checked:border-blue-500
          peer-disabled:opacity-40
          transition-all duration-200 cursor-pointer
        "
      >
        <span
          className={`
            text-white text-sm
            transition-opacity duration-200
            ${value ? "opacity-100" : "opacity-0"}
          `}
        >
          ✓
        </span>
      </label>

      <label
        className="small:text-sm medium:text-sm tablet:text-xl laptop:text-xl cursor-pointer select-none"
        data-testid={`${id}-label`}
        onClick={() => !disabled && setValue(!value)}
      >
        {label}
      </label>
    </div>
  );
}

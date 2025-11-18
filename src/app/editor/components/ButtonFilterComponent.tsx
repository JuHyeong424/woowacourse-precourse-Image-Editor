import React from "react";

export default function ButtonFilterComponent({
    disabled,
    label,
    value,
    setValue
  }) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.checked);
  };

  return (
    <div className="flex items-center gap-3">
      <input
        type="checkbox"
        id="invert"
        checked={value}
        disabled={disabled}
        onChange={handleChange}
        className="peer hidden"
      />

      <label
        htmlFor="gray"
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

      <span
        className="text-xl cursor-pointer select-none"
        onClick={() => !disabled && setValue(!value)}
      >
        {label}
    </span>
    </div>
  );
}

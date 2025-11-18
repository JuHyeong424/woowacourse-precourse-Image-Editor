import React from "react";

interface InvertComponentProps {
  disabled: boolean;
  invert: boolean;
  setInvert: (v: boolean) => void;
}

export default function InvertComponent({disabled, invert, setInvert}: InvertComponentProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInvert(e.target.checked);
  };

  return (
    <div className="flex items-center gap-3">
      <input
        type="checkbox"
        id="invert"
        checked={invert}
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
            ${invert ? "opacity-100" : "opacity-0"}
          `}
        >
          ✓
        </span>
      </label>

      <span
        className="text-xl cursor-pointer select-none"
        onClick={() => !disabled && setInvert(!invert)}
      >
        색 반전 필터
    </span>
    </div>
  );
}

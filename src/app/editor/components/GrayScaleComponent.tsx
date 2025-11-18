import React from "react";

interface GrayScaleComponentProps {
  disabled: boolean;
  isGray: boolean;
  setIsGray: (v: boolean) => void;
}

export default function GrayScaleComponent({disabled, isGray, setIsGray}: GrayScaleComponentProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsGray(e.target.checked);
  };

  return (
    <div className="flex items-center gap-3">
      <input
        type="checkbox"
        id="gray"
        checked={isGray}
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
            ${isGray ? "opacity-100" : "opacity-0"}
          `}
        >
          ✓
        </span>
      </label>

      <span
        className="text-xl cursor-pointer select-none"
        onClick={() => !disabled && setIsGray(!isGray)}
      >      흑백 필터
    </span>
    </div>
  );
}

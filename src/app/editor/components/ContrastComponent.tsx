import React from "react";

interface ContrastComponentProps {
  disabled: boolean;
  contrast: number;
  setContrast: (v: number) => void;
}

export default function ContrastComponent({ disabled, contrast, setContrast }: ContrastComponentProps) {
  const handleBrightness = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    setContrast(newValue);
  };

  return (
    <div className="flex flex-col gap-4 mt-6">
      <div className="text-xl font-semibold text-white flex items-center gap-2">
        <span>대비 조절</span>
        <span className="text-blue-400">{contrast}</span>
      </div>

      <input
        type="range"
        min="0"
        max="200"
        value={contrast}
        onChange={handleBrightness}
        disabled={disabled}
        className="brightnessSlider"
      />
    </div>
  )
}

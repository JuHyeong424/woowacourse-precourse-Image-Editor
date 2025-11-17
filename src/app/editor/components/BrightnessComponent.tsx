import React from "react";

interface BrightnessComponentProps {
  disabled: boolean;
  brightness: number;
  setBrightness: (v: number) => void;
}

export default function BrightnessComponent({ disabled, brightness, setBrightness }: BrightnessComponentProps) {
  const handleBrightness = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    setBrightness(newValue);
  };

  return (
    <div className="flex flex-col gap-4 mt-6">
      <div className="text-xl font-semibold text-white flex items-center gap-2">
        <span>밝기 조절</span>
        <span className="text-blue-400">{brightness}</span>
      </div>

      <input
        type="range"
        min="0"
        max="200"
        value={brightness}
        onChange={handleBrightness}
        disabled={disabled}
        className="brightnessSlider"
      />
    </div>
  )
}

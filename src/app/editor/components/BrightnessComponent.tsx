import React from "react";
import SliderFilterComponent from "@/app/editor/components/SliderFilterComponent";

interface BrightnessComponentProps {
  disabled: boolean;
  brightness: number;
  setBrightness: (v: number) => void;
}

export default function BrightnessComponent({ disabled, brightness, setBrightness }: BrightnessComponentProps) {
  return (
    <SliderFilterComponent
      disabled={disabled}
      label='밝기 조절'
      value={brightness}
      setValue={setBrightness}
      className='slider'
    />
  )
}

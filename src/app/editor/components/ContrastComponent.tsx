import React from "react";
import SliderFilterComponent from "@/app/editor/components/SliderFilterComponent";

interface ContrastComponentProps {
  disabled: boolean;
  contrast: number;
  setContrast: (v: number) => void;
}

export default function ContrastComponent({ disabled, contrast, setContrast }: ContrastComponentProps) {
  return (
    <SliderFilterComponent
      disabled={disabled}
      label='대비 조절'
      value={contrast}
      setValue={setContrast}
      className='slider'
    />
  )
}

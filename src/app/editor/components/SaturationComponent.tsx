import SliderFilterComponent from "@/app/editor/components/SliderFilterComponent";

interface SaturationComponentProps {
  disabled: boolean;
  saturation: number;
  setSaturation: (v: number) => void;
}

export default function SaturationComponent({disabled, saturation, setSaturation}: SaturationComponentProps) {
  return (
    <SliderFilterComponent
      disabled={disabled}
      label='채도 조절'
      value={saturation}
      setValue={setSaturation}
      className='slider'
    />
  );
}

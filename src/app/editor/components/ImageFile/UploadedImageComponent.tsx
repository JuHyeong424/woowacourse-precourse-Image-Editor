import React, {useEffect, useState} from "react";
import SelectFileComponent from "@/app/editor/components/ImageFile/SelectFileComponent";

interface UploadedImageComponentProps {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  image: HTMLImageElement | null,
  setImage: (img: HTMLImageElement) => void;
}

export default function UploadedImageComponent({canvasRef, image, setImage}: UploadedImageComponentProps) {
  const [showCanvas, setShowCanvas] = useState(false);

  useEffect(() => {
    setShowCanvas(!!image);
  }, [image]);


  return (
    <div className="relative flex flex-1 border-2 h-full rounded-lg p-4 flex-col items-center justify-center text-center">
      {!showCanvas && (
        <SelectFileComponent setImage={setImage} />
      )}
      <canvas ref={canvasRef} className="w-full h-full border-2 border-gray-300"/>
    </div>
  )
}

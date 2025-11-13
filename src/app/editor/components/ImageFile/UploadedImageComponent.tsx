import React, {useEffect, useState} from "react";
import { IoMdCloseCircle } from "react-icons/io";
import SelectFileComponent from "@/app/editor/components/ImageFile/SelectFileComponent";

interface UploadedImageComponentProps {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  image: HTMLImageElement | null,
  setImage: (img: HTMLImageElement | null) => void;
}

export default function UploadedImageComponent({canvasRef, image, setImage}: UploadedImageComponentProps) {
  const [showCanvas, setShowCanvas] = useState(false);

  useEffect(() => {
    setShowCanvas(!!image);
  }, [image]);

  const deleteImage = () => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      ctx?.clearRect(0, 0, canvas.width, canvas.height);
    }
    setImage(null);
    setShowCanvas(false);
  };


  return (
    <div className="relative flex flex-1 border-2 h-full rounded-lg p-4 flex-col items-center justify-center text-center">
      {!showCanvas && (
        <SelectFileComponent setImage={setImage} />
      )}

      {showCanvas && (
        <IoMdCloseCircle onClick={deleteImage} className="absolute top-4 right-4 text-red-500 text-4xl cursor-pointer z-10" />
      )}

      <canvas ref={canvasRef} className="w-full h-full border-2 border-gray-300"/>
    </div>
  )
}

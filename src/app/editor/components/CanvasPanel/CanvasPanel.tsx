import React from "react";
import {IoMdCloseCircle} from "react-icons/io";
import SelectFileComponent from "@/app/editor/components/CanvasPanel/SelectFileComponent";
import DownloadImageComponent from "@/app/editor/components/CanvasPanel/DownloadImageComponent";
import clearCanvasUtil from "@/app/utils/canvas/clearCanvasUtil";

interface UploadedImageComponentProps {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  image: HTMLImageElement | null,
  setImage: (img: HTMLImageElement | null) => void;
}

export default function CanvasPanel({ canvasRef, image, setImage }: UploadedImageComponentProps) {
  const hasImage = !!image;

  const deleteImage = () => {
    clearCanvasUtil(canvasRef);
    setImage(null);
  };

  return (
    <div
      className="relative flex flex-1 border-2 h-full rounded-lg p-4 flex-col items-center justify-center text-center">
      {!hasImage && <SelectFileComponent setImage={setImage}/>}
      {hasImage && (
        <>
          <IoMdCloseCircle
            onClick={deleteImage}
            className="absolute top-4 left-4 text-red-500 text-4xl cursor-pointer z-10 bg-white rounded-full m-4"
          />
          <DownloadImageComponent canvasRef={canvasRef} />
        </>
      )}
      <canvas
        ref={canvasRef}
        className="w-full h-full object-contain border-2 border-gray-300"
      />
    </div>
  )
}

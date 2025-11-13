import React from "react";

interface UploadedImageComponentProps {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  setImage: () => HTMLImageElement | null;
}

export default function UploadedImageComponent({canvasRef, setImage}: UploadedImageComponentProps) {
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target?.files[0]) {
      const url = URL.createObjectURL(e.target?.files[0]);
      const img = new Image();
      img.src = url;
      img.onload = () => setImage(img);
    }
  }

  return (
    <div className="relative flex flex-1 border-2 h-full rounded-lg p-4 flex-col items-center justify-center text-center">
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
        <h2 className="font-bold text-2xl m-4">이미지를 업로드하여 편집을 시작하세요</h2>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="bg-white/10 text-white px-4 py-2 rounded border border-white/20"
        />
      </div>

      <canvas ref={canvasRef} className="w-full h-full border-2 border-gray-300"/>
    </div>
  )
}

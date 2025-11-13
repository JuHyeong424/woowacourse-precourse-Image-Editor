import React from "react";

interface UploadedImageComponentProps {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  setImage: () => HTMLImageElement | null;
}

export default function UploadedImageComponent({ canvasRef, setImage }) {
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target?.files[0]) {
      const url = URL.createObjectURL(e.target?.files[0]);
      const img = new Image();
      img.src = url;
      img.onload = () => setImage(img);
    }
  }

  return (
    <div className="flex-1 border-2 h-full rounded-lg">
      <p>이미지를 업로드하여 편집을 시작하세요</p>
      <input type="file" accept="image/*" onChange={handleImageUpload}/>
      <canvas ref={canvasRef} className="border-2 border-gray-300"/>
    </div>
  )
}

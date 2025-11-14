import React from "react";
import useImageUtils from "@/app/hooks/useImageUtils";

interface SelectFileProps {
  setImage: (img: HTMLImageElement | null) => void;
}

export default function SelectFileComponent({ setImage }: SelectFileProps) {
  const { loadImage } = useImageUtils();
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    loadImage(file, setImage);
  };

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
      <h2 className="font-bold text-2xl m-4">이미지를 업로드하여 편집을 시작하세요</h2>
      <label
        htmlFor="fileUpload"
        className="px-6 py-3 bg-white/10 text-white rounded-lg cursor-pointer text-center"
      >
        파일 선택
      </label>
      <input
        id="fileUpload"
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
      />
    </div>
  )
}

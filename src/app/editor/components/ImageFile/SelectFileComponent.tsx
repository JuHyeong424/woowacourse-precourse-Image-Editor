import React from "react";

interface SelectFileProps {
  setImage: (img: HTMLImageElement) => void;
}

export default function SelectFileComponent({ setImage }: SelectFileProps) {
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target?.files[0]) {
      const url = URL.createObjectURL(e.target?.files[0]);
      const img = new Image();
      img.src = url;
      img.onload = () => setImage(img);
    }
  }

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

import React from "react";

interface SelectFileProps {
  setImage: (img: HTMLImageElement) => void;
}

export default function SelectFileComponent({ setImage }: SelectFileProps) {
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      setImage(img);
      URL.revokeObjectURL(url);
    };
    img.onerror = () => {
      console.error("이미지 로드 실패");
      URL.revokeObjectURL(url);
    };
    img.src = url;
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

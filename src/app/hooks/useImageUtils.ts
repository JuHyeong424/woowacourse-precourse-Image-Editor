export default function useImageUtils() {
  const loadImage = (file: File, setImage: (img: HTMLImageElement) => void) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.src = url;

    img.onload = () => {
      setImage(img);
      URL.revokeObjectURL(url);
    };

    img.onerror = () => {
      console.error("이미지 로드 실패");
      URL.revokeObjectURL(url);
    };
  };

  return { loadImage };
}

interface DownloadImageComponentProps {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
}

export default function DownloadImageComponent({ canvasRef }: DownloadImageComponentProps) {
  const handleDownload  = () => {
    if (!canvasRef.current) return;

    canvasRef.current?.toBlob((blob) => {
      if (!blob) return;

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "edited-image.png";
      link.click();
      URL.revokeObjectURL(url);
    }, "image/png");
  };

  return (
    <div>
      <button onClick={handleDownload}>이미지 다운로드</button>
    </div>
  )
}

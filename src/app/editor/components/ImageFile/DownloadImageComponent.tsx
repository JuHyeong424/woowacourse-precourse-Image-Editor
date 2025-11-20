interface DownloadImageComponentProps {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
}

export default function DownloadImageComponent({ canvasRef }: DownloadImageComponentProps) {
  const handleDownload  = () => {
    if (!canvasRef.current) return;

    const link = document.createElement("a");
    link.href = canvasRef.current?.toDataURL("image/png");
    link.download = "edited-image.png";
    link.click();
  }

  return (
    <div>
      <button onClick={handleDownload}>이미지 다운로드</button>
    </div>
  )
}

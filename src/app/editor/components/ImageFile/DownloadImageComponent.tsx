import downloadCanvas from "@/app/utils/downloadCanvas";

interface DownloadImageComponentProps {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
}

export default function DownloadImageComponent({ canvasRef }: DownloadImageComponentProps) {
  const handleDownload  = async () => {
    if (canvasRef.current) {
      await downloadCanvas({ canvasRef, fileName: "edited-image.png" });
    }
  };

  return (
    <div>
      <button onClick={handleDownload}>이미지 다운로드</button>
    </div>
  )
}

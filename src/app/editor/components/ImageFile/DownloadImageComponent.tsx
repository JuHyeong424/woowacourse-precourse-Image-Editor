import downloadCanvas from "@/app/utils/downloadCanvas";

interface DownloadImageComponentProps {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
}

export default function DownloadImageComponent({canvasRef}: DownloadImageComponentProps) {
  const handleDownload = async () => {
    if (canvasRef.current) {
      await downloadCanvas({canvasRef, fileName: "edited-image.png"});
    }
  };

  return (
    <button
      onClick={handleDownload}
      className="
        absolute top-4 right-4 cursor-pointer z-20
        bg-white/70 hover:bg-white text-black px-4 py-2 rounded-md
        shadow font-medium transition m-4
      "
    >
      이미지 다운로드
    </button>
  )
}

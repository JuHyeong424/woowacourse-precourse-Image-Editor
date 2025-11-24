import downloadCanvas from "@/app/utils/canvas/downloadCanvas";
import {DEFAULT_DOWNLOAD_FILENAME} from "@/app/config/constants/file";

interface DownloadImageComponentProps {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
}

export default function DownloadImageComponent({ canvasRef }: DownloadImageComponentProps) {
  const handleDownload = async () => {
    if (canvasRef.current) {
      await downloadCanvas({ canvasRef, fileName: DEFAULT_DOWNLOAD_FILENAME });
    }
  };

  return (
    <button
      onClick={handleDownload}
      className="
        small:text-xs medium:text-xs tablet:text-sm laptop:text-sm
        absolute small:top-1 small:right-1 medium:top-1 medium:right-1 tablet:top-1 tablet:right-1 laptop:top-4 laptop:right-4 cursor-pointer z-20
        bg-white/70 hover:bg-white text-black small:px-2 medium:px-2 tablet:px-4 laptop:px-4 small:py-1 medium:py-1 tablet:py-2 laptop:py-2 rounded-md
        shadow font-medium transition m-4
      "
    >
      이미지 다운로드
    </button>
  )
}

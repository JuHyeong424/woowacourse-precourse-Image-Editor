import canvasToBlob from "@/app/utils/canvas/canvasToBlob";
import isIOS from "@/app/utils/browser/isIOS";
import openInIOS from "@/app/utils/browser/openInIOS";
import downloadBlob from "@/app/utils/blob/downloadBlob";

interface DownloadCanvasProps {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  fileName: string;
}

export default async function downloadCanvas({ canvasRef, fileName }: DownloadCanvasProps) {
  const canvas = canvasRef.current;
  if (!canvas) return;

  const blob = await canvasToBlob(canvas);
  if (!blob) return;

  if (isIOS()) {
    openInIOS(blob);
    return;
  }

  downloadBlob(blob, fileName);
}

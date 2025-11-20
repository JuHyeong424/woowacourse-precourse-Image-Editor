import base64ToBlob from "@/app/utils/base64ToBlob";

interface downloadCanvasProps {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  fileName: string;
}

export default async function downloadCanvas({ canvasRef, fileName }: downloadCanvasProps) {
  const isIOS =
    /iPad|iPhone|iPod/.test(navigator.userAgent);

  const blob =
    await new Promise<Blob | null>((resolve) => {
      if (canvasRef.current?.toBlob) {
        canvasRef.current?.toBlob((b) => resolve(b), "image/png");
      } else {
        const dataURL = canvasRef.current?.toDataURL("image/png");
        resolve(base64ToBlob(dataURL));
      }
    });

  if (!blob) return;

  if (isIOS) {
    const url = URL.createObjectURL(blob);

    const win = window.open(url, "_blank");
    if (!win) alert("팝업 차단 해제 후 다시 시도하세요.");

    return;
  }

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  link.click();

  URL.revokeObjectURL(url);
}

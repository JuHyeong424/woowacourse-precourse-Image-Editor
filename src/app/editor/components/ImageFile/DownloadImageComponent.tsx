interface DownloadImageComponentProps {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
}

export default function DownloadImageComponent({ canvasRef }: DownloadImageComponentProps) {
  const handleDownload  = async () => {
    if (!canvasRef.current) return;

    const isIOS =
      /iPad|iPhone|iPod/.test(navigator.userAgent);

    const blob =
      await new Promise<Blob | null>((resolve) => {
        if (canvasRef.current?.toBlob) {
          canvasRef.current?.toBlob((b) => resolve(b), "image/png");
        } else {
          const dataURL = canvasRef.current?.toDataURL("image/png");
          resolve(dataURLToBlob(dataURL));
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
    link.download = "edited-image.png";
    link.click();

    URL.revokeObjectURL(url);
  };

  const dataURLToBlob = (dataURL: string): Blob => {
    const parts = dataURL.split(",");
    const mime = parts[0].match(/:(.*?);/)![1];
    const binary = atob(parts[1]);
    const len = binary.length;
    const arr = new Uint8Array(len);

    for (let i = 0; i < len; i++) {
      arr[i] = binary.charCodeAt(i);
    }

    return new Blob([arr], { type: mime });
  };

  return (
    <div>
      <button onClick={handleDownload}>이미지 다운로드</button>
    </div>
  )
}

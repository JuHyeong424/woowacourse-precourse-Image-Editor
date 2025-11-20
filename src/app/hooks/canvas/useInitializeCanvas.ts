import useGetCanvas from "@/app/hooks/canvas/useGetCanvas";
import React from "react";
import resizeImage from "@/app/utils/resizeImage";

interface useInitializeCanvasProps {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
}

export default function useInitializeCanvas({ canvasRef }: useInitializeCanvasProps) {
  const initializeCanvas = (image: HTMLImageElement): ImageData | null => {
    const info = useGetCanvas({ canvasRef });
    if (!info) return null;

    const { canvas, ctx } = info;
    const { renderWidth, renderHeight } = resizeImage({ width: image.width, height: image.height });

    canvas.width = renderWidth;
    canvas.height = renderHeight;
    ctx.drawImage(image, 0, 0, renderWidth, renderHeight);

    return ctx.getImageData(0, 0, canvas.width, canvas.height);
  }

  return { initializeCanvas };
}

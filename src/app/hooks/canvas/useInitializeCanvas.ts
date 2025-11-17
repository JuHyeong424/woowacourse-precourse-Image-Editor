import useGetCanvas from "@/app/hooks/canvas/useGetCanvas";
import React from "react";

interface useInitializeCanvasProps {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
}

export default function useInitializeCanvas({ canvasRef }: useInitializeCanvasProps) {
  const initializeCanvas = (image: HTMLImageElement): ImageData | null => {
    const info = useGetCanvas({ canvasRef });
    if (!info) return null;

    const { canvas, ctx } = info;

    canvas.width = image.width;
    canvas.height = image.height;
    ctx.drawImage(image, 0, 0);

    return ctx.getImageData(0, 0, canvas.width, canvas.height);
  }

  return { initializeCanvas };
}

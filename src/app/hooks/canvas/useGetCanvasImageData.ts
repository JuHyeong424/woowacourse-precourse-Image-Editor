import React from "react";
import getCanvas from "@/app/utils/canvas/getCanvas";

interface useGetCanvasImageDataProps {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
}

export default function useGetCanvasImageData({ canvasRef }: useGetCanvasImageDataProps) {
  const getCanvasImageData = () => {
    const info = getCanvas(canvasRef);
    if (!info) return null;

    const { canvas, ctx } = info;
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    return { canvas, ctx, imageData };
  };

  return { getCanvasImageData };
}

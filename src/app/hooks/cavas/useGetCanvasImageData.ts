import useGetCanvas from "@/app/hooks/cavas/useGetCanvas";
import React from "react";

interface useGetCanvasImageDataProps {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
}

export default function useGetCanvasImageData({ canvasRef }: useGetCanvasImageDataProps) {
  const getCanvasImageData = () => {
    const info = useGetCanvas({ canvasRef });
    if (!info) return null;

    const { canvas, ctx } = info;
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    return { canvas, ctx, imageData };
  };

  return { getCanvasImageData };
}

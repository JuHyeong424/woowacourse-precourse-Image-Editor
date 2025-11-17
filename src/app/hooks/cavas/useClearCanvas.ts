import useGetCanvas from "@/app/hooks/cavas/useGetCanvas";
import React from "react";

interface useClearCanvasProps {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
}

export default function useClearCanvas({ canvasRef }: useClearCanvasProps) {
  const clearCanvas = () => {
    const info = useGetCanvas({ canvasRef });
    if (!info) return;
    const { canvas, ctx } = info;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  return { clearCanvas };
}

import React from "react";

interface useCanvasUtilsProps {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
}

export default function useCanvasUtils({ canvasRef }: useCanvasUtilsProps) {
  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  return { clearCanvas };
}

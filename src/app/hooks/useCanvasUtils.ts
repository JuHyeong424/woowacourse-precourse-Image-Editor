import React from "react";

interface useCanvasUtilsProps {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
}

export default function useCanvasUtils({ canvasRef }: useCanvasUtilsProps) {
  const getCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    return { canvas, ctx }
  };

  const getCanvasImageData = () => {
    const info = getCanvas();
    if (!info) return null;

    const { canvas, ctx } = info;
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    return { canvas, ctx, imageData };
  };

  const initializeCanvas = (image: HTMLImageElement): ImageData | null => {
    const info = getCanvas();
    if (!info) return;

    const { canvas, ctx } = info;

    canvas.width = image.width;
    canvas.height = image.height;
    ctx.drawImage(image, 0, 0);

    return ctx.getImageData(0, 0, canvas.width, canvas.height);
  }

  const clearCanvas = () => {
    const info = getCanvas();
    if (!info) return;
    const { canvas, ctx } = info;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  return { getCanvasImageData, clearCanvas, initializeCanvas };
}

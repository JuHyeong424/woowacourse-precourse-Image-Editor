import React from "react";
import getCanvas from "@/app/utils/canvas/getCanvas";

export default function clearCanvas(canvasRef: React.RefObject<HTMLCanvasElement | null>) {
  const info = getCanvas(canvasRef);
  if (!info) return;

  const { canvas, ctx } = info;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

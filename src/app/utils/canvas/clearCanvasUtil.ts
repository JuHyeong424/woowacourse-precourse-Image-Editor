import React from "react";
import getCanvasUtil from "@/app/utils/canvas/getCanvasUtil";

export default function clearCanvasUtil(canvasRef: React.RefObject<HTMLCanvasElement | null>) {
  const info = getCanvasUtil(canvasRef);
  if (!info) return;

  const { canvas, ctx } = info;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

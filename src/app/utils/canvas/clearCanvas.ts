import useGetCanvas from "@/app/hooks/canvas/useGetCanvas";
import React from "react";

export default function clearCanvas(canvasRef: React.RefObject<HTMLCanvasElement | null>) {
  const info = useGetCanvas({ canvasRef });
  if (!info) return;

  const { canvas, ctx } = info;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

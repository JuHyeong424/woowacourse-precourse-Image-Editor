import { CANVAS_CONTEXT_2D } from "@/app/constants/canvas";
import React from "react";

export interface CanvasInfo {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
}

export default function getCanvas(canvasRef: React.RefObject<HTMLCanvasElement | null>): CanvasInfo | null {
  const canvas = canvasRef.current;
  if (!canvas) return null;

  const ctx = canvas.getContext(CANVAS_CONTEXT_2D);
  if (!ctx) return null;

  return { canvas, ctx };
}

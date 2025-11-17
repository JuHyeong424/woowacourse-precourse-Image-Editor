import React from "react";

interface useGetCanvasProps {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
}

export default function useGetCanvas({ canvasRef }: useGetCanvasProps) {
  const canvas = canvasRef.current;
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  return { canvas, ctx }
}

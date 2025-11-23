import React, {useCallback} from "react";
import resizeImage from "@/app/utils/resizeImage";
import getCanvasUtil from "@/app/utils/canvas/getCanvasUtil";
import {CANVAS_ORIGIN_X, CANVAS_ORIGIN_Y} from "@/app/config/constants/canvas";

interface useInitializeCanvasProps {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
}

export default function useInitializeCanvas({ canvasRef }: useInitializeCanvasProps) {
  const initializeCanvas = useCallback((image: HTMLImageElement): ImageData | null => {
    const info = getCanvasUtil(canvasRef);
    if (!info) return null;

    const { canvas, ctx } = info;
    const { renderWidth, renderHeight } = resizeImage({ width: image.width, height: image.height });

    canvas.width = renderWidth;
    canvas.height = renderHeight;
    ctx.drawImage(image, CANVAS_ORIGIN_X, CANVAS_ORIGIN_Y, renderWidth, renderHeight);

    return ctx.getImageData(CANVAS_ORIGIN_X, CANVAS_ORIGIN_Y, canvas.width, canvas.height);
  }, [canvasRef]);

  return { initializeCanvas };
}

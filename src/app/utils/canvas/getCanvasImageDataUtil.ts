import getCanvasUtil from "@/app/utils/canvas/getCanvasUtil";
import {CANVAS_ORIGIN_X, CANVAS_ORIGIN_Y} from "@/app/config/constants/canvas";

export interface CanvasImageInfo {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  imageData: ImageData;
}

export default function getCanvasImageDataUtil(canvasRef: React.RefObject<HTMLCanvasElement | null>): CanvasImageInfo | null {
  const info = getCanvasUtil(canvasRef);
  if (!info) return null;

  const { canvas, ctx } = info;
  const imageData = ctx.getImageData(CANVAS_ORIGIN_X, CANVAS_ORIGIN_Y, canvas.width, canvas.height);

  return { canvas, ctx, imageData };
}

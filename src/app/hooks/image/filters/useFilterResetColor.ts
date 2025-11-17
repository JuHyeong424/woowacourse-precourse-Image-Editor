interface CanvasInfo {
  ctx: CanvasRenderingContext2D;
  imageData: ImageData;
}

type GetCanvasImageData = () => CanvasInfo | null;

export default function useFilterResetColor() {
  const resetColor = (
    getCanvasImageData: GetCanvasImageData,
    originalPixels: ImageData["data"] | null,
  ) => {
    const info = getCanvasImageData();
    if (!info) return;

    const { ctx, imageData } = info;

    imageData.data.set(originalPixels!);
    ctx.putImageData(imageData, 0, 0);
  };

  return { resetColor };
}

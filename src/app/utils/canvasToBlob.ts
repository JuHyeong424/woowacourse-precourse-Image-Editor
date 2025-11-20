import base64ToBlob from "@/app/utils/base64ToBlob";

export default function canvasToBlob(canvas: HTMLCanvasElement): Promise<Blob | null> {
  return new Promise<Blob | null>((resolve) => {
    if (canvas.toBlob) {
      canvas.toBlob((b) => resolve(b), "image/png");
    } else {
      const dataURL = canvas.toDataURL("image/png");

      if (!dataURL) {
        resolve(null);
        return;
      }

      resolve(base64ToBlob(dataURL));
    }
  });
}

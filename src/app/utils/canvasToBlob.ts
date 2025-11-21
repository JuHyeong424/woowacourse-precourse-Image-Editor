import base64ToBlob from "@/app/utils/base64ToBlob";
import {IMAGE_MIME_PNG} from "@/app/constants/image";

export default function canvasToBlob(canvas: HTMLCanvasElement): Promise<Blob | null> {
  return new Promise<Blob | null>((resolve) => {
    if (canvas.toBlob) {
      canvas.toBlob((b) => resolve(b), IMAGE_MIME_PNG);
    } else {
      const dataURL = canvas.toDataURL(IMAGE_MIME_PNG);

      if (!dataURL) {
        resolve(null);
        return;
      }

      resolve(base64ToBlob(dataURL));
    }
  });
}

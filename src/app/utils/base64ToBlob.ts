import {COMMA} from "@/app/config/constants/regex";

export default function base64ToBlob(dataURL: string): Blob {
  const parts = dataURL.split(COMMA);
  const mime = parts[0].match(/:(.*?);/)![1];
  const binary = atob(parts[1]);
  const len = binary.length;
  const arr = new Uint8Array(len);

  for (let i = 0; i < len; i++) {
    arr[i] = binary.charCodeAt(i);
  }

  return new Blob([arr], { type: mime });
}

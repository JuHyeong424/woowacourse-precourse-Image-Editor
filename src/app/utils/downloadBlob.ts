import {A_ELEMENT} from "@/app/config/constants/element";

export default function downloadBlob(blob: Blob, fileName: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement(A_ELEMENT);
  link.href = url;
  link.download = fileName;
  link.click();

  URL.revokeObjectURL(url);
}

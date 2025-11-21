import {DEFAULT_MAX_IMAGE_SIZE} from "@/app/constants/image";

interface resizeImageProps {
  width: number;
  height: number;
}

export default function resizeImage({ width, height }: resizeImageProps) {
  if (width > DEFAULT_MAX_IMAGE_SIZE || height > DEFAULT_MAX_IMAGE_SIZE) {
    const scale = DEFAULT_MAX_IMAGE_SIZE / Math.max(width, height);
    width = width * scale;
    height = height * scale;
  }

  return { renderWidth: width, renderHeight: height };
}

interface resizeImageProps {
  width: number;
  height: number;
}

export default function resizeImage({ width, height }: resizeImageProps) {
  const MAX_SIZE = 1080;

  if (width > MAX_SIZE || height > MAX_SIZE) {
    const scale = MAX_SIZE / Math.max(width, height);
    width = width * scale;
    height = height * scale;
  }

  return { renderWidth: width, renderHeight: height };
}

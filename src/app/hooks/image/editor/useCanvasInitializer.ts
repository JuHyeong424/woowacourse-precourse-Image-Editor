import React, {useEffect} from "react";
import useInitializeCanvas from "@/app/hooks/canvas/useInitializeCanvas";

interface useCanvasInitializerProps {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  image: HTMLImageElement | null;
  setOriginalPixels: React.Dispatch<React.SetStateAction<ImageData["data"] | null>>;
}

export default function useCanvasInitializer({ canvasRef, image, setOriginalPixels }: useCanvasInitializerProps) {
  const { initializeCanvas } = useInitializeCanvas({ canvasRef });

  useEffect(() => {
    if (!image) return;

    const info = initializeCanvas(image);
    if (!info) return;

    setOriginalPixels(new Uint8ClampedArray(info.data));
  }, [image, initializeCanvas]);
}

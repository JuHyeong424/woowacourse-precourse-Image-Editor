import {useRef, useState} from "react";
import useWasmLoader from "@/app/hooks/image/editor/useWasmLoader";
import useCanvasInitializer from "@/app/hooks/image/editor/useCanvasInitializer";

export default function useImageEditor() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { wasm } = useWasmLoader();
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [originalPixels, setOriginalPixels] = useState<ImageData["data"]  | null>(null);

  useCanvasInitializer({ canvasRef, image, setOriginalPixels });

  return {
    wasm,
    image,
    setImage,
    originalPixels,
    setOriginalPixels,
    canvasRef
  };
}

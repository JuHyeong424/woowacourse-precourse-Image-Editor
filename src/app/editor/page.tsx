"use client"

import UploadedImageComponent from "@/app/editor/components/CanvasPanel/UploadedImageComponent";
import useImageEditor from "@/app/hooks/image/editor/useImageEditor";
import useGetCanvasImageData from "@/app/hooks/canvas/useGetCanvasImageData";
import useImageFilterController from "@/app/hooks/image/filters/management/useImageFilterController";
import React from "react";
import FilterPanel from "@/app/editor/components/FilterPanel/FilterPanel";

export default function EditorPage() {
  const {
    wasm,
    image,
    setImage,
    originalPixels,
    canvasRef
  } = useImageEditor();

  const { getCanvasImageData } = useGetCanvasImageData({ canvasRef });

  const { filters, setFilter, disabled} = useImageFilterController({
    wasm,
    image,
    originalPixels,
    getCanvasImageData
  });

  return (
    <div className="flex flex-row bg-black text-white h-screen overflow-hidden gap-6 p-12">
      <FilterPanel
        filters={filters}
        setFilter={setFilter}
        disabled={disabled}
      />
      <UploadedImageComponent canvasRef={canvasRef} image={image} setImage={setImage} />
    </div>
  );
}

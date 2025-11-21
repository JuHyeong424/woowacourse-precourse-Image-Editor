"use client"

import CanvasPanel from "@/app/editor/components/CanvasPanel/CanvasPanel";
import useImageEditor from "@/app/hooks/image/editor/useImageEditor";
import useImageFilterController from "@/app/hooks/image/filters/manager/useImageFilterController";
import React from "react";
import FilterPanel from "@/app/editor/components/FilterPanel/FilterPanel";
import getCanvasImageDataUtil from "@/app/utils/canvas/getCanvasImageDataUtil";
import Loading from "@/app/editor/components/common/Loading";
import ErrorMessage from "@/app/editor/components/common/ErrorMessage";

export default function EditorPage() {
  const {
    wasm,
    loading,
    error,
    image,
    setImage,
    originalPixels,
    canvasRef
  } = useImageEditor();

  const getCanvasImageData = () => getCanvasImageDataUtil(canvasRef);

  const { filters, setFilter, disabled} = useImageFilterController({
    wasm,
    image,
    originalPixels,
    getCanvasImageData
  });

  if (error) {
    return (
      <div className="w-full h-screen bg-black text-white p-12">
        <ErrorMessage message={error} />
      </div>
    );
  }

  if (loading || !wasm) {
    return (
      <div className="w-full h-screen bg-black text-white p-12">
        <Loading />
      </div>
    );
  }

  return (
    <div className="flex flex-row bg-black text-white h-screen overflow-hidden gap-6 p-12">
      <FilterPanel
        filters={filters}
        setFilter={setFilter}
        disabled={disabled}
      />
      <CanvasPanel
        canvasRef={canvasRef}
        image={image}
        setImage={setImage}
      />
    </div>
  );
}

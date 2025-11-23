import React from "react";

interface AIFilterProps  {
  disabled: boolean;
  aiLoading: boolean;
  aiError: string | null;
  runAutotoEnhance: () => void;
}

export default function AIFilter({ disabled, aiLoading, aiError, runAutotoEnhance }: AIFilterProps) {
  return (
    <>
      <button
        onClick={runAutotoEnhance}
        disabled={aiLoading || disabled}
        className="border rounded-lg py-2 px-3 mb-3 bg-neutral-800 hover:bg-neutral-700 disabled:opacity-40"
      >
        {aiLoading ? "AI 자동 보정 중..." : "AI 자동 보정"}
      </button>

      {aiError && (
        <p className="text-red-500 text-sm mb-3">{aiError}</p>
      )}
    </>
  )
}

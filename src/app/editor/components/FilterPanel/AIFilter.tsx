import React from "react";
import {AiErrorComponent} from "@/app/editor/components/FilterPanel/AiErrorComponent";

interface AIFilterProps  {
  disabled: boolean;
  aiLoading: boolean;
  aiError: string | null;
  runAutoEnhance: () => void;
}

const LABELS = {
  loading: "AI 자동 보정 중...",
  default: "AI 자동 보정",
  errorPrefix: "",
} as const;

export default function AIFilter({ disabled, aiLoading, aiError, runAutoEnhance }: AIFilterProps) {
  return (
    <section aria-label="AI 자동 보정" className="flex flex-col">
      <button
        type="button"
        onClick={runAutoEnhance}
        disabled={aiLoading || disabled}
        className="border rounded-lg py-2 px-3 mb-3 bg-neutral-800 hover:bg-neutral-700 disabled:opacity-40"
      >
        {aiLoading ? LABELS.loading : LABELS.default}
      </button>

      {aiError && <AiErrorComponent message={aiError} />}
    </section>
  )
}

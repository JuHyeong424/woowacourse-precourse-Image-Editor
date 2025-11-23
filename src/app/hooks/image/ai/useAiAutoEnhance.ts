"use client";

import { FilterState } from "@/app/types/filterStateTypes";
import { useCallback, useState } from "react";

interface UseAiAutoEnhanceProps {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  applyFiltersFromAi: (params: FilterState) => void;
}

export function useAiAutoEnhance({ canvasRef, applyFiltersFromAi }: UseAiAutoEnhanceProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const runAutoEnhance = useCallback(async () => {
    const canvas = canvasRef.current;
    if (!canvas) {
      setError("캔버스를 찾을 수 없습니다.");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const imageDataUrl = canvas.toDataURL("image/png");

      const res = await fetch("/api/aiAutoEnhance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageDataUrl }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "AI 자동 보정에 실패했습니다.");
      }

      const params = (await res.json()) as FilterState;
      applyFiltersFromAi(params);
    } catch (e: any) {
      console.error(e);
      setError(e.message ?? "AI 자동 보정 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  }, [canvasRef, applyFiltersFromAi]);

  return {
    loading,
    error,
    runAutoEnhance,
  };
}

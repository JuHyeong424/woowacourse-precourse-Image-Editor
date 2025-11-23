"use client";

import { FilterState } from "@/app/types/filterStateTypes";
import { useCallback, useState } from "react";

interface UseAiAutoEnhanceProps {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  applyFiltersFromAi: (params: FilterState) => void;
}

const AI_AUTO_ENHANCE_ENDPOINT = "/api/aiAutoEnhance" as const;

const ERROR_MESSAGES = {
  NO_CANVAS: "캔버스를 찾을 수 없습니다.",
  REQUEST_FAILED: "AI 자동 보정에 실패했습니다.",
  RUNTIME: "AI 자동 보정 중 오류가 발생했습니다.",
} as const;

type AiErrorResponse = {
  error?: string;
};

export function useAiAutoEnhance({ canvasRef, applyFiltersFromAi }: UseAiAutoEnhanceProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const runAutoEnhance = useCallback(async () => {
    const getCanvas = (): HTMLCanvasElement | null => canvasRef.current;

    const buildPayload = (canvas: HTMLCanvasElement) => ({
      imageDataUrl: canvas.toDataURL("image/png"),
    });

    const requestAiFilters = async (payload: ReturnType<typeof buildPayload>): Promise<FilterState> => {
      const res = await fetch(AI_AUTO_ENHANCE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = (await res.json().catch(() => ({}))) as
        | FilterState
        | AiErrorResponse;

      if (!res.ok) {
        const message =
          (data as AiErrorResponse).error ?? ERROR_MESSAGES.REQUEST_FAILED;
        throw new Error(message);
      }

      return data as FilterState;
    };

    try {
      const canvas = getCanvas();

      if (!canvas) {
        setError(ERROR_MESSAGES.NO_CANVAS);
        return;
      }

      setLoading(true);
      setError(null);

      const payload = buildPayload(canvas);
      const params = await requestAiFilters(payload);

      applyFiltersFromAi(params);
    } catch (e: any) {
      console.error(e);

      const message = e instanceof Error ? e.message : ERROR_MESSAGES.RUNTIME;

      setError(message);
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

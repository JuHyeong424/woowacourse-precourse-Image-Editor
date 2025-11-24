export const AI_MODEL = "gpt-4o-mini";
export const AI_MAX_TOKENS = 2000;

export const AI_ERROR = {
  MISSING_IMAGE: "imageDataUrl is required",
  EMPTY_AI_CONTENT: "Failed to get response content from AI",
  INVALID_JSON: "Invalid JSON format returned by AI",
  AI_FAILED: "AI auto-enhance failed",
} as const;

export const HEADERS_JSON = {
  "Content-Type": "application/json",
} as const;

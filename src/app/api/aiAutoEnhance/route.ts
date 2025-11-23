import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { FilterState } from "@/app/types/filterStateTypes";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

const HEADERS_JSON = {
  "Content-Type": "application/json",
} as const;

const ERROR = {
  MISSING_IMAGE: "imageDataUrl is required",
  EMPTY_AI_CONTENT: "Failed to get response content from AI",
  INVALID_JSON: "Invalid JSON format returned by AI",
  AI_FAILED: "AI auto-enhance failed",
} as const;

const AI_MODEL = "gpt-4o-mini";
const AI_MAX_TOKENS = 2000;

const SYSTEM_PROMPT = `
너는 사진 편집용 어시스턴트다.
brightness, contrast, saturation, exposure, temperature, tint, hue,
highlights, shadows, vignette, clarity, sharpen, blur, invert, isGray만 포함한 JSON만 반환해라.
추가 텍스트 금지.
`.trim();

function safeParse<T>(content: string): T | null {
  try {
    return JSON.parse(content) as T;
  } catch {
    return null;
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);
    const imageDataUrl = body?.imageDataUrl;

    if (typeof imageDataUrl !== "string" || imageDataUrl.length === 0) {
      return new Response(
        JSON.stringify({ error: ERROR.MISSING_IMAGE }),
        { status: 400, headers: HEADERS_JSON }
      );
    }

    const aiResponse = await openai.chat.completions.create({
      model: AI_MODEL,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        {
          role: "user",
          content: [
            { type: "text", text: "다음 이미지를 자연스럽게 보정할 필터 값을 추천해줘." },
            { type: "image_url", image_url: { url: imageDataUrl } },
          ],
        },
      ],
      max_tokens: AI_MAX_TOKENS,
    });

    const messageContent = aiResponse.choices[0]?.message?.content;

    if (!messageContent) {
      return new Response(
        JSON.stringify({ error: ERROR.EMPTY_AI_CONTENT }),
        { status: 500, headers: HEADERS_JSON }
      );
    }

    const parsed = safeParse<FilterState>(messageContent);

    if (!parsed) {
      return new Response(
        JSON.stringify({ error: ERROR.INVALID_JSON }),
        { status: 500, headers: HEADERS_JSON }
      );
    }

    return NextResponse.json(parsed);

  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";

    return new Response(
      JSON.stringify({ error: ERROR.AI_FAILED, detail: message }),
      { status: 500, headers: HEADERS_JSON }
    );
  }
}

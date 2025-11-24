import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { FilterState } from "@/app/types/filterStateTypes";
import {AI_ERROR, AI_MAX_TOKENS, AI_MODEL, HEADERS_JSON} from "@/app/config/ai/aiConstants";
import {SYSTEM_PROMPT} from "@/app/config/ai/aiPrompt";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

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
        JSON.stringify({ error: AI_ERROR.MISSING_IMAGE }),
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
        JSON.stringify({ error: AI_ERROR.EMPTY_AI_CONTENT }),
        { status: 500, headers: HEADERS_JSON }
      );
    }

    const parsed = safeParse<FilterState>(messageContent);

    if (!parsed) {
      return new Response(
        JSON.stringify({ error: AI_ERROR.INVALID_JSON }),
        { status: 500, headers: HEADERS_JSON }
      );
    }

    return NextResponse.json(parsed);

  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";

    return new Response(
      JSON.stringify({ error: AI_ERROR.AI_FAILED, detail: message }),
      { status: 500, headers: HEADERS_JSON }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import {FilterState} from "@/app/types/filterStateTypes";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const SYSTEM_PROMPT = `
너는 사진 편집용 어시스턴트다.
사용자가 보내는 사진을 보고 아래의 필터 파라미터를 추천해라.

반드시 다음 키만 포함한 JSON 객체를 반환해라.

brightness, contrast, saturation, exposure,
temperature, tint, hue,
highlights, shadows, vignette, clarity,
sharpen, blur, invert, isGray

각 범위:
- brightness, contrast, saturation, exposure, temperature, tint, highlights, shadows: -100 ~ 100
- hue: -180 ~ 180
- vignette, clarity: 0 ~ 100
- sharpen, blur, invert, isGray: boolean

출력은 반드시 JSON 하나만, 추가 텍스트 없이.
`;

export async function POST(req: NextRequest) {
  try {
    const { imageDataUrl } = await req.json();

    if (!imageDataUrl || typeof imageDataUrl !== "string") {
      return NextResponse.json(
        { error: "imageDataUrl is required" },
        { status: 400 }
      );
    }

    const response = await openai.responses.create({
      model: "gpt-4.1-mini",
      input: [
        {
          role: "system",
          content: [{ type: "input_text", text: SYSTEM_PROMPT }],
        },
        {
          role: "user",
          content: [
            {
              type: "input_text",
              text: "다음 이미지를 자연스럽고 보기 좋게 보정할 필터 값을 추천해줘.",
            },
            {
              type: "input_image",
              image_url: imageDataUrl,
            },
          ],
        },
      ],
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "filter_params",
          schema: {
            type: "object",
            properties: {
              brightness: { type: "number", minimum: -100, maximum: 100 },
              contrast: { type: "number", minimum: -100, maximum: 100 },
              saturation: { type: "number", minimum: -100, maximum: 100 },
              exposure: { type: "number", minimum: -100, maximum: 100 },
              temperature: { type: "number", minimum: -100, maximum: 100 },
              tint: { type: "number", minimum: -100, maximum: 100 },
              hue: { type: "number", minimum: -180, maximum: 180 },
              highlights: { type: "number", minimum: -100, maximum: 100 },
              shadows: { type: "number", minimum: -100, maximum: 100 },
              vignette: { type: "number", minimum: 0, maximum: 100 },
              clarity: { type: "number", minimum: 0, maximum: 100 },
              sharpen: { type: "boolean" },
              blur: { type: "boolean" },
              invert: { type: "boolean" },
              isGray: { type: "boolean" },
            },
            required: [
              "brightness",
              "contrast",
              "saturation",
              "exposure",
              "temperature",
              "tint",
              "hue",
              "highlights",
              "shadows",
              "vignette",
              "clarity",
              "sharpen",
              "blur",
              "invert",
              "isGray",
            ],
            additionalProperties: false,
          },
          strict: true,
        },
      },
    });

    const parsed =
      (response.output?.[0]?.content?.[0]?.parsed as FilterState | undefined);

    if (!parsed) {
      return NextResponse.json(
        { error: "Failed to parse filter params from AI" },
        { status: 500 }
      );
    }

    return NextResponse.json(parsed);
  } catch (err) {
    console.error("AI auto-enhance error:", err);
    return NextResponse.json(
      { error: "AI auto-enhance failed" },
      { status: 500 }
    );
  }
}

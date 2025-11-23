import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { FilterState } from "@/app/types/filterStateTypes";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: NextRequest) {
  try {
    const { imageDataUrl } = await req.json();

    if (!imageDataUrl) {
      return new Response(
        JSON.stringify({ error: "imageDataUrl is required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }


    const response = await openai.chat.completions.create({
      model: "gpt-4-vision-preview",
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: `너는 사진 편집용 어시스턴트다. 사용자가 보내는 사진을 보고 아래의 필터 파라미터를 추천해라. 반드시 다음 키만 포함한 JSON 객체를 반환해라. brightness, contrast, saturation, exposure, temperature, tint, hue, highlights, shadows, vignette, clarity, sharpen, blur, invert, isGray. 출력은 반드시 JSON 하나만, 추가 텍스트 없이.`,
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "다음 이미지를 자연스럽게 보정할 필터 값을 추천해줘.",
            },
            {
              type: "image_url",
              image_url: {
                url: imageDataUrl,
              },
            },
          ],
        },
      ],
      max_tokens: 2000,
    });

    const messageContent = response.choices[0].message.content;

    if (!messageContent) {
      return new Response(
        JSON.stringify({ error: "Failed to get response content from AI" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const parsed = JSON.parse(messageContent) as FilterState;

    return NextResponse.json(parsed);
  } catch (err) {
    console.error("AI auto-enhance error:", err);

    return new Response(
      JSON.stringify({ error: "AI auto-enhance failed" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

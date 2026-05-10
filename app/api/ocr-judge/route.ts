import { NextRequest, NextResponse } from "next/server";
import { getGeminiModel } from "@/lib/gemini";

function extractMimeType(dataUrl: string): string {
  const match = dataUrl.match(/^data:(image\/\w+);base64,/);
  return match ? match[1] : "image/jpeg";
}

export async function POST(req: NextRequest) {
  try {
    const { imageBase64 } = await req.json();

    if (!imageBase64) {
      return NextResponse.json({ error: "画像データがありません" }, { status: 400 });
    }

    const mimeType = extractMimeType(imageBase64);
    const base64Data = imageBase64.replace(/^data:image\/\w+;base64,/, "");

    const model = getGeminiModel();
    const prompt = `あなたは健康コーチングプログラムの審査AIです。
添付された書類（申し込み書）の画像を読み取り、以下のJSON形式で返してください。

1. OCR: 氏名・年齢・志望動機・目標を抽出
2. 審査: 規律性・継続意欲・本気度を評価し0-100でスコアリング
3. コメント: 200字程度の審査コメント

返却形式:
{
  "ocr": { "name": "...", "age": ..., "motivation": "...", "goals": "...", "raw_text": "..." },
  "judgment": { "score": ..., "decision": "pass|review|reject", "comment": "..." }
}

decisionの判定基準:
- 80以上: pass
- 50-79: review
- 50未満: reject

JSON以外の文字は一切返さないでください。`;

    const imagePart = {
      inlineData: {
        data: base64Data,
        mimeType: mimeType as "image/jpeg" | "image/png" | "image/webp",
      },
    };

    const result = await model.generateContent([prompt, imagePart]);
    const text = result.response.text().trim();
    const cleaned = text.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
    const parsed = JSON.parse(cleaned);

    return NextResponse.json(parsed);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("OCR judge error:", message);
    return NextResponse.json({ error: `AI処理エラー: ${message}` }, { status: 500 });
  }
}

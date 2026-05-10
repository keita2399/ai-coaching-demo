import { NextRequest, NextResponse } from "next/server";
import { getGeminiModel } from "@/lib/gemini";

export async function POST(req: NextRequest) {
  try {
    const { history, user } = await req.json();

    const model = getGeminiModel();
    const historyText = JSON.stringify(history);

    const prompt = `あなたは健康コーチングAIです。ユーザーの過去14日間の体重推移を分析し、
停滞しているかどうかを判定して、付き添いメッセージを生成してください。

ユーザー情報:
- 氏名: ${user.name}
- 開始時体重: ${user.startWeight}kg
- 目標体重: ${user.goalWeight}kg

体重履歴:
${historyText}

返却形式（JSONのみ）:
{
  "status": "good" | "stagnation" | "warning",
  "ai_message": "LINEとして送る200字程度の届く・温かいメッセージ（絵文字を適度に使う）",
  "suggestions": ["具体的提案1", "具体的提案2", "具体的提案3"]
}

判定基準:
- good: 直近7日で目標方向に減少傾向
- stagnation: 直近7日が±0.3kg以内で横ばい
- warning: リバウンド傾向（増加）

JSON以外は返さないでください。`;

    const result = await model.generateContent(prompt);
    const text = result.response.text().trim();
    const cleaned = text.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
    const parsed = JSON.parse(cleaned);

    return NextResponse.json(parsed);
  } catch (error) {
    console.error("Stagnation API error:", error);
    return NextResponse.json({ error: "処理中にエラーが発生しました" }, { status: 500 });
  }
}

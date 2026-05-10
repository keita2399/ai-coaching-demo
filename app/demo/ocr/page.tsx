"use client";
import { useState, useRef } from "react";
import DemoNav from "@/components/DemoNav";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type JudgmentResult = {
  ocr: {
    name: string;
    age: number | null;
    motivation: string;
    goals: string;
    raw_text: string;
  };
  judgment: {
    score: number;
    decision: "pass" | "review" | "reject";
    comment: string;
  };
};

const decisionConfig = {
  pass: { label: "合格", color: "bg-emerald-100 text-emerald-700", border: "border-emerald-200" },
  review: { label: "要検討", color: "bg-yellow-100 text-yellow-700", border: "border-yellow-200" },
  reject: { label: "不合格", color: "bg-red-100 text-red-700", border: "border-red-200" },
};

export default function OcrPage() {
  const [preview, setPreview] = useState<string | null>(null);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [result, setResult] = useState<JudgmentResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      setPreview(dataUrl);
      setImageBase64(dataUrl);
      setResult(null);
      setError(null);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) handleFile(file);
  };

  const loadSample = () => {
    setPreview("/sample-application.png");
    fetch("/sample-application.png")
      .then((r) => r.blob())
      .then((blob) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          setImageBase64(e.target?.result as string);
          setResult(null);
          setError(null);
        };
        reader.readAsDataURL(blob);
      });
  };

  const runJudge = async () => {
    if (!imageBase64) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/ocr-judge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageBase64 }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "API error");
      setResult(data);
    } catch (e) {
      setError(`エラー: ${e instanceof Error ? e.message : "不明なエラー"}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <DemoNav />
      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">📋 申し込み書OCR + AI審査</h1>
          <p className="text-slate-500 text-sm">
            Gemini Visionが書類画像を読み取り、AIが審査スコアと合否コメントを生成します。
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* 左ペイン: 画像アップロード */}
          <div className="space-y-4">
            <Card className="bg-white border-0 shadow-md rounded-2xl">
              <CardContent className="p-6">
                <h2 className="font-semibold text-slate-700 mb-4">申し込み書を選択</h2>

                {/* ドロップゾーン */}
                <div
                  className="border-2 border-dashed border-slate-200 rounded-xl p-8 text-center cursor-pointer hover:border-emerald-400 hover:bg-emerald-50/30 transition-colors"
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleDrop}
                  onClick={() => fileRef.current?.click()}
                >
                  {preview ? (
                    <img src={preview} alt="preview" className="max-h-64 mx-auto rounded-lg object-contain" />
                  ) : (
                    <div className="text-slate-400">
                      <div className="text-4xl mb-3">📁</div>
                      <p className="text-sm">ここにドラッグ or クリックしてアップロード</p>
                      <p className="text-xs mt-1">JPG, PNG, PDF形式</p>
                    </div>
                  )}
                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
                  />
                </div>

                <div className="flex gap-2 mt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={loadSample}
                    className="flex-1 rounded-xl border-slate-200"
                  >
                    サンプルを使う
                  </Button>
                  <Button
                    onClick={runJudge}
                    disabled={!imageBase64 || loading}
                    size="sm"
                    className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl"
                  >
                    {loading ? "解析中..." : "AI審査を実行"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 右ペイン: 結果 */}
          <div className="space-y-4">
            {error && (
              <Card className="bg-red-50 border border-red-200 rounded-2xl">
                <CardContent className="p-4 text-red-600 text-sm">{error}</CardContent>
              </Card>
            )}

            {loading && (
              <Card className="bg-white border-0 shadow-md rounded-2xl">
                <CardContent className="p-8 text-center">
                  <div className="text-4xl mb-3 animate-pulse">🤖</div>
                  <p className="text-slate-500 text-sm">Geminiが書類を解析中...</p>
                </CardContent>
              </Card>
            )}

            {result && !loading && (
              <>
                {/* OCR結果 */}
                <Card className="bg-white border-0 shadow-md rounded-2xl">
                  <CardContent className="p-5">
                    <h3 className="font-semibold text-slate-700 text-sm mb-3">📝 OCR抽出結果</h3>
                    <dl className="space-y-2 text-sm">
                      {[
                        { label: "氏名", value: result.ocr.name },
                        { label: "年齢", value: result.ocr.age ? `${result.ocr.age}歳` : "—" },
                        { label: "志望動機", value: result.ocr.motivation },
                        { label: "目標", value: result.ocr.goals },
                      ].map((item) => (
                        <div key={item.label} className="flex gap-2">
                          <dt className="text-slate-400 w-20 shrink-0">{item.label}</dt>
                          <dd className="text-slate-800 flex-1">{item.value || "—"}</dd>
                        </div>
                      ))}
                    </dl>
                  </CardContent>
                </Card>

                {/* 審査結果 */}
                <Card className={`border-0 shadow-md rounded-2xl border ${decisionConfig[result.judgment.decision].border}`}>
                  <CardContent className="p-5">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-slate-700 text-sm">🎯 AI審査結果</h3>
                      <Badge className={`${decisionConfig[result.judgment.decision].color} border-0 text-sm px-3 py-1`}>
                        {decisionConfig[result.judgment.decision].label}
                      </Badge>
                    </div>

                    {/* スコアバー */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-slate-500">審査スコア</span>
                        <span className="font-bold text-slate-800 text-lg">{result.judgment.score}</span>
                      </div>
                      <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-700 ${
                            result.judgment.score >= 80
                              ? "bg-emerald-500"
                              : result.judgment.score >= 50
                              ? "bg-yellow-400"
                              : "bg-red-400"
                          }`}
                          style={{ width: `${result.judgment.score}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-xs text-slate-400 mt-1">
                        <span>0</span>
                        <span>不合格 ← 50 → 要検討 ← 80 → 合格</span>
                        <span>100</span>
                      </div>
                    </div>

                    <p className="text-slate-700 text-sm leading-relaxed bg-slate-50 rounded-xl p-3">
                      {result.judgment.comment}
                    </p>
                  </CardContent>
                </Card>
              </>
            )}

            {!result && !loading && !error && (
              <Card className="bg-white border-0 shadow-md rounded-2xl">
                <CardContent className="p-8 text-center text-slate-400">
                  <div className="text-4xl mb-3">←</div>
                  <p className="text-sm">画像をアップロードしてAI審査を実行してください</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

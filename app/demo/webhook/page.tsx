"use client";
import { useState } from "react";
import DemoNav from "@/components/DemoNav";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

type WeightEntry = { date: string; weight: number };
type StagnationResult = {
  status: "good" | "stagnation" | "warning";
  ai_message: string;
  suggestions: string[];
};

const generateInitial14Days = (): WeightEntry[] => {
  const entries: WeightEntry[] = [];
  for (let i = 13; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const label = `${d.getMonth() + 1}/${d.getDate()}`;
    let weight: number;
    if (i >= 9) {
      weight = 80 - (13 - i) * 0.3;
    } else {
      weight = 76.1 + (Math.random() - 0.5) * 0.2;
    }
    entries.push({ date: label, weight: parseFloat(weight.toFixed(1)) });
  }
  return entries;
};

const statusConfig = {
  good: { label: "順調", color: "bg-emerald-100 text-emerald-700", emoji: "✅" },
  stagnation: { label: "停滞中", color: "bg-yellow-100 text-yellow-700", emoji: "⚠️" },
  warning: { label: "要注意", color: "bg-red-100 text-red-700", emoji: "🔴" },
};

const user = { name: "山田 太郎", goalWeight: 70, startWeight: 85 };

export default function WebhookPage() {
  const [history, setHistory] = useState<WeightEntry[]>(generateInitial14Days);
  const [result, setResult] = useState<StagnationResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const simulateWebhook = () => {
    const last = history[history.length - 1];
    const isStagnant = history.slice(-5).every(
      (e) => Math.abs(e.weight - history[history.length - 5].weight) < 0.4
    );
    const delta = isStagnant
      ? (Math.random() - 0.5) * 0.15
      : -0.1 - Math.random() * 0.2;
    const newWeight = parseFloat((last.weight + delta).toFixed(1));
    const d = new Date();
    const label = `${d.getMonth() + 1}/${d.getDate()}`;

    setHistory((prev) => {
      const updated = [...prev.slice(1), { date: label, weight: newWeight }];
      return updated;
    });
    setResult(null);
  };

  const runAnalysis = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/stagnation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ history, user }),
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

  const minY = Math.min(...history.map((h) => h.weight)) - 0.5;
  const maxY = Math.max(...history.map((h) => h.weight)) + 0.5;

  return (
    <div className="min-h-screen bg-slate-50">
      <DemoNav />
      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">📊 体重Webhook + AI停滞検知</h1>
          <p className="text-slate-500 text-sm">
            Withings / Fitbit からのWebhookを模倣。AIが停滞・リバウンドを検知してメッセージを生成します。
          </p>
        </div>

        {/* グラフ */}
        <Card className="bg-white border-0 shadow-md rounded-2xl mb-6">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="font-semibold text-slate-700 text-sm">過去14日間の体重推移</h2>
                <p className="text-xs text-slate-400">{user.name} / 目標: {user.goalWeight}kg</p>
              </div>
              <div className="text-right">
                <span className="text-2xl font-bold text-slate-900">
                  {history[history.length - 1].weight}
                </span>
                <span className="text-slate-500 text-sm ml-1">kg</span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={history} margin={{ top: 5, right: 10, bottom: 5, left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="date" tick={{ fontSize: 11, fill: "#94a3b8" }} />
                <YAxis domain={[minY, maxY]} tick={{ fontSize: 11, fill: "#94a3b8" }} />
                <Tooltip
                  contentStyle={{ borderRadius: "0.75rem", border: "none", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)" }}
                  formatter={(v) => [`${v}kg`, "体重"]}
                />
                <ReferenceLine y={user.goalWeight} stroke="#10b981" strokeDasharray="4 4" label={{ value: "目標", fill: "#10b981", fontSize: 11 }} />
                <Line
                  type="monotone"
                  dataKey="weight"
                  stroke="#10b981"
                  strokeWidth={2.5}
                  dot={{ fill: "#10b981", r: 3 }}
                  activeDot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* ボタン */}
        <div className="flex gap-3 mb-6">
          <Button
            onClick={simulateWebhook}
            variant="outline"
            className="flex-1 rounded-xl border-slate-200 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-300"
          >
            ⚙️ Webhookを受信（体重追加）
          </Button>
          <Button
            onClick={runAnalysis}
            disabled={loading}
            className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl"
          >
            {loading ? "解析中..." : "🤖 AI停滞判定を実行"}
          </Button>
        </div>

        {/* 結果 */}
        {error && (
          <Card className="bg-red-50 border border-red-200 rounded-2xl mb-4">
            <CardContent className="p-4 text-red-600 text-sm">{error}</CardContent>
          </Card>
        )}

        {loading && (
          <Card className="bg-white border-0 shadow-md rounded-2xl">
            <CardContent className="p-8 text-center">
              <div className="text-4xl mb-3 animate-pulse">🤖</div>
              <p className="text-slate-500 text-sm">AIが体重データを分析中...</p>
            </CardContent>
          </Card>
        )}

        {result && !loading && (
          <Card className="bg-white border-0 shadow-xl rounded-2xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-semibold text-slate-700">AI判定結果</h3>
                <Badge className={`${statusConfig[result.status].color} border-0 px-3 py-1`}>
                  {statusConfig[result.status].emoji} {statusConfig[result.status].label}
                </Badge>
              </div>

              {/* LINE風メッセージ */}
              <div className="mb-5">
                <p className="text-xs text-slate-400 mb-3">💬 LINEメッセージイメージ</p>
                <div className="flex gap-3">
                  <div className="shrink-0 w-9 h-9 rounded-full bg-emerald-500 flex items-center justify-center text-white text-sm font-bold">
                    AI
                  </div>
                  <div className="bg-white border border-slate-100 rounded-2xl rounded-tl-none px-4 py-3 shadow-sm max-w-sm">
                    <p className="text-sm text-slate-800 leading-relaxed">{result.ai_message}</p>
                  </div>
                </div>
              </div>

              {/* 提案アクション */}
              <div>
                <p className="text-xs text-slate-400 mb-2">💡 AIの提案アクション</p>
                <div className="flex flex-wrap gap-2">
                  {result.suggestions.map((s, i) => (
                    <span
                      key={i}
                      className="text-xs bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-full border border-emerald-100"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {!result && !loading && !error && (
          <Card className="bg-white border-0 shadow-md rounded-2xl">
            <CardContent className="p-8 text-center text-slate-400">
              <p className="text-sm">「AI停滞判定を実行」ボタンで分析を開始できます</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

"use client";
import DemoNav from "@/components/DemoNav";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockUser, mockWeightHistory90, mockActivityLog } from "@/lib/mockData";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const THIN_HISTORY = mockWeightHistory90.filter((_, i) => i % 5 === 0);

const generateCalendar = () => {
  const days = [];
  for (let i = 89; i >= 0; i--) {
    const rand = Math.random();
    const level = rand > 0.85 ? 0 : rand > 0.5 ? 1 : rand > 0.2 ? 2 : 3;
    days.push(level);
  }
  return days;
};
const calendar = generateCalendar();

const cellColors = ["bg-slate-100", "bg-emerald-200", "bg-emerald-400", "bg-emerald-600"];

export default function MyPage() {
  const progressPct = Math.round(
    ((mockUser.startWeight - mockUser.currentWeight) /
      (mockUser.startWeight - mockUser.goalWeight)) *
      100
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <DemoNav />
      <div className="max-w-2xl mx-auto px-4 py-10">
        {/* ヘッダー */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-xl font-bold text-slate-900">{mockUser.name}</h1>
            <p className="text-slate-500 text-sm">会員マイページ</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-2xl">
            👤
          </div>
        </div>

        {/* カウントダウン */}
        <Card className="bg-emerald-500 text-white border-0 shadow-xl rounded-2xl mb-5">
          <CardContent className="p-6 text-center">
            <p className="text-emerald-100 text-sm mb-1">目標達成まで</p>
            <p className="text-7xl font-bold mb-1">{mockUser.daysToGoal}</p>
            <p className="text-emerald-100 text-sm">日</p>
          </CardContent>
        </Card>

        {/* 体重グラフ */}
        <Card className="bg-white border-0 shadow-md rounded-2xl mb-5">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-slate-700 text-sm">体重推移（90日）</h2>
              <div className="text-right">
                <span className="text-2xl font-bold text-slate-900">{mockUser.currentWeight}</span>
                <span className="text-slate-500 text-xs ml-1">kg</span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={160}>
              <AreaChart data={THIN_HISTORY} margin={{ top: 5, right: 5, bottom: 0, left: -25 }}>
                <defs>
                  <linearGradient id="wGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="date" tick={{ fontSize: 10, fill: "#94a3b8" }} interval={3} />
                <YAxis
                  domain={[mockUser.goalWeight - 1, mockUser.startWeight + 1]}
                  tick={{ fontSize: 10, fill: "#94a3b8" }}
                />
                <Tooltip
                  contentStyle={{ borderRadius: "0.75rem", border: "none", boxShadow: "0 2px 8px rgba(0,0,0,0.1)", fontSize: "12px" }}
                  formatter={(v) => [`${v}kg`, "体重"]}
                />
                <Area type="monotone" dataKey="weight" stroke="#10b981" fill="url(#wGrad)" strokeWidth={2} dot={false} />
              </AreaChart>
            </ResponsiveContainer>
            <div className="flex justify-between text-xs text-slate-400 mt-2">
              <span>開始: {mockUser.startWeight}kg</span>
              <span>現在: {mockUser.currentWeight}kg</span>
              <span>目標: {mockUser.goalWeight}kg</span>
            </div>
            <div className="mt-3">
              <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                <span>達成率</span>
                <span className="font-semibold text-emerald-600">{progressPct}%</span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500 rounded-full transition-all"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 継続カレンダー */}
        <Card className="bg-white border-0 shadow-md rounded-2xl mb-5">
          <CardContent className="p-5">
            <h2 className="font-semibold text-slate-700 text-sm mb-3">継続カレンダー（90日）</h2>
            <div className="grid grid-cols-[repeat(13,1fr)] gap-1">
              {calendar.map((level, i) => (
                <div
                  key={i}
                  className={`aspect-square rounded-sm ${cellColors[level]}`}
                  title={`${i + 1}日前`}
                />
              ))}
            </div>
            <div className="flex items-center gap-1.5 mt-3 text-xs text-slate-400">
              <span>少</span>
              {cellColors.map((c, i) => (
                <div key={i} className={`w-3 h-3 rounded-sm ${c}`} />
              ))}
              <span>多</span>
            </div>
          </CardContent>
        </Card>

        {/* ポイント */}
        <Card className="bg-white border-0 shadow-md rounded-2xl mb-5">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-500 text-xs mb-1">今月のポイント残高</p>
                <p className="text-3xl font-bold text-slate-900">
                  {mockUser.points.toLocaleString()}
                  <span className="text-base font-normal text-slate-400 ml-1">pt</span>
                </p>
                <p className="text-xs text-slate-400 mt-1">月目標 {mockUser.monthlyPoints.toLocaleString()}pt</p>
              </div>
              <div className="text-4xl">⭐</div>
            </div>
            <div className="mt-3">
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-yellow-400 rounded-full"
                  style={{ width: `${Math.min((mockUser.points / mockUser.monthlyPoints) * 100, 100)}%` }}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 最近の活動 */}
        <Card className="bg-white border-0 shadow-md rounded-2xl">
          <CardContent className="p-5">
            <h2 className="font-semibold text-slate-700 text-sm mb-3">最近の活動</h2>
            <ul className="space-y-3">
              {mockActivityLog.map((a, i) => (
                <li key={i} className="flex items-center gap-3 text-sm">
                  <span className="text-lg">{a.icon}</span>
                  <span className="flex-1 text-slate-700">{a.label}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400 text-xs">{a.time}</span>
                    {a.status === "warn" && (
                      <Badge className="bg-orange-100 text-orange-600 border-0 text-xs px-2 py-0">未</Badge>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

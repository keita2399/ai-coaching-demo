export const mockUser = {
  name: "山田 太郎",
  goalWeight: 70,
  startWeight: 85,
  currentWeight: 74.2,
  points: 28400,
  monthlyPoints: 35000,
  daysToGoal: 47,
};

export const mockWeightHistory90 = Array.from({ length: 90 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() - (89 - i));
  const progress = i / 89;
  const base = 85 - (85 - 74.2) * progress;
  const noise = (Math.random() - 0.5) * 0.8;
  return {
    date: date.toLocaleDateString("ja-JP", { month: "numeric", day: "numeric" }),
    weight: parseFloat((base + noise).toFixed(1)),
  };
});

export const mockActivityLog = [
  { time: "今日 07:15", icon: "⚖️", label: "体重測定（朝）", status: "ok" },
  { time: "今日 12:30", icon: "🍱", label: "食事報告（昼）", status: "ok" },
  { time: "今日 18:00", icon: "🏃", label: "運動未報告", status: "warn" },
  { time: "昨日 07:10", icon: "⚖️", label: "体重測定（朝）", status: "ok" },
  { time: "昨日 19:45", icon: "🍽️", label: "食事報告（夜）", status: "ok" },
];

export const mockMembers = [
  { id: 1, name: "鈴木 花子", group: "Aグループ", start: "2026/03/01", progress: 68, lastMeasure: "今日", status: "good" },
  { id: 2, name: "佐藤 健太", group: "Bグループ", start: "2026/02/15", progress: 42, lastMeasure: "2日前", status: "stagnation" },
  { id: 3, name: "田中 美咲", group: "Aグループ", start: "2026/03/15", progress: 85, lastMeasure: "今日", status: "good" },
  { id: 4, name: "伊藤 大輔", group: "Cグループ", start: "2026/01/10", progress: 91, lastMeasure: "今日", status: "good" },
  { id: 5, name: "渡辺 さくら", group: "Bグループ", start: "2026/04/01", progress: 25, lastMeasure: "3日前", status: "warning" },
  { id: 6, name: "山本 翔太", group: "Cグループ", start: "2026/02/01", progress: 55, lastMeasure: "今日", status: "stagnation" },
  { id: 7, name: "中村 あい", group: "Aグループ", start: "2026/03/20", progress: 73, lastMeasure: "昨日", status: "good" },
  { id: 8, name: "小林 拓也", group: "Bグループ", start: "2026/04/10", progress: 33, lastMeasure: "今日", status: "stagnation" },
  { id: 9, name: "加藤 由美", group: "Cグループ", start: "2026/03/05", progress: 62, lastMeasure: "昨日", status: "good" },
  { id: 10, name: "吉田 浩二", group: "Aグループ", start: "2026/02/20", progress: 18, lastMeasure: "5日前", status: "warning" },
];

export const mockAlerts = [
  { time: "14:32", name: "鈴木 花子", message: "体重未測定（48時間経過）", type: "warn" },
  { time: "13:50", name: "佐藤 健太", message: "AI停滞検知 → 自動付き添いメッセージ送信済み", type: "ai" },
  { time: "12:15", name: "渡辺 さくら", message: "3日連続増加トレンド検知", type: "alert" },
  { time: "10:05", name: "吉田 浩二", message: "体重未測定（5日経過）", type: "warn" },
  { time: "09:30", name: "田中 美咲", message: "目標達成率85% — マイルストーン到達", type: "good" },
  { time: "08:45", name: "伊藤 大輔", message: "連続90日記録更新 🎉", type: "good" },
];

"use client";
import DemoNav from "@/components/DemoNav";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockMembers, mockAlerts } from "@/lib/mockData";

const kpis = [
  { icon: "👥", label: "現役会員数", value: "47", unit: "名" },
  { icon: "📊", label: "今日の測定報告率", value: "89", unit: "%" },
  { icon: "⚠️", label: "停滞検知中", value: "6", unit: "名" },
  { icon: "🔔", label: "習慣遵守アラート", value: "2", unit: "件" },
];

const statusLabel: Record<string, { label: string; color: string }> = {
  good: { label: "順調", color: "bg-emerald-100 text-emerald-700" },
  stagnation: { label: "停滞", color: "bg-yellow-100 text-yellow-700" },
  warning: { label: "要注意", color: "bg-red-100 text-red-700" },
};

const alertTypeConfig: Record<string, { color: string; icon: string }> = {
  warn: { color: "border-l-yellow-400 bg-yellow-50", icon: "⚠️" },
  ai: { color: "border-l-emerald-400 bg-emerald-50", icon: "🤖" },
  alert: { color: "border-l-red-400 bg-red-50", icon: "🔴" },
  good: { color: "border-l-emerald-400 bg-emerald-50", icon: "✅" },
};

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <DemoNav />
      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* ヘッダー */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">🖥️ コーチ管理画面</h1>
            <p className="text-slate-500 text-sm">リアルタイムモニタリング</p>
          </div>
          <div className="flex items-center gap-2 text-xs text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            Live
          </div>
        </div>

        {/* KPI */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {kpis.map((k, i) => (
            <Card key={i} className="bg-white border-0 shadow-md rounded-2xl">
              <CardContent className="p-5 text-center">
                <div className="text-3xl mb-2">{k.icon}</div>
                <div className="text-3xl font-bold text-slate-900">
                  {k.value}
                  <span className="text-base font-normal text-slate-400 ml-1">{k.unit}</span>
                </div>
                <p className="text-slate-500 text-xs mt-1">{k.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* 会員一覧テーブル */}
          <div className="lg:col-span-2 min-w-0">
            <Card className="bg-white border-0 shadow-md rounded-2xl overflow-hidden">
              <CardContent className="p-0">
                <div className="px-6 py-4 border-b border-slate-100">
                  <h2 className="font-semibold text-slate-700">会員一覧</h2>
                </div>
                <div className="overflow-x-auto w-full">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-slate-100">
                        {["氏名", "グループ", "開始日", "進捗", "最終測定", "ステータス"].map(
                          (h) => (
                            <th key={h} className="text-left px-4 py-3 text-xs text-slate-400 font-medium whitespace-nowrap">
                              {h}
                            </th>
                          )
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {mockMembers.map((m) => (
                        <tr key={m.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                          <td className="px-4 py-3 font-medium text-slate-800 whitespace-nowrap">{m.name}</td>
                          <td className="px-4 py-3 text-slate-500 whitespace-nowrap">{m.group}</td>
                          <td className="px-4 py-3 text-slate-400 whitespace-nowrap">{m.start}</td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-emerald-500 rounded-full"
                                  style={{ width: `${m.progress}%` }}
                                />
                              </div>
                              <span className="text-xs text-slate-500">{m.progress}%</span>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-slate-500 whitespace-nowrap">{m.lastMeasure}</td>
                          <td className="px-4 py-3">
                            <Badge className={`${statusLabel[m.status].color} border-0 text-xs px-2 py-0.5 whitespace-nowrap`}>
                              {statusLabel[m.status].label}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* アラートフィード */}
          <div>
            <Card className="bg-white border-0 shadow-md rounded-2xl">
              <CardContent className="p-0">
                <div className="px-5 py-4 border-b border-slate-100">
                  <h2 className="font-semibold text-slate-700">リアルタイムアラート</h2>
                </div>
                <div className="p-3 space-y-2 max-h-[480px] overflow-y-auto">
                  {mockAlerts.map((a, i) => (
                    <div
                      key={i}
                      className={`border-l-4 rounded-r-xl px-3 py-2.5 ${alertTypeConfig[a.type].color}`}
                    >
                      <div className="flex items-start gap-1.5">
                        <span className="text-sm mt-0.5">{alertTypeConfig[a.type].icon}</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-slate-700 truncate">{a.name}</p>
                          <p className="text-xs text-slate-500 leading-relaxed">{a.message}</p>
                          <p className="text-xs text-slate-400 mt-0.5">{a.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

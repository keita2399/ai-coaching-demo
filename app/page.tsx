import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const demoCards = [
  {
    href: "/demo/ocr",
    icon: "📋",
    title: "申し込み書OCR + AI審査",
    desc: "Gemini Visionで手書き・印刷書類を読み取り、AIが合否判定とコメントを生成",
    badge: "実動作",
    badgeClass: "bg-emerald-100 text-emerald-700",
  },
  {
    href: "/demo/webhook",
    icon: "📊",
    title: "体重Webhook + AI停滞検知",
    desc: "体重データの変化をAIがリアルタイム分析。停滞・リバウンドを検知してメッセージ生成",
    badge: "実動作",
    badgeClass: "bg-emerald-100 text-emerald-700",
  },
  {
    href: "/demo/mypage",
    icon: "📱",
    title: "会員マイページ",
    desc: "カウントダウン・体重グラフ・習慣カレンダー・ポイント残高を一覧表示",
    badge: "モック",
    badgeClass: "bg-slate-100 text-slate-600",
  },
  {
    href: "/demo/admin",
    icon: "🖥️",
    title: "管理ダッシュボード",
    desc: "47名の会員をリアルタイム監視。AIアラート・停滞検知・行動ログを一元管理",
    badge: "モック",
    badgeClass: "bg-slate-100 text-slate-600",
  },
];

const achievements = [
  { icon: "🏊", label: "LINE LIFF + Gemini RAG", sub: "VCC案件・受注500万" },
  { icon: "📄", label: "Gemini Vision OCR", sub: "不動産・重要事項説明書" },
  { icon: "🏗️", label: "Next.js + Neon Postgres本番", sub: "建設業SaaS" },
  { icon: "🤖", label: "Claude Code活用", sub: "実質3〜5人月相当の生産性" },
];

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="bg-white py-20 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 mb-6 text-sm px-4 py-1">
            Lancers 提案デモ
          </Badge>
          <h1 className="text-5xl font-bold text-slate-900 leading-tight mb-4">
            AI × 習慣 × 継続
          </h1>
          <p className="text-xl text-slate-500 mb-8">
            使える技術と実体験で、あなたのプロジェクトを動かします。
          </p>
          <Button asChild size="lg" className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl px-8 text-lg shadow-lg">
            <Link href="/demo/ocr">デモを見る →</Link>
          </Button>
        </div>
      </section>

      {/* 差別化 */}
      <section className="py-16 px-4 bg-emerald-600 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">なぜ私がこの案件に応募したか</h2>
          <blockquote className="text-lg leading-relaxed text-emerald-50 text-left bg-emerald-700/50 rounded-2xl p-8 shadow-xl">
            <p className="mb-4">
              水泳でインターハイに出場し、毎日同じ時間に同じ練習を、
              何年も繰り返した。仲間と励まし合い、続けることの価値を身体で知っている。
            </p>
            <p className="mb-4">
              世界記録は才能ではなく、<strong className="text-white">習慣・規律化・継続</strong>の積み上げだった。
              専門でしたまでは間違いありません。
            </p>
            <p className="mb-4">
              ユーザーがどこで躓き、何があれば続けられるのか——
              この設計判断に、私の実体験を活かしたいと考えています。
            </p>
            <p className="text-emerald-200 text-sm mt-6 text-right">— 松尾慶太（フリーランスエンジニア）</p>
          </blockquote>
        </div>
      </section>

      {/* デモ一覧 */}
      <section className="py-16 px-4 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-slate-800 mb-10">
            デモ一覧
          </h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {demoCards.map((card) => (
              <Link key={card.href} href={card.href}>
                <Card className="h-full hover:shadow-lg transition-all hover:-translate-y-0.5 bg-white border-0 shadow-md rounded-2xl cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <span className="text-3xl">{card.icon}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-slate-800 text-sm">{card.title}</h3>
                          <Badge className={`${card.badgeClass} text-xs px-2 py-0.5 border-0 shrink-0`}>
                            {card.badge}
                          </Badge>
                        </div>
                        <p className="text-slate-500 text-sm leading-relaxed">{card.desc}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* プロフィール */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-slate-800 mb-10">Profile</h2>
          <div className="flex flex-col sm:flex-row gap-8 items-start">
            <div className="shrink-0 w-20 h-20 rounded-2xl bg-emerald-100 flex items-center justify-center text-4xl shadow-md">
              👨‍💻
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-1">松尾慶太</h3>
              <p className="text-slate-500 text-sm mb-4">フリーランスエンジニア／山梨県在住</p>
              <p className="text-slate-700 leading-relaxed mb-4">
                ITキャリア40年超。COBOL・PL/I・IBM Mainframe Assembler・Java/Spring 25年から
                Next.js + AI駆動開発へ転換。レガシー知見 × モダン実装 × AI活用で
                Claude Code を使い実質3〜5人月相当の生産性を発揮。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 関連実績 */}
      <section className="py-16 px-4 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-slate-800 mb-10">関連実績</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {achievements.map((a, i) => (
              <Card key={i} className="bg-white border-0 shadow-md rounded-2xl">
                <CardContent className="p-5 flex items-center gap-4">
                  <span className="text-3xl">{a.icon}</span>
                  <div>
                    <p className="font-semibold text-slate-800 text-sm">{a.label}</p>
                    <p className="text-slate-500 text-xs">{a.sub}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-800 text-slate-400 text-center py-8 text-sm">
        <p>お問い合わせはLancersメッセージよりお願いします</p>
      </footer>
    </main>
  );
}

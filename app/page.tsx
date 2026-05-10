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
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 leading-tight mb-4">
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
      <section className="relative py-20 px-4 bg-slate-900 text-white overflow-hidden">
        {/* 水・波の抽象背景 */}
        <div className="absolute inset-0 pointer-events-none select-none" aria-hidden>
          <svg
            className="absolute bottom-0 left-0 w-full opacity-10"
            viewBox="0 0 1440 320"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
            <path
              fill="#10b981"
              d="M0,192L48,181.3C96,171,192,149,288,154.7C384,160,480,192,576,186.7C672,181,768,139,864,138.7C960,139,1056,181,1152,192C1248,203,1344,181,1392,170.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            />
          </svg>
          <svg
            className="absolute bottom-0 left-0 w-full opacity-6"
            viewBox="0 0 1440 320"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
            <path
              fill="#34d399"
              d="M0,256L60,240C120,224,240,192,360,186.7C480,181,600,203,720,213.3C840,224,960,224,1080,202.7C1200,181,1320,139,1380,117.3L1440,96L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
            />
          </svg>
        </div>

        <div className="relative max-w-3xl mx-auto">
          <p className="text-emerald-400 text-sm font-semibold tracking-widest uppercase mb-4 text-center">
            Why I applied
          </p>
          <h2 className="text-3xl font-bold mb-12 text-center">
            なぜ私がこの案件に応募したか
          </h2>

          <div className="border-l-4 border-emerald-500 pl-8 space-y-6">
            <p className="text-slate-300 text-lg leading-relaxed">
              私は30代で離婚を機に酒に溺れ、健康診断で問題が出たことをきっかけに、
              子供の頃に少しやっていた水泳を再開しました。
              <span className="text-slate-400">最初はまともに泳げませんでした。</span>
            </p>

            <p className="text-slate-300 text-lg leading-relaxed">
              そこから規律と継続だけを頼りに練習を積み——
            </p>

            {/* 世界記録ハイライト */}
            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl px-6 py-5">
              <p className="text-emerald-300 text-sm font-semibold mb-1">
                2010年　第14回千葉マスターズ水泳競技大会
              </p>
              <p className="text-white text-lg font-bold mb-1">
                400m 混合フリーリレー
              </p>
              <p className="flex items-baseline gap-3 flex-wrap">
                <span className="text-4xl sm:text-5xl font-black text-emerald-400 tracking-tight">
                  4:06.97
                </span>
                <span className="text-xl sm:text-2xl font-bold text-white">
                  世界記録樹立
                </span>
              </p>
              <p className="text-slate-400 text-sm mt-2">
                後に 800m 混合フリーリレーでも世界記録を更新
              </p>
            </div>

            <p className="text-slate-300 text-lg leading-relaxed">
              私自身が、健康を崩した状態から
              <strong className="text-white">「規律・習慣化・継続」</strong>
              だけで人生を取り戻したユーザー像そのものです。
            </p>

            <p className="text-slate-300 text-lg leading-relaxed">
              ユーザーがどこで挫折し、何があれば続けられるのか——
              その設計判断に、私の実体験を活かせると考えています。
            </p>
          </div>

          <p className="text-slate-500 text-sm mt-10 text-right">
            — 松尾慶太（フリーランスエンジニア）
          </p>
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

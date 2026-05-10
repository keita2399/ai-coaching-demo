"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const navItems = [
  { href: "/demo/ocr", label: "📋 申し込みOCR審査", badge: "実動作" },
  { href: "/demo/webhook", label: "📊 体重Webhook×AI停滞", badge: "実動作" },
  { href: "/demo/mypage", label: "📱 会員マイページ", badge: "モック" },
  { href: "/demo/admin", label: "🖥️ 管理ダッシュボード", badge: "モック" },
];

export default function DemoNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-slate-100 sticky top-0 z-50 shadow-sm">
      {/* バー */}
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center">
        <Link href="/" className="text-emerald-600 font-bold text-sm shrink-0 mr-4">
          ← TOP
        </Link>

        {/* デスクトップ: md 以上で横並び */}
        <div className="hidden md:flex items-center gap-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm whitespace-nowrap transition-colors ${
                pathname === item.href
                  ? "bg-emerald-500 text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-emerald-50 hover:text-emerald-700"
              }`}
            >
              {item.label}
              <span
                className={`text-xs px-1.5 py-0.5 rounded-full ${
                  pathname === item.href
                    ? "bg-white/20 text-white"
                    : item.badge === "実動作"
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-slate-200 text-slate-500"
                }`}
              >
                {item.badge}
              </span>
            </Link>
          ))}
        </div>

        {/* モバイル: ハンバーガーボタン */}
        <button
          className="md:hidden ml-auto p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "メニューを閉じる" : "メニューを開く"}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* モバイル: ドロップダウン */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-200 ${
          open ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="bg-emerald-50 px-4 py-2 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`flex items-center justify-between py-4 px-3 rounded-xl text-sm transition-colors ${
                pathname === item.href
                  ? "bg-emerald-500 text-white"
                  : "text-slate-900 hover:bg-emerald-100"
              }`}
            >
              <span>{item.label}</span>
              <span
                className={`text-xs px-2 py-0.5 rounded-full shrink-0 ${
                  pathname === item.href
                    ? "bg-white/20 text-white"
                    : item.badge === "実動作"
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-slate-200 text-slate-500"
                }`}
              >
                {item.badge}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}

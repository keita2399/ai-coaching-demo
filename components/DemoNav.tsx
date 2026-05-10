"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/demo/ocr", label: "📋 申し込みOCR審査", badge: "実動作" },
  { href: "/demo/webhook", label: "📊 体重Webhook×AI停滞", badge: "実動作" },
  { href: "/demo/mypage", label: "📱 会員マイページ", badge: "モック" },
  { href: "/demo/admin", label: "🖥️ 管理ダッシュボード", badge: "モック" },
];

export default function DemoNav() {
  const pathname = usePathname();
  return (
    <nav className="bg-white border-b border-slate-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center gap-2 overflow-x-auto">
        <Link href="/" className="text-emerald-600 font-bold text-sm shrink-0 mr-3">
          ← TOP
        </Link>
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
    </nav>
  );
}

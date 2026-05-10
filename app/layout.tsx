import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI Coaching Demo | 松尾慶太",
  description: "AIと習慣で人生を変える。実動作デモ。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${inter.className} antialiased bg-slate-50 text-slate-800`}>
        {children}
      </body>
    </html>
  );
}

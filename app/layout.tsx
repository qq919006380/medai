import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "AI医疗藏经阁 - 医疗AI领域最新研究动态",
  description: "实时推送医疗人工智能领域最新研究进展的平台，为医疗AI研究者、医生、学生提供精准、分类清晰的学术前沿信息。",
  keywords: "医疗AI, 人工智能医疗, 医学研究, 论文推送, AI研究",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

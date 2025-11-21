import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Reference Formatter - AI参考文献フォーマットツール",
  description: "大学生のための参考文献を自動フォーマット。AIが論文の引用・参考文献を素早く整形します。シンプルで使いやすい、無料の文献管理ツール。",
  keywords: ["参考文献", "引用", "フォーマット", "論文", "大学生", "AI", "文献管理"],
  authors: [{ name: "Reference Formatter" }],
  openGraph: {
    title: "Reference Formatter - AI参考文献フォーマットツール",
    description: "AIが論文の参考文献を自動フォーマット。大学生のための簡単・高速な文献整形ツール。",
    type: "website",
    locale: "ja_JP",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Reference Formatter - AI参考文献フォーマットツール",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Reference Formatter - AI参考文献フォーマットツール",
    description: "AIが論文の参考文献を自動フォーマット。大学生のための簡単・高速な文献整形ツール。",
    images: ["/og-image.png"],
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

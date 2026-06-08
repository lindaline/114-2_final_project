import type { Metadata } from "next";
import { Noto_Serif_TC, Noto_Sans_TC } from "next/font/google";
import "./globals.css";

const notoSerif = Noto_Serif_TC({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-noto-serif",
  display: "swap",
});

const notoSans = Noto_Sans_TC({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-noto-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "糖衣記憶 — Sugar Memories",
  description: "把日常的酸澀，都裹上溫柔的糖衣。",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-TW" className={`${notoSerif.variable} ${notoSans.variable}`}>
      <body className="font-sans">
        {children}
      </body>
    </html>
  );
}

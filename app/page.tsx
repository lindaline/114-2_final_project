import Link from "next/link";
import PageBackground from "@/components/PageBackground";

export default function LandingPage() {
  return (
    <>
      <PageBackground variant="vivid" />

      {/* Navbar */}
      <nav className="relative z-10 flex items-center justify-between px-12 py-4">
        <div className="font-serif text-lg font-bold text-sugar-mauve">糖衣記憶 🍭</div>
        <div className="flex gap-7">
          <a className="text-[13px] text-sugar-lilac transition-colors hover:text-sugar-plum" href="#">
            行動特點
          </a>
          <a className="text-[13px] text-sugar-lilac transition-colors hover:text-sugar-plum" href="#">
            心靈聲音就是
          </a>
          <a className="text-[13px] text-sugar-lilac transition-colors hover:text-sugar-plum" href="#">
            關於我們
          </a>
        </div>
      </nav>

      {/* Hero */}
      <main className="relative z-10 flex min-h-[calc(100vh-64px)] flex-col items-center justify-center px-6 text-center">
        <h1 className="mb-5 font-serif text-5xl font-bold leading-[1.3] tracking-[0.02em] text-sugar-ink">
          把日常的酸澀，都裹上溫柔的糖衣。
        </h1>

        <p className="mb-3 max-w-[480px] text-[15px] leading-[1.8] text-sugar-mauve">
          糖衣記憶（Glazed Memories）讓一切都從頭來過是我們的初衷，
          <br />
          用情感與文字描繪，讓 AI 知道你的日記並給你心靈上的甜蜜小提示。
        </p>

        <p className="mb-9 text-[13px] text-sugar-fade">
          探索你的糖衣記憶，讓每一天都充滿甜蜜的回憶。
        </p>

        <Link href="/faceid" className="btn-cta">
          探索你的糖衣記憶 · Start 立即登入
        </Link>

        <p className="fixed bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap text-[11px] text-sugar-mist">
          © 2025 SugarMemory · 糖衣記憶 保留所有權利
        </p>
      </main>
    </>
  );
}

import Link from "next/link";
import PageBackground from "@/components/PageBackground";

export default function LandingPage() {
  return (
    <>
      <PageBackground variant="vivid" />

      {/* Navbar */}
      <nav className="relative z-10 flex items-center justify-between px-12 py-4">
        <div className="font-serif text-lg font-bold text-sugar-mauve">糖衣記憶 🍭</div>
      </nav>

      {/* Hero */}
      <main className="relative z-10 flex min-h-[calc(100vh-64px)] flex-col items-center justify-center px-6 text-center">
        <h1 className="mb-5 font-serif text-5xl font-bold leading-[1.3] tracking-[0.02em] text-[#4A373A]">
          生活偶爾微酸，但這裡只留微甜。
        </h1>

        <p className="mb-3 w-fit max-w-[600px] text-center text-[15px] leading-[1.8] text-[#8C7376]">
          卸下外面的防備，走進這個專屬的角落，用情感落筆，用文字呼吸。
          <br />
          把那些無處安放的委屈，或是閃閃發光的小確幸，都裹上一層溫柔的粉嫩色澤。
        </p>

        <Link href="/login" className="btn-cta">
          探索你的糖衣記憶 · 立即登入
        </Link>

        <p className="fixed bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap text-[11px] text-sugar-mist">
          &copy; 2026 糖衣記憶 · SugarMemory by B11223210 四資管AI技優專班三A 連家菱
        </p>
      </main>
    </>
  );
}

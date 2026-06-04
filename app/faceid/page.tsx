"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import PageBackground from "@/components/PageBackground";

export default function FaceIdPage() {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [camError, setCamError] = useState<string | null>(null);

  useEffect(() => {
    let stream: MediaStream | null = null;

    async function startCamera() {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user" }, // 前鏡頭
          audio: false,
        });
        if (videoRef.current) videoRef.current.srcObject = stream;
      } catch {
        setCamError("無法開啟鏡頭，請確認已允許瀏覽器的相機權限。");
      }
    }

    startCamera();

    // 離開頁面時關閉鏡頭，避免相機燈一直亮著
    return () => {
      stream?.getTracks().forEach((t) => t.stop());
    };
  }, []);

  // 模擬辨識完成後自動進入登入頁（可改成導向 /dashboard）
  useEffect(() => {
    const t = setTimeout(() => router.push("/login"), 4000);
    return () => clearTimeout(t);
  }, [router]);

  return (
    <>
      <PageBackground
        variant="vivid"
        bokeh={[
          { w: 340, top: "12%", left: "15%", color: "#FFAEC4", opacity: 0.5 },
          { w: 260, top: "65%", left: "78%", color: "#C9B8FF", opacity: 0.4 },
          { w: 180, top: "80%", left: "10%", color: "#B8E8D0", opacity: 0.38 },
        ]}
        macarons={[]}
      />

      <main className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <h1 className="mb-1.5 font-serif text-[26px] font-bold text-sugar-ink">
          糖衣記憶 × Sugar Memories
        </h1>
        <p className="mb-9 text-[13px] text-sugar-lilac">
          將臉部對準圓框，系統自動辨識，享受無密碼的甜蜜體驗。
        </p>

        {/* Macaron face frame */}
        <div className="macaron-outer">
          <div className="macaron-cream" />
          <div className="cam-inner">
            <video ref={videoRef} className="cam-video" autoPlay playsInline muted />
            <svg width="90" height="90" viewBox="0 0 90 90" fill="none">
              <circle cx="45" cy="36" r="22" stroke="#98FB98" strokeWidth="1.8" opacity="0.6" />
              <circle cx="38" cy="33" r="3.2" fill="#B8E8D0" opacity="0.9" />
              <circle cx="52" cy="33" r="3.2" fill="#B8E8D0" opacity="0.9" />
              <path d="M36 46 Q45 54 54 46" stroke="#98FB98" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              <path d="M20 65 Q45 80 70 65" stroke="#B8E8D0" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.35" />
            </svg>
            <div className="scan-line" />
          </div>
        </div>

        <div className="lock-badge">🔒</div>

        <p className="mt-5 text-sm font-medium text-[#6B9E8B]">正在進行臉部驗證中…</p>
        {camError && (
          <p style={{ fontSize: 13, color: "#E2574C", marginTop: 8 }}>{camError}</p>
        )}

        <Link href="/login" className="btn-pill mt-5">
          使用密碼登入🗝️
        </Link>
      </main>

      {/* 此頁專屬樣式 */}
      <style jsx>{`
        .macaron-outer {
          width: 240px;
          height: 240px;
          border-radius: 50%;
          background: linear-gradient(145deg, #ffb3c6 0%, #ff8fab 40%, #ffb3c6 70%, #ffc8d8 100%);
          box-shadow: 0 20px 60px rgba(255, 107, 157, 0.4), 0 6px 20px rgba(255, 107, 157, 0.3),
            inset 0 -8px 20px rgba(255, 255, 255, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }
        .macaron-outer::before {
          content: "";
          position: absolute;
          top: 12px;
          left: 12px;
          right: 12px;
          height: 18px;
          background: rgba(255, 255, 255, 0.25);
          border-radius: 50%;
          filter: blur(4px);
        }
        .macaron-cream {
          position: absolute;
          width: calc(100% + 6px);
          height: 14px;
          background: rgba(255, 255, 255, 0.55);
          border-radius: 8px;
          top: 50%;
          left: -3px;
          transform: translateY(-50%);
        }
        .cam-inner {
          width: 186px;
          height: 186px;
          border-radius: 50%;
          background: linear-gradient(180deg, #1e2b3c 0%, #0f1929 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          box-shadow: inset 0 4px 24px rgba(0, 0, 0, 0.5);
        }
        @keyframes scanMove {
          0% { top: 10%; opacity: 0; }
          8% { opacity: 1; }
          92% { opacity: 1; }
          100% { top: 90%; opacity: 0; }
        }
        .scan-line {
          position: absolute;
          left: 0;
          right: 0;
          height: 2px;
          background: #98fb98;
          box-shadow: 0 0 12px #98fb9899, 0 0 24px #98fb9866, 0 0 4px #98fb98;
          animation: scanMove 2s ease-in-out infinite;
        }
        .lock-badge {
          width: 52px;
          height: 52px;
          border-radius: 14px;
          background: linear-gradient(135deg, #67e8b0 0%, #34d399 100%);
          box-shadow: 0 6px 20px rgba(52, 211, 153, 0.5), 0 0 30px rgba(52, 211, 153, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 22px;
          margin: 20px auto 0;
        }
        .cam-video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transform: scaleX(-1);  /* 水平鏡像，照起來像鏡子 */
        }
      `}</style>
    </>
  );
}

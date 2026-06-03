"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import PageBackground from "@/components/PageBackground";

export default function LoginPage() {
  const router = useRouter();
  const [showPw, setShowPw] = useState(false);
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit() {
    // TODO: 接上真正的驗證 API
    router.push("/dashboard");
  }

  return (
    <>
      <PageBackground
        variant="vivid"
        bokeh={[
          { w: 340, top: "15%", left: "12%", color: "#FFAEC4", opacity: 0.55 },
          { w: 260, top: "20%", left: "78%", color: "#C9B8FF", opacity: 0.45 },
          { w: 200, top: "75%", left: "20%", color: "#B8E8D0", opacity: 0.38 },
          { w: 160, top: "78%", left: "82%", color: "#FFD6A0", opacity: 0.35 },
        ]}
        macarons={[]}
      />

      <main className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <h1 className="mb-1.5 font-serif text-[26px] font-bold text-sugar-ink">
          糖衣記憶 × Glazed Memories
        </h1>
        <p className="mb-7 text-[13px] text-sugar-lilac">
          請輸入您的帳號密碼，開始今日的甜蜜記憶之旅
        </p>

        <div className="login-card">
          <div className="input-row">
            <span className="input-icon">👤</span>
            <input
              type="text"
              placeholder="請輸入您的帳號"
              autoComplete="username"
              value={account}
              onChange={(e) => setAccount(e.target.value)}
            />
          </div>

          <div className="input-row">
            <span className="input-icon">🔒</span>
            <input
              type={showPw ? "text" : "password"}
              placeholder="請輸入您的密碼"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="button" className="eye-btn" onClick={() => setShowPw((v) => !v)}>
              {showPw ? "🙈" : "👁️"}
            </button>
          </div>

          <button className="btn-submit mt-1.5" onClick={handleSubmit}>
            開啟糖衣記憶 ✨
          </button>
        </div>

        <Link href="/" className="back-link">
          ← 返回首頁
        </Link>
      </main>

      <style jsx>{`
        .login-card {
          width: 100%;
          max-width: 360px;
          background: rgba(255, 255, 255, 0.72);
          backdrop-filter: blur(20px);
          border-radius: 24px;
          padding: 32px;
          box-shadow: 0 24px 64px rgba(255, 143, 171, 0.25), 0 4px 20px rgba(0, 0, 0, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.9);
        }
        .input-row {
          display: flex;
          align-items: center;
          gap: 10px;
          background: rgba(255, 240, 245, 0.75);
          border: 1px solid rgba(255, 143, 171, 0.25);
          border-radius: 12px;
          padding: 12px 16px;
          margin-bottom: 14px;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .input-row:focus-within {
          border-color: #ff8fab;
          box-shadow: 0 0 0 3px rgba(255, 143, 171, 0.15);
        }
        .input-row input {
          flex: 1;
          background: transparent;
          border: none;
          outline: none;
          font-family: inherit;
          font-size: 14px;
          color: #5c3a6e;
        }
        .input-row input::placeholder {
          color: #b08ab0;
        }
        .input-icon {
          font-size: 16px;
          color: #b08ab0;
          flex-shrink: 0;
        }
        .eye-btn {
          background: none;
          border: none;
          cursor: pointer;
          font-size: 15px;
          color: #b08ab0;
          padding: 0;
        }
        .btn-submit {
          width: 100%;
          padding: 14px;
          background: linear-gradient(135deg, #ff8fab 0%, #ff6b9d 50%, #e85d9a 100%);
          color: white;
          border: none;
          border-radius: 12px;
          font-size: 15px;
          font-weight: 600;
          font-family: inherit;
          cursor: pointer;
          box-shadow: 0 8px 24px rgba(255, 107, 157, 0.45);
          transition: all 0.2s;
          letter-spacing: 0.03em;
        }
        .btn-submit:hover {
          filter: brightness(1.06);
          transform: translateY(-1px);
        }
        .btn-submit:active {
          transform: scale(0.98);
        }
        .back-link {
          display: inline-block;
          margin-top: 20px;
          background: rgba(255, 255, 255, 0.6);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 143, 171, 0.3);
          color: #9b6fa0;
          padding: 9px 22px;
          border-radius: 9999px;
          font-size: 13px;
          font-family: inherit;
          cursor: pointer;
          transition: all 0.2s;
          text-decoration: none;
        }
        .back-link:hover {
          background: rgba(255, 255, 255, 0.85);
        }
      `}</style>
    </>
  );
}

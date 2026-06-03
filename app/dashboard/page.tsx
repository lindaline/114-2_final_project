"use client";

import { useState } from "react";
import PageBackground from "@/components/PageBackground";
import AISummaryModal from "@/components/AISummaryModal";

type Diary = {
  id: number;
  date: string;
  dot: string;
  title: string;
  preview: string;
};

const INITIAL_DIARIES: Diary[] = [
  { id: 1, date: "5/20", dot: "#FFB3C6", title: "週末的草莓鬆餅", preview: "今天我一個人跑去了附近新開的咖啡廳，點了一份草莓鬆餅…" },
  { id: 2, date: "5/18", dot: "#C9B8FF", title: "雨後的傍晚散步", preview: "和一隻流浪貓相遇，它的眼睛像是裝了整個傍晚。" },
  { id: 3, date: "5/15", dot: "#B8E8D0", title: "想念遠方的朋友", preview: "和一隻流浪貓相遇，它說：「你把每隻流浪的貓都帶回家好嗎？」" },
  { id: 4, date: "5/12", dot: "#FFD6A0", title: "那一天的蛋糕", preview: "我一個、一個的、一個的把每個故事唱出來，走到最後…" },
];

export default function DashboardPage() {
  const [diaries, setDiaries] = useState<Diary[]>(INITIAL_DIARIES);
  const [modalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  function handleDelete(id: number) {
    setDiaries((d) => d.filter((x) => x.id !== id));
  }

  return (
    <>
      <PageBackground
        variant="soft"
        bokeh={[
          { w: 300, top: "20%", left: "8%", color: "#FFD6E4", opacity: 0.4 },
          { w: 220, top: "70%", left: "82%", color: "#E8D8FF", opacity: 0.35 },
        ]}
        macarons={[]}
      />

      {/* Navbar */}
      <nav className="navbar">
        <div className="nav-logo">糖衣記憶 🍭</div>
        <div className="nav-right">
          <span className="nav-welcome">今天是她的好日子！♥</span>
          <span>首頁</span>
          <span>心靈聲音就是</span>
          <div className="nav-avatar">👤</div>
        </div>
      </nav>

      {/* Content grid */}
      <div className="relative z-10 mx-auto grid max-w-[1100px] grid-cols-1 gap-6 px-8 pb-12 pt-6 md:grid-cols-2">
        {/* Left: Memory River */}
        <div>
          <div className="section-header">左我的回憶草坪 ♣</div>

          {diaries.map((d) => (
            <div key={d.id}>
              <p className="date-label">{d.date}</p>
              <div className="diary-row">
                <div className="diary-dot" style={{ background: d.dot }} />
                <div className="diary-text">
                  <p className="diary-title">{d.title}</p>
                  <p className="diary-preview">{d.preview}</p>
                </div>
                <button className="delete-btn" onClick={() => handleDelete(d.id)}>
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Right: Cloud Editor */}
        <div>
          <div className="section-header">雲朵編輯器 ✐</div>

          <div className="editor-card">
            <input
              type="text"
              className="editor-title-input"
              placeholder="✏️ 今天記憶的標題：（如：週末的草莓鬆餅）"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <div className="editor-divider" />
            <textarea
              className="editor-body"
              placeholder={"在這裡傾訴今天的故事吧…\n\n把每個細節都寫下來，\n讓 AI 幫你萃取今日最甜的金句。"}
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />
            <div className="editor-footer">
              <button className="btn-ai" onClick={() => setModalOpen(true)}>
                AI智慧總結 →
              </button>
              <button className="btn-save">立即封存 🌸</button>
            </div>
          </div>
        </div>
      </div>

      <AISummaryModal open={modalOpen} onClose={() => setModalOpen(false)} />

      <style jsx>{`
        .navbar {
          position: sticky;
          top: 0;
          z-index: 20;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 32px;
          background: rgba(255, 245, 248, 0.88);
          backdrop-filter: blur(16px);
          border-bottom: 1px solid rgba(255, 183, 210, 0.25);
          box-shadow: 0 2px 16px rgba(255, 143, 171, 0.08);
        }
        .nav-logo {
          font-size: 18px;
          font-weight: 700;
          color: #7b4f7a;
          font-family: var(--font-noto-serif), serif;
        }
        .nav-right {
          display: flex;
          align-items: center;
          gap: 16px;
          font-size: 13px;
          color: #9b6fa0;
        }
        .nav-welcome {
          font-size: 13px;
          color: #b08ab0;
        }
        .nav-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: linear-gradient(135deg, #ffb3c6, #ff8fab);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
        }
        .section-header {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 15px;
          font-weight: 700;
          color: #5c3a6e;
          font-family: var(--font-noto-serif), serif;
          margin-bottom: 14px;
        }
        .date-label {
          font-size: 11px;
          color: #b08ab0;
          margin: 10px 0 6px;
          font-weight: 500;
        }
        .diary-row {
          display: flex;
          align-items: center;
          gap: 10px;
          background: rgba(255, 255, 255, 0.78);
          border: 1px solid rgba(255, 183, 210, 0.3);
          border-radius: 12px;
          padding: 10px 14px;
          margin-bottom: 6px;
          transition: box-shadow 0.2s;
        }
        .diary-row:hover {
          box-shadow: 0 4px 16px rgba(255, 143, 171, 0.12);
        }
        .diary-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          flex-shrink: 0;
        }
        .diary-text {
          flex: 1;
          min-width: 0;
        }
        .diary-title {
          font-size: 13px;
          font-weight: 600;
          color: #5c3a6e;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .diary-preview {
          font-size: 11px;
          color: #9b6fa0;
          margin-top: 2px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .delete-btn {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: #ff8fab;
          color: white;
          border: none;
          cursor: pointer;
          font-size: 11px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: all 0.18s;
        }
        .delete-btn:hover {
          background: #e8527a;
          transform: scale(1.1);
        }
        .editor-card {
          background: rgba(255, 255, 255, 0.75);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 183, 210, 0.3);
          border-radius: 20px;
          padding: 20px;
          height: 100%;
          display: flex;
          flex-direction: column;
        }
        .editor-title-input {
          width: 100%;
          background: transparent;
          border: none;
          outline: none;
          font-family: inherit;
          font-size: 14px;
          font-weight: 600;
          color: #5c3a6e;
          padding: 4px 0;
          margin-bottom: 8px;
        }
        .editor-title-input::placeholder {
          color: #c4a0c4;
          font-weight: 400;
        }
        .editor-divider {
          height: 1px;
          background: rgba(255, 183, 210, 0.4);
          margin-bottom: 12px;
        }
        .editor-body {
          flex: 1;
          width: 100%;
          background: transparent;
          border: none;
          outline: none;
          font-family: inherit;
          font-size: 13px;
          color: #6b4a7a;
          resize: none;
          line-height: 1.8;
          min-height: 220px;
        }
        .editor-body::placeholder {
          color: #c4a0c4;
        }
        .editor-footer {
          display: flex;
          gap: 10px;
          margin-top: 14px;
          justify-content: flex-end;
        }
        .btn-save {
          background: linear-gradient(135deg, #ff8fab, #ff6b9d);
          color: white;
          border: none;
          border-radius: 9999px;
          padding: 9px 20px;
          font-size: 13px;
          font-weight: 600;
          font-family: inherit;
          cursor: pointer;
          box-shadow: 0 4px 14px rgba(255, 107, 157, 0.35);
          transition: all 0.2s;
        }
        .btn-save:hover {
          filter: brightness(1.06);
        }
        .btn-ai {
          background: rgba(255, 255, 255, 0.7);
          border: 1px solid rgba(255, 143, 171, 0.4);
          color: #7b4f7a;
          border-radius: 9999px;
          padding: 9px 20px;
          font-size: 13px;
          font-weight: 500;
          font-family: inherit;
          cursor: pointer;
          transition: all 0.2s;
        }
        .btn-ai:hover {
          background: rgba(255, 255, 255, 0.9);
        }
      `}</style>
    </>
  );
}

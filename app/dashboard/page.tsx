"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import PageBackground from "@/components/PageBackground";
import Calendar, { toKey } from "@/components/Calendar";
import DiaryEditorModal, { EditorTarget } from "@/components/DiaryEditorModal";


type Diary = {
  id: number;
  date: string; // YYYY-MM-DD
  title: string;
  body: string;
  color: string;
};

const PALETTE = ["#FFB3C6", "#C9B8FF", "#B8E8D0", "#FFD6A0", "#FF8FAB"];

// 範例資料（純前端，重整會回到初始狀態）
const SAMPLE: Diary[] = [
  { id: 1, date: "2026-05-20", title: "週末的草莓鬆餅", body: "今天我一個人跑去了附近新開的咖啡廳，點了一份草莓鬆餅，奶油在嘴裡化開的瞬間覺得一切都值得了。", color: "#FFB3C6" },
  { id: 2, date: "2026-05-20", title: "傍晚的小確幸", body: "回家路上買了一束小雛菊，插在窗邊。", color: "#FFD6A0" },
  { id: 3, date: "2026-05-18", title: "雨後的傍晚散步", body: "和一隻流浪貓相遇，它的眼睛像是裝了整個傍晚。", color: "#C9B8FF" },
  { id: 4, date: "2026-05-15", title: "想念遠方的朋友", body: "翻到以前的合照，忽然好想念那些一起熬夜聊天的日子。", color: "#B8E8D0" },
  { id: 5, date: "2026-05-12", title: "那一天的蛋糕", body: "我一個、一個的把每個故事唱出來，走到最後才發現自己已經笑著哭了。", color: "#FFD6A0" },
];

export default function DashboardPage() {
  const [diaries, setDiaries] = useState<Diary[]>(SAMPLE);
  const [selectedDate, setSelectedDate] = useState(() => toKey(new Date()));
  const [editor, setEditor] = useState<EditorTarget | null>(null);

  const markedDates = useMemo(() => new Set(diaries.map((d) => d.date)), [diaries]);
  const dayList = useMemo(
    () => diaries.filter((d) => d.date === selectedDate),
    [diaries, selectedDate]
  );

  function handleSave(values: { title: string; body: string }) {
    if (!editor) return;
    if (editor.mode === "create") {
      setDiaries((prev) => [
        ...prev,
        {
          id: Date.now(),
          date: editor.date,
          title: values.title,
          body: values.body,
          color: PALETTE[prev.length % PALETTE.length],
        },
      ]);
    } else {
      setDiaries((prev) =>
        prev.map((d) =>
          d.id === editor.id ? { ...d, title: values.title, body: values.body } : d
        )
      );
    }
    setEditor(null);
  }

  function handleDelete(id: number) {
    setDiaries((prev) => prev.filter((d) => d.id !== id));
  }

  // 把 2025-05-20 顯示成 5 月 20 日
  const prettyDate = (() => {
    const [, m, d] = selectedDate.split("-");
    return `${Number(m)} 月 ${Number(d)} 日`;
  })();

  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // 點選單以外的地方就關閉
  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  function handleLogout() {
    setMenuOpen(false);
    router.push("/"); // 要改成回登入頁就換成 "/login"
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
          <div className="nav-welcome">歡迎回來，家菱！</div>
          <div className="avatar-wrap" ref={menuRef}>
          <button className="nav-avatar" onClick={() => setMenuOpen((v) => !v)} aria-label="帳號選單">
            👤
          </button>
          {menuOpen && (
            <div className="avatar-menu">
              <button className="menu-item" onClick={handleLogout}>
                登出
              </button>
            </div>
          )}
        </div>
        </div>
      </nav>

      {/* Content grid */}
      <div className="relative z-10 mx-auto grid w-[100%] grid-cols-1 gap-6 px-8 pb-12 pt-6 md:grid-cols-2">
        {/* Left: Calendar */}
        <div>
          <div className="section-header">回憶月曆 📅</div>
          <Calendar selected={selectedDate} onSelect={setSelectedDate} markedDates={markedDates} />
        </div>

        {/* Right: list for selected date */}
        <div>
          <div className="list-head">
            <div className="section-header" style={{ marginBottom: 0 }}>
              {prettyDate}的記憶 ♣
            </div>
            <button className="btn-add" onClick={() => setEditor({ mode: "create", date: selectedDate })}>
              ＋ 新增日記
            </button>
          </div>

          {dayList.length === 0 ? (
            <div className="empty">
              <div className="empty-emoji">🍰</div>
              <p>這天還沒有記憶喔，<br />點右上角「＋ 新增日記」寫下第一筆吧！</p>
            </div>
          ) : (
            dayList.map((d) => (
              <div
                key={d.id}
                className="diary-row"
                onClick={() =>
                  setEditor({ mode: "edit", id: d.id, date: d.date, title: d.title, body: d.body })
                }
              >
                <div className="diary-dot" style={{ background: d.color }} />
                <div className="diary-text">
                  <p className="diary-title">{d.title}</p>
                  <p className="diary-preview">{d.body}</p>
                </div>
                <button
                  className="delete-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(d.id);
                  }}
                >
                  ✕
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      <DiaryEditorModal target={editor} onClose={() => setEditor(null)} onSave={handleSave} />

      <style jsx>{`
        .navbar {
          position: sticky; top: 0; z-index: 20;
          display: flex; align-items: center; justify-content: space-between;
          padding: 12px 32px;
          background: rgba(255, 245, 248, 0.88);
          backdrop-filter: blur(16px);
          border-bottom: 1px solid rgba(255, 183, 210, 0.25);
          box-shadow: 0 2px 16px rgba(255, 143, 171, 0.08);
        }
        .nav-logo {
          font-size: 18px; font-weight: 700; color: #7b4f7a;
          font-family: var(--font-noto-serif), serif;
        }
        .nav-right { display: flex; align-items: center; gap: 16px; font-size: 13px; color: #9b6fa0; }
        .nav-welcome { font-size: 13px; color: #b08ab0; }
        .avatar-wrap { position: relative; }
        .nav-avatar {
          width: 32px; height: 32px; border-radius: 50%;
          background: linear-gradient(135deg, #ffb3c6, #ff8fab);
          display: flex; align-items: center; justify-content: center;
          font-size: 14px; border: none; cursor: pointer; padding: 0;
          transition: transform 0.15s;
        }
        .nav-avatar:hover { transform: scale(1.06); }
        .avatar-menu {
          position: absolute; top: 40px; right: 0; z-index: 30;
          min-width: 120px;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 183, 210, 0.4);
          border-radius: 12px; padding: 6px;
          box-shadow: 0 12px 32px rgba(255, 143, 171, 0.2);
          animation: menuIn 0.16s ease-out;
        }
        @keyframes menuIn {
          from { opacity: 0; transform: translateY(-4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .menu-item {
          width: 100%; text-align: left;
          background: none; border: none; cursor: pointer;
          padding: 8px 12px; border-radius: 8px;
          font-family: inherit; font-size: 13px; color: #7b4f7a;
          transition: background 0.15s;
        }
        .menu-item:hover { background: rgba(255, 143, 171, 0.14); }
        .section-header {
          display: flex; align-items: center; gap: 6px;
          font-size: 15px; font-weight: 700; color: #5c3a6e;
          font-family: var(--font-noto-serif), serif; margin-bottom: 14px;
        }
        .list-head {
          display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px;
        }
        .btn-add {
          background: linear-gradient(135deg, #ff8fab, #ff6b9d);
          color: white; border: none; border-radius: 9999px;
          padding: 8px 18px; font-size: 13px; font-weight: 600;
          font-family: inherit; cursor: pointer;
          box-shadow: 0 4px 14px rgba(255, 107, 157, 0.35); transition: all 0.2s;
        }
        .btn-add:hover { filter: brightness(1.06); transform: translateY(-1px); }
        .btn-add:active { transform: scale(0.97); }
        .diary-row {
          display: flex; align-items: center; gap: 10px;
          background: rgba(255, 255, 255, 0.78);
          border: 1px solid rgba(255, 183, 210, 0.3);
          border-radius: 12px; padding: 12px 14px; margin-bottom: 8px;
          cursor: pointer; transition: box-shadow 0.2s, transform 0.15s;
        }
        .diary-row:hover { box-shadow: 0 4px 16px rgba(255, 143, 171, 0.16); transform: translateY(-1px); }
        .diary-dot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; }
        .diary-text { flex: 1; min-width: 0; }
        .diary-title {
          font-size: 13px; font-weight: 600; color: #5c3a6e;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .diary-preview {
          font-size: 11px; color: #9b6fa0; margin-top: 2px;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .delete-btn {
          width: 22px; height: 22px; border-radius: 50%;
          background: #ff8fab; color: white; border: none; cursor: pointer; font-size: 11px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; transition: all 0.18s;
        }
        .delete-btn:hover { background: #e8527a; transform: scale(1.1); }
        .empty {
          background: rgba(255, 255, 255, 0.5);
          border: 1px dashed rgba(255, 143, 171, 0.4);
          border-radius: 16px; padding: 36px 20px; text-align: center;
          color: #b08ab0; font-size: 13px; line-height: 1.8;
        }
        .empty-emoji { font-size: 32px; margin-bottom: 10px; }
      `}</style>
    </>
  );
}
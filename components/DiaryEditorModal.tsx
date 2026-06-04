"use client";

import { useEffect, useState } from "react";

export type EditorTarget =
  | { mode: "create"; date: string }
  | { mode: "edit"; id: number; date: string; title: string; body: string };

export default function DiaryEditorModal({
  target,
  onClose,
  onSave,
}: {
  target: EditorTarget | null;
  onClose: () => void;
  onSave: (values: { title: string; body: string }) => void;
}) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    if (target?.mode === "edit") {
      setTitle(target.title);
      setBody(target.body);
    } else {
      setTitle("");
      setBody("");
    }
  }, [target]);

  if (!target) return null;

  function handleSave() {
    if (!title.trim()) return;
    onSave({ title: title.trim(), body });
  }

  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-head">
          <span className="modal-title">
            {target.mode === "create" ? "新增日記 🌸" : "編輯日記 ✏️"}
          </span>
          <span className="modal-date">{target.date}</span>
        </div>

        <input
          className="f-title"
          placeholder="✏️ 今天記憶的標題…"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          autoFocus
        />
        <div className="divider" />
        <textarea
          className="f-body"
          placeholder="在這裡傾訴今天的故事吧…"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />

        <div className="actions">
          <button className="btn-cancel" onClick={onClose}>取消</button>
          <button className="btn-confirm" onClick={handleSave} disabled={!title.trim()}>
            立即封存 🌸
          </button>
        </div>
      </div>

      <style jsx>{`
        .overlay {
          position: fixed; inset: 0; z-index: 40;
          background: rgba(180, 100, 140, 0.2);
          backdrop-filter: blur(12px);
          display: flex; align-items: center; justify-content: center;
          padding: 16px;
        }
        .modal {
          width: 100%; max-width: 420px;
          background: linear-gradient(160deg, #fff5f8 0%, #ffe8f0 60%, #fff0fa 100%);
          border-radius: 24px; padding: 26px;
          box-shadow: 0 32px 80px rgba(255, 107, 157, 0.25), 0 8px 32px rgba(0, 0, 0, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.9);
          animation: modalIn 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.9) translateY(16px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .modal-head {
          display: flex; align-items: baseline; justify-content: space-between;
          margin-bottom: 14px;
        }
        .modal-title {
          font-family: var(--font-noto-serif), serif;
          font-size: 17px; font-weight: 700; color: #3d1a4a;
        }
        .modal-date { font-size: 12px; color: #b08ab0; }
        .f-title {
          width: 100%;
          background: rgba(255, 255, 255, 0.6);
          border: 1px solid rgba(255, 143, 171, 0.25);
          border-radius: 12px; padding: 10px 14px; outline: none;
          font-family: inherit; font-size: 14px; font-weight: 600; color: #5c3a6e;
        }
        .f-title::placeholder { color: #c4a0c4; font-weight: 400; }
        .divider { height: 10px; }
        .f-body {
          width: 100%; min-height: 160px;
          background: rgba(255, 255, 255, 0.6);
          border: 1px solid rgba(255, 143, 171, 0.25);
          border-radius: 12px; padding: 12px 14px; outline: none; resize: vertical;
          font-family: inherit; font-size: 13px; line-height: 1.8; color: #6b4a7a;
        }
        .f-body::placeholder { color: #c4a0c4; }
        .actions {
          display: flex; justify-content: flex-end; gap: 10px; margin-top: 16px;
        }
        .btn-cancel {
          background: rgba(255, 255, 255, 0.7);
          border: 1px solid rgba(255, 143, 171, 0.4);
          color: #9b6fa0; border-radius: 9999px; padding: 9px 20px;
          font-size: 13px; font-family: inherit; cursor: pointer; transition: all 0.2s;
        }
        .btn-cancel:hover { background: rgba(255, 255, 255, 0.95); }
        .btn-confirm {
          background: linear-gradient(135deg, #ff8fab, #ff6b9d);
          color: white; border: none; border-radius: 9999px; padding: 9px 22px;
          font-size: 13px; font-weight: 600; font-family: inherit; cursor: pointer;
          box-shadow: 0 4px 14px rgba(255, 107, 157, 0.35); transition: all 0.2s;
        }
        .btn-confirm:hover { filter: brightness(1.06); }
        .btn-confirm:disabled { opacity: 0.55; cursor: not-allowed; }
      `}</style>
    </div>
  );
}
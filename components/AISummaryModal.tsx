"use client";

export default function AISummaryModal({
  open,
  onClose,
  mood = "幸福感滿溢",
  quote = "「糖衣下藏著最真實的自己，每一口甜，都是你選擇溫柔面對生活的痕跡。」",
  detail = "當你在午後的咖啡廳感受到那份短暫的滿足，AI 看見了你內心深處渴望被溫柔對待的小小心願。",
}: {
  open: boolean;
  onClose: () => void;
  mood?: string;
  quote?: string;
  detail?: string;
}) {
  if (!open) return null;

  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <span className="sp1">✦</span>
        <span className="sp2">✦</span>
        <span className="sp3">✦</span>

        <div className="icon-ring">🌸</div>

        <h2 className="mb-2.5 font-serif text-xl font-bold text-sugar-ink">
          今日的糖衣記憶已封存！🎉
        </h2>

        <div className="mood-tag">♥ 情緒：{mood}</div>

        <div className="quote-box">
          <p className="quote-label">AI 金句摘要</p>
          <p className="quote-text">
            {quote}
            <br />
            <br />
            {detail}
          </p>
        </div>

        <button className="btn-go" onClick={onClose}>
          立刻去總覽日記 &gt;
        </button>
      </div>

      <style jsx>{`
        .overlay {
          position: fixed;
          inset: 0;
          z-index: 40;
          background: rgba(180, 100, 140, 0.2);
          backdrop-filter: blur(12px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 16px;
        }
        .modal-card {
          width: 100%;
          max-width: 380px;
          background: linear-gradient(160deg, #fff5f8 0%, #ffe8f0 60%, #fff0fa 100%);
          border-radius: 28px;
          padding: 36px 32px;
          text-align: center;
          box-shadow: 0 32px 80px rgba(255, 107, 157, 0.25), 0 8px 32px rgba(0, 0, 0, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.9);
          animation: modalIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          position: relative;
        }
        @keyframes modalIn {
          from {
            opacity: 0;
            transform: scale(0.85) translateY(20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        @keyframes sp1 {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.7; }
          50% { transform: translate(5px, -7px) scale(1.3); opacity: 1; }
        }
        @keyframes sp2 {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.5; }
          50% { transform: translate(-6px, -5px) scale(1.4); opacity: 0.9; }
        }
        @keyframes sp3 {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.6; }
          50% { transform: translate(4px, 6px) scale(1.2); opacity: 0.9; }
        }
        .sp1 { position: absolute; top: -8px; right: 20px; font-size: 13px; animation: sp1 2.2s ease-in-out infinite; color: #ff8fab; }
        .sp2 { position: absolute; top: 6px; right: -4px; font-size: 10px; animation: sp2 2.8s ease-in-out infinite 0.4s; color: #ffb3c6; }
        .sp3 { position: absolute; top: -4px; left: 16px; font-size: 11px; animation: sp3 2.5s ease-in-out infinite 0.8s; color: #c9b8ff; }
        .icon-ring {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: linear-gradient(135deg, #ffb3c6, #ff8fab);
          box-shadow: 0 8px 24px rgba(255, 107, 157, 0.35);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 16px;
          font-size: 26px;
        }
        .mood-tag {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          background: linear-gradient(135deg, #ff8fab, #ff6b9d);
          color: white;
          padding: 5px 18px;
          border-radius: 9999px;
          font-size: 13px;
          font-weight: 600;
          margin-bottom: 20px;
          box-shadow: 0 3px 10px rgba(255, 107, 157, 0.3);
        }
        .quote-box {
          background: rgba(255, 255, 255, 0.65);
          border: 1px solid rgba(255, 183, 210, 0.4);
          border-radius: 16px;
          padding: 16px 18px;
          text-align: left;
          margin-bottom: 4px;
        }
        .quote-label {
          font-size: 10px;
          font-weight: 700;
          color: #b08ab0;
          letter-spacing: 0.08em;
          margin-bottom: 8px;
          text-transform: uppercase;
        }
        .quote-text {
          font-size: 13px;
          color: #5c3a6e;
          line-height: 1.8;
          font-style: italic;
        }
        .btn-go {
          width: 100%;
          margin-top: 20px;
          padding: 13px;
          background: linear-gradient(135deg, #ff8fab 0%, #ff6b9d 50%, #e85d9a 100%);
          color: white;
          border: none;
          border-radius: 14px;
          font-size: 14px;
          font-weight: 600;
          font-family: inherit;
          cursor: pointer;
          box-shadow: 0 6px 20px rgba(255, 107, 157, 0.4);
          transition: all 0.2s;
        }
        .btn-go:hover { filter: brightness(1.06); transform: translateY(-1px); }
        .btn-go:active { transform: scale(0.98); }
      `}</style>
    </div>
  );
}

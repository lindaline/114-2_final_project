"use client";

import { useState } from "react";

// 本地時區的 YYYY-MM-DD
export function toKey(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

const WEEKDAYS = ["日", "一", "二", "三", "四", "五", "六"];

export default function Calendar({
  selected,
  onSelect,
  markedDates,
}: {
  selected: string; // YYYY-MM-DD
  onSelect: (date: string) => void;
  markedDates: Set<string>; // 有日記的日期
}) {
  const init = selected ? new Date(selected + "T00:00:00") : new Date();
  const [viewYear, setViewYear] = useState(init.getFullYear());
  const [viewMonth, setViewMonth] = useState(init.getMonth()); // 0-11

  const firstDay = new Date(viewYear, viewMonth, 1);
  const startWeekday = firstDay.getDay(); // 0=Sun
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const todayKey = toKey(new Date());

  // 前面補空格 + 當月日期
  const cells: (number | null)[] = [];
  for (let i = 0; i < startWeekday; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  function prevMonth() {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else setViewMonth((m) => m - 1);
  }
  function nextMonth() {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else setViewMonth((m) => m + 1);
  }

  return (
    <div className="cal-card">
      <div className="cal-head">
        <button className="cal-nav" onClick={prevMonth} aria-label="上個月">‹</button>
        <div className="cal-title">{viewYear} 年 {viewMonth + 1} 月</div>
        <button className="cal-nav" onClick={nextMonth} aria-label="下個月">›</button>
      </div>

      <div className="cal-grid cal-weekdays">
        {WEEKDAYS.map((w) => (
          <div key={w} className="cal-weekday">{w}</div>
        ))}
      </div>

      <div className="cal-grid">
        {cells.map((d, i) => {
          if (d === null) return <div key={`e${i}`} />;
          const key = `${viewYear}-${String(viewMonth + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
          const isSelected = key === selected;
          const isToday = key === todayKey;
          const hasDiary = markedDates.has(key);
          return (
            <button
              key={key}
              className={`cal-day${isSelected ? " is-selected" : ""}${isToday ? " is-today" : ""}`}
              onClick={() => onSelect(key)}
            >
              <span>{d}</span>
              {hasDiary && <span className="cal-dot" />}
            </button>
          );
        })}
      </div>

      <style jsx>{`
        .cal-card {
          background: rgba(255, 255, 255, 0.75);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 183, 210, 0.3);
          border-radius: 20px;
          padding: 18px;
        }
        .cal-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 14px;
        }
        .cal-title {
          font-family: var(--font-noto-serif), serif;
          font-size: 15px;
          font-weight: 700;
          color: #5c3a6e;
        }
        .cal-nav {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          border: none;
          cursor: pointer;
          background: rgba(255, 143, 171, 0.12);
          color: #7b4f7a;
          font-size: 18px;
          line-height: 1;
          transition: all 0.18s;
        }
        .cal-nav:hover {
          background: rgba(255, 143, 171, 0.28);
        }
        .cal-grid {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 4px;
        }
        .cal-weekdays {
          margin-bottom: 4px;
        }
        .cal-weekday {
          text-align: center;
          font-size: 11px;
          color: #b08ab0;
          padding: 4px 0;
        }
        .cal-day {
          position: relative;
          aspect-ratio: 1;
          border: none;
          border-radius: 10px;
          background: transparent;
          cursor: pointer;
          font-size: 13px;
          color: #6b4a7a;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.15s;
        }
        .cal-day:hover {
          background: rgba(255, 143, 171, 0.14);
        }
        .cal-day.is-today {
          color: #e85d9a;
          font-weight: 700;
        }
        .cal-day.is-selected {
          background: linear-gradient(135deg, #ff8fab, #ff6b9d);
          color: white;
          font-weight: 600;
          box-shadow: 0 4px 12px rgba(255, 107, 157, 0.35);
        }
        .cal-dot {
          position: absolute;
          bottom: 5px;
          left: 50%;
          transform: translateX(-50%);
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: #ff6b9d;
        }
        .cal-day.is-selected .cal-dot {
          background: white;
        }
      `}</style>
    </div>
  );
}
import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { BookOpen, Clock3, Search, Sparkles, Star, Tag } from "lucide-react";
import atomicHabitsImage from "./assets/atomic-habits.jpg";
import "./styles.css";

const books = [
  {
    title: "原子習慣",
    author: "James Clear",
    category: "自我成長",
    mood: "想建立節奏",
    time: "15 分鐘片段",
    rating: 4.8,
    note: "把改變拆小，適合想重新整理生活節奏的人。",
    color: "#f1c66b",
    image: atomicHabitsImage,
  },
  {
    title: "被討厭的勇氣",
    author: "岸見一郎、古賀史健",
    category: "心理",
    mood: "想釐清關係",
    time: "週末慢讀",
    rating: 4.6,
    note: "用對話方式談自由、課題分離與自我接納。",
    color: "#62b6cb",
  },
  {
    title: "晶片戰爭",
    author: "Chris Miller",
    category: "商業科技",
    mood: "想理解世界",
    time: "通勤閱讀",
    rating: 4.7,
    note: "從半導體看權力、供應鏈與當代國際局勢。",
    color: "#7c88c7",
  },
  {
    title: "做工的人",
    author: "林立青",
    category: "文學社會",
    mood: "想貼近現實",
    time: "睡前一章",
    rating: 4.5,
    note: "溫柔而直接地看見勞動現場與人的尊嚴。",
    color: "#dc7b58",
  },
  {
    title: "槍炮、病菌與鋼鐵",
    author: "Jared Diamond",
    category: "歷史",
    mood: "想理解世界",
    time: "週末慢讀",
    rating: 4.4,
    note: "用宏觀視角追問文明發展差異從何而來。",
    color: "#9aa65f",
  },
  {
    title: "深度工作力",
    author: "Cal Newport",
    category: "自我成長",
    mood: "想專心做事",
    time: "15 分鐘片段",
    rating: 4.5,
    note: "給被通知和碎片時間切碎的人一套專注方法。",
    color: "#4f8b8c",
  },
  {
    title: "百年孤寂",
    author: "Gabriel Garcia Marquez",
    category: "小說",
    mood: "想進入故事",
    time: "週末慢讀",
    rating: 4.9,
    note: "家族、記憶與魔幻現實交織成一條壯闊長河。",
    color: "#b85c74",
  },
  {
    title: "人類大歷史",
    author: "Yuval Noah Harari",
    category: "歷史",
    mood: "想理解世界",
    time: "通勤閱讀",
    rating: 4.6,
    note: "把智人故事整理成一幅清楚又有爭議的全景圖。",
    color: "#738fba",
  },
];

const categories = ["全部", ...new Set(books.map((book) => book.category))];
const moods = ["全部心情", ...new Set(books.map((book) => book.mood))];

function App() {
  const [category, setCategory] = useState("全部");
  const [mood, setMood] = useState("全部心情");
  const [query, setQuery] = useState("");

  const filteredBooks = useMemo(() => {
    const keyword = query.trim().toLowerCase();
    return books.filter((book) => {
      const matchesCategory = category === "全部" || book.category === category;
      const matchesMood = mood === "全部心情" || book.mood === mood;
      const matchesQuery =
        !keyword ||
        `${book.title} ${book.author} ${book.note}`.toLowerCase().includes(keyword);
      return matchesCategory && matchesMood && matchesQuery;
    });
  }, [category, mood, query]);

  const topPick = filteredBooks[0] ?? books[0];

  return (
    <main>
      <section className="intro">
        <div className="intro-copy">
          <p className="eyebrow">
            <Sparkles size={16} /> 推薦書單
          </p>
          <h1>下一本書，從現在的心情開始。</h1>
          <p className="lede">
            挑一個分類、選一種閱讀狀態，快速找到適合通勤、睡前或週末慢慢讀的書。
          </p>
        </div>
        <aside className="spotlight" aria-label="本次推薦">
          <span className="spotlight-label">此刻首選</span>
          <h2>{topPick.title}</h2>
          <p>{topPick.note}</p>
          <div className="spotlight-meta">
            <span>{topPick.category}</span>
            <span>{topPick.time}</span>
          </div>
        </aside>
      </section>

      <section className="controls" aria-label="篩選書單">
        <label className="search-box">
          <Search size={18} />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="搜尋書名、作者或關鍵字"
          />
        </label>
        <div className="select-row">
          <label>
            <Tag size={16} />
            <select value={category} onChange={(event) => setCategory(event.target.value)}>
              {categories.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
          <label>
            <BookOpen size={16} />
            <select value={mood} onChange={(event) => setMood(event.target.value)}>
              {moods.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
        </div>
      </section>

      <section className="book-grid" aria-live="polite">
        {filteredBooks.map((book) => (
          <article className="book-card" key={book.title}>
            {book.image ? (
              <div className="book-cover image-cover">
                <img src={book.image} alt={`${book.title}封面`} />
              </div>
            ) : (
              <div className="book-cover" style={{ "--cover": book.color }}>
                <span>{book.category}</span>
                <strong>{book.title}</strong>
              </div>
            )}
            <div className="book-info">
              <div>
                <h3>{book.title}</h3>
                <p className="author">{book.author}</p>
              </div>
              <p>{book.note}</p>
              <div className="book-meta">
                <span>
                  <Star size={15} fill="currentColor" /> {book.rating}
                </span>
                <span>
                  <Clock3 size={15} /> {book.time}
                </span>
              </div>
            </div>
          </article>
        ))}
      </section>

      {filteredBooks.length === 0 && (
        <section className="empty">
          <h2>暫時沒有符合的書</h2>
          <p>換個關鍵字或放寬篩選，書架會重新打開。</p>
        </section>
      )}
    </main>
  );
}

createRoot(document.getElementById("root")).render(<App />);

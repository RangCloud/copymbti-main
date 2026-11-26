import types, { typeCodes } from '../data/types';

export default function Gallery({ onSelect, onHome }) {
  return (
    <section className="gallery">
      <button className="home-link dark" onClick={onHome}>
        🏠 처음으로
      </button>
      <h1 className="gallery-title">16가지 유형 도감 📚</h1>
      <p className="start-sub">궁금한 유형을 눌러보세요!</p>
      <div className="gallery-grid">
        {typeCodes.map((c) => (
          <button key={c} className="gcard" style={{ '--type-color': types[c].color }} onClick={() => onSelect(c)}>
            <span className="gcard-emoji">{types[c].emoji}</span>
            <span className="gcard-code">{c}</span>
            <span className="gcard-fun">{types[c].funTitle}</span>
          </button>
        ))}
      </div>
    </section>
  );
}

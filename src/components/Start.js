import mbtiImg from '../freeImg/mbti.png';
import { dimensions } from '../data/functions';

export default function Start({ onStart, onGallery, total }) {
  return (
    <section className="start">
      <div className="start-badge">✨ 3분이면 끝! ✨</div>
      <h1 className="start-title">
        나는 어떤
        <br />
        <span>MBTI</span>일까?
      </h1>
      <img className="start-logo" src={mbtiImg} alt="MBTI" />
      <p className="start-sub">
        {total}개의 질문으로 알아보는 유쾌한 성격유형 테스트
        <br />
        정답은 없어요. 평소의 나와 가까운 쪽을 골라주세요!
      </p>

      <button className="btn btn-primary btn-big" onClick={onStart}>
        테스트 시작하기 🚀
      </button>
      <button className="btn btn-ghost" onClick={onGallery}>
        16가지 유형 둘러보기 📚
      </button>

      <div className="card dims">
        <h2>MBTI의 4가지 선호지표</h2>
        {dimensions.map((d) => (
          <div className="dim-row" key={d.key}>
            <div className="dim-letters">
              <b>{d.left.code}</b> {d.left.name} <span>vs</span> <b>{d.right.code}</b> {d.right.name}
            </div>
            <div className="dim-title">{d.title}</div>
            <div className="dim-desc">{d.desc}</div>
          </div>
        ))}
        <p className="note">
          MBTI는 능력이나 우열이 아니라 <b>"선호"</b>를 알려줘요. 누구나 양쪽을 다 쓰지만, 더 편하고 자연스러운
          쪽이 있을 뿐이에요.
        </p>
      </div>
    </section>
  );
}

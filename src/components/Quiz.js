export default function Quiz({ question, index, total, onAnswer, onBack }) {
  const progress = Math.round((index / total) * 100);

  return (
    <section className="quiz">
      <header className="quiz-head">
        <button className="back" onClick={onBack} aria-label="이전으로">
          ←
        </button>
        <div className="quiz-count">
          <b>{index + 1}</b> / {total}
        </div>
        <div className="back-spacer" />
      </header>
      <div className="progress">
        <div className="progress-bar" style={{ width: `${progress}%` }} />
      </div>

      {/* key로 문항이 바뀔 때마다 애니메이션 재실행 */}
      <div className="quiz-body" key={index}>
        <div className="q-num">Q{index + 1}.</div>
        <h2 className="q-text">
          {question.q.split('\n').map((line, i) => (
            <span key={i}>
              {line}
              <br />
            </span>
          ))}
        </h2>
        <div className="answers">
          {question.a.map((a) => (
            <button key={a.type} className="answer" onClick={() => onAnswer(a.type)}>
              {a.text}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

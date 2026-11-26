import { useEffect, useState } from 'react';
import './App.css';
import questions from './data/questions';
import { calcResult, isValidType } from './utils/mbti';
import Start from './components/Start';
import Quiz from './components/Quiz';
import Loading from './components/Loading';
import Result from './components/Result';
import Gallery from './components/Gallery';

const LOADING_MS = 2800;

function readTypeFromUrl() {
  const t = new URLSearchParams(window.location.search).get('type');
  return isValidType(t) ? t.toUpperCase() : null;
}

function setTypeInUrl(code) {
  const url = new URL(window.location.href);
  if (code) url.searchParams.set('type', code);
  else url.searchParams.delete('type');
  window.history.replaceState(null, '', url);
}

function App() {
  // view: start | quiz | loading | result | gallery
  const sharedType = readTypeFromUrl();
  const [view, setView] = useState(sharedType ? 'result' : 'start');
  const [answers, setAnswers] = useState([]);
  // result: { code, scores } — 공유 링크/도감에서 들어오면 scores 없음
  const [result, setResult] = useState(sharedType ? { code: sharedType, scores: null, shared: true } : null);

  useEffect(() => {
    document.title = 'MBTI 유쾌한 성격 테스트';
    const setVh = () => {
      document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
    };
    setVh();
    window.addEventListener('resize', setVh);
    return () => window.removeEventListener('resize', setVh);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view, result]);

  const startQuiz = () => {
    setAnswers([]);
    setResult(null);
    setTypeInUrl(null);
    setView('quiz');
  };

  const handleAnswer = (type) => {
    const next = [...answers, type];
    setAnswers(next);
    if (next.length === questions.length) {
      const r = calcResult(next);
      setResult(r);
      setView('loading');
      setTimeout(() => {
        setTypeInUrl(r.code);
        setView('result');
      }, LOADING_MS);
    }
  };

  const handleBack = () => {
    if (answers.length === 0) {
      setView('start');
      return;
    }
    setAnswers(answers.slice(0, -1));
  };

  const showType = (code) => {
    setResult({ code, scores: null, shared: true });
    setTypeInUrl(code);
    setView('result');
  };

  const goHome = () => {
    setTypeInUrl(null);
    setView('start');
  };

  return (
    <div className="app">
      <main className="frame">
        {view === 'start' && <Start onStart={startQuiz} onGallery={() => setView('gallery')} total={questions.length} />}
        {view === 'quiz' && (
          <Quiz
            question={questions[answers.length]}
            index={answers.length}
            total={questions.length}
            onAnswer={handleAnswer}
            onBack={handleBack}
          />
        )}
        {view === 'loading' && <Loading />}
        {view === 'result' && result && (
          <Result
            result={result}
            onRestart={startQuiz}
            onGallery={() => setView('gallery')}
            onShowType={showType}
            onHome={goHome}
          />
        )}
        {view === 'gallery' && <Gallery onSelect={showType} onHome={goHome} />}
      </main>
    </div>
  );
}

export default App;

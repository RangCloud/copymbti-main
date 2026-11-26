import { useEffect, useState } from 'react';
import ghostImg from '../freeImg/ghost-8250317_1280.png';

const MESSAGES = [
  '당신의 인싸력을 측정하는 중… 📡',
  '상상력 게이지 충전 중… 🌈',
  'T와 F 사이에서 고민하는 중… 🤔',
  '계획표를 짤까 말까 고민 중… 📋',
  '결과를 예쁘게 포장하는 중… 🎁',
];

export default function Loading() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % MESSAGES.length), 600);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="loading">
      <img className="loading-img" src={ghostImg} alt="" />
      <p className="loading-msg">{MESSAGES[i]}</p>
      <div className="dots">
        <span />
        <span />
        <span />
      </div>
    </section>
  );
}

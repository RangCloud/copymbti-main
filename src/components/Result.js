import { useState } from 'react';
import types, { typeCodes } from '../data/types';
import { dimensions, functionInfo, inferiorStress } from '../data/functions';
import { getFunctionStack, oppositeType } from '../utils/mbti';

const LETTER_NAME = { E: '외향', I: '내향', S: '감각', N: '직관', T: '사고', F: '감정', J: '판단', P: '인식' };
const PROCESS_NAME = { S: '감각(S)', N: '직관(N)', T: '사고(T)', F: '감정(F)' };

const koreaRank = [...typeCodes].sort((a, b) => types[b].korea - types[a].korea);

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (e) {
    const ta = document.createElement('textarea');
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand('copy');
    document.body.removeChild(ta);
    return ok;
  }
}

export default function Result({ result, onRestart, onGallery, onShowType, onHome }) {
  const { code, scores, shared } = result;
  const t = types[code];
  const stack = getFunctionStack(code);
  const opp = oppositeType(code);
  const rank = koreaRank.indexOf(code) + 1;
  const [copied, setCopied] = useState(false);

  const share = async () => {
    const url = `${window.location.origin}${window.location.pathname}?type=${code}`;
    const text = `나의 MBTI는 ${code} "${t.funTitle}" ${t.emoji}\n너도 해봐! ${url}`;
    if (navigator.share) {
      try {
        await navigator.share({ title: 'MBTI 유쾌한 성격 테스트', text, url });
        return;
      } catch (e) {
        // 사용자가 취소한 경우 등 → 복사로 대체
      }
    }
    if (await copyText(text)) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section className="result" style={{ '--type-color': t.color }}>
      <div className="hero">
        <button className="home-link" onClick={onHome}>
          🏠 처음으로
        </button>
        <div className="hero-label">{shared ? '유형 소개' : '당신의 MBTI는'}</div>
        <div className="hero-emoji">{t.emoji}</div>
        <div className="hero-code">
          {code.split('').map((c, i) => (
            <span key={i} title={LETTER_NAME[c]}>
              {c}
            </span>
          ))}
        </div>
        <div className="hero-fun">"{t.funTitle}"</div>
        <div className="hero-letters">{code.split('').map((c) => LETTER_NAME[c]).join(' · ')}</div>
      </div>

      {scores && (
        <div className="card">
          <h3>📊 나의 선호 경향</h3>
          {scores.map((s, i) => {
            const d = dimensions[i];
            return (
              <div className="score" key={d.key}>
                <div className="score-labels">
                  <span className={s.winner === s.left ? 'on' : ''}>
                    {d.left.code} {d.left.name} {s.leftPct}%
                  </span>
                  <span className={s.winner === s.right ? 'on' : ''}>
                    {s.rightPct}% {d.right.name} {d.right.code}
                  </span>
                </div>
                <div className="score-track">
                  <div className="score-left" style={{ width: `${s.leftPct}%` }} />
                </div>
              </div>
            );
          })}
          <p className="note">
            50%에 가까운 지표는 양쪽을 비슷하게 쓰는 편이라는 뜻이에요. 이 경우 반대 글자 유형의 설명도 함께
            읽어보세요.
          </p>
        </div>
      )}

      <div className="card">
        <h3>📖 {code}는 이런 사람이에요</h3>
        <p className="summary">{t.summary}</p>
        <ul className="traits">
          {t.traits.map((x, i) => (
            <li key={i}>{x}</li>
          ))}
        </ul>
        <p className="source">출처: Myers &amp; Briggs Foundation 공식 16유형 설명을 바탕으로 정리</p>
      </div>

      <div className="card fun">
        <h3>🤣 이럴 때 완전 {code}</h3>
        <ul className="fun-list">
          {t.funMoments.map((x, i) => (
            <li key={i}>{x}</li>
          ))}
        </ul>
        <p className="source">재미로 보는 공감 포인트예요. 같은 유형이라도 사람마다 다를 수 있어요!</p>
      </div>

      <div className="grid2">
        <div className="card">
          <h3>💪 강점</h3>
          <div className="chips">
            {t.strengths.map((x) => (
              <span className="chip" key={x}>
                {x}
              </span>
            ))}
          </div>
        </div>
        <div className="card">
          <h3>🌱 성장 포인트</h3>
          <ul className="traits small">
            {t.growth.map((x, i) => (
              <li key={i}>{x}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="card">
        <h3>🧠 심리기능 (Type Dynamics)</h3>
        <p className="note top">
          MBTI 이론에서는 유형마다 가장 자주, 편하게 쓰는 마음의 기능 순서가 정해져 있어요.
        </p>
        <FnRow rank="주기능" fn={stack.dominant} desc="가장 발달되어 있고 가장 믿고 쓰는 기능" />
        <FnRow rank="부기능" fn={stack.auxiliary} desc="주기능을 보완하며 균형을 잡아주는 기능" />
        <div className="fn-row">
          <div className="fn-rank">3차기능</div>
          <div className="fn-body">
            <div className="fn-name">{PROCESS_NAME[stack.tertiaryLetter]}</div>
            <div className="fn-desc">부기능의 반대 기능으로, 보통 덜 발달되어 있어요.</div>
          </div>
        </div>
        <FnRow rank="열등기능" fn={stack.inferior} desc="가장 덜 의식되는 기능" />
        <div className="stress">
          <b>😵 스트레스 경보</b>
          <p>{inferiorStress[stack.inferior]}</p>
          <p className="source">"평소의 내가 아닌 것 같은" 모습은 열등기능 때문일 수 있어요. 충분히 쉬면 돌아와요.</p>
        </div>
      </div>

      <div className="card">
        <h3>🇰🇷 한국에서 {code}는?</h3>
        <div className="korea">
          <div className="korea-big">{t.korea}%</div>
          <div>
            16개 유형 중 <b>{rank}번째</b>로 많은 유형이에요.
            {rank <= 3 && ' 어딜 가나 동지를 만날 수 있어요!'}
            {rank >= 14 && ' 꽤 희귀한 유형이에요! 🦄'}
          </div>
        </div>
        <div className="korea-chart">
          {koreaRank.map((c) => (
            <button
              key={c}
              className={`kbar ${c === code ? 'me' : ''}`}
              onClick={() => onShowType(c)}
              title={`${c} ${types[c].korea}%`}
            >
              <span className="kbar-code">{c}</span>
              <span className="kbar-track">
                <span className="kbar-fill" style={{ width: `${(types[c].korea / 13) * 100}%` }} />
              </span>
              <span className="kbar-pct">{types[c].korea}%</span>
            </button>
          ))}
        </div>
        <p className="source">
          출처: 어세스타, 한국인 전국대표표본(2012~2020년 MBTI Form M 응시자 19,070명) 기반 유형 분포 — 송미리 외
          (2021), 「심리유형과 인간발달」 22(2)
        </p>
      </div>

      <div className="card">
        <h3>🔁 더 알아보기</h3>
        <p className="alias">
          16Personalities에서는 <b>'{t.alias16p}'</b>라고 불러요.
          <br />
          <span className="source">
            ※ 16Personalities는 MBTI의 네 글자 표기를 빌려 쓰지만, 빅파이브(Big Five) 기반의 별도 성격 모델이에요.
          </span>
        </p>
        <button className="btn btn-ghost full" onClick={() => onShowType(opp)}>
          정반대 유형 {opp} {types[opp].emoji} 구경하기
        </button>
      </div>

      <div className="actions">
        <button className="btn btn-primary" onClick={share}>
          {copied ? '복사 완료! 📋' : '결과 공유하기 🔗'}
        </button>
        <button className="btn btn-dark" onClick={onRestart}>
          {shared ? '나도 테스트하기 🚀' : '다시 하기 🔄'}
        </button>
        <button className="btn btn-ghost" onClick={onGallery}>
          16유형 도감 📚
        </button>
      </div>

      <div className="disclaimer">
        이 테스트는 재미로 즐기는 <b>비공식 약식 테스트</b>예요. 정식 MBTI® 검사(Form M/Q)는 국내 판권사인
        어세스타를 통해 전문 자격을 갖춘 사람의 해석과 함께 받을 수 있어요. MBTI는 능력·우열을 나타내지 않으며,
        최종 유형은 결과를 보고 <b>스스로 가장 잘 맞는다고 느끼는 유형</b>(best-fit type)으로 정하는 것이
        원칙이에요.
        <br />
        MBTI is a registered trademark of The Myers &amp; Briggs Foundation.
      </div>
    </section>
  );
}

function FnRow({ rank, fn, desc }) {
  const info = functionInfo[fn];
  return (
    <div className="fn-row">
      <div className="fn-rank">{rank}</div>
      <div className="fn-body">
        <div className="fn-name">
          {info.name} <span className="fn-code">{fn}</span>
        </div>
        <div className="fn-desc">
          {desc} — {info.desc}
        </div>
      </div>
    </div>
  );
}

import { typeCodes } from '../data/types';

const PAIRS = [
  ['E', 'I'],
  ['S', 'N'],
  ['T', 'F'],
  ['J', 'P'],
];

// answers: ['E', 'N', 'T', ...] 처럼 선택한 선호 글자 배열
// 반환: { code: 'ENTP', scores: [{ left:'E', right:'I', leftPct: 60, rightPct: 40 }, ...] }
export function calcResult(answers) {
  const count = {};
  answers.forEach((t) => {
    count[t] = (count[t] || 0) + 1;
  });

  let code = '';
  const scores = PAIRS.map(([l, r]) => {
    const lc = count[l] || 0;
    const rc = count[r] || 0;
    const total = lc + rc || 1;
    // 지표별 문항 수가 홀수라 동점이 생기지 않지만, 혹시 모를 동점 시 공식 채점 관례(I, N, F, P)를 따름
    const winner = lc > rc ? l : r;
    code += winner;
    const leftPct = Math.round((lc / total) * 100);
    return { left: l, right: r, leftPct, rightPct: 100 - leftPct, winner };
  });

  return { code, scores };
}

export function isValidType(code) {
  return typeof code === 'string' && typeCodes.includes(code.toUpperCase());
}

// MBTI Type Dynamics 규칙으로 심리기능 순서를 계산
//  1) J/P는 "외부 세계에서 쓰는(외향화된) 기능"을 알려줌
//     J → 판단기능(T/F)이 외향,  P → 인식기능(S/N)이 외향
//  2) E형은 외향화된 기능이 주기능, I형은 내향화된 기능이 주기능
//  3) 부기능은 주기능과 반대 태도(E/I)의 나머지 기능
//  4) 3차기능은 부기능의 반대 기능, 열등기능은 주기능의 반대 기능(반대 태도)
const OPPOSITE = { S: 'N', N: 'S', T: 'F', F: 'T' };

export function getFunctionStack(code) {
  const [ei, sn, tf, jp] = code.split('');
  const extravertedFn = jp === 'J' ? tf : sn;
  const introvertedFn = jp === 'J' ? sn : tf;

  const dominant = ei === 'E' ? extravertedFn + 'e' : introvertedFn + 'i';
  const auxiliary = ei === 'E' ? introvertedFn + 'i' : extravertedFn + 'e';

  const tertiaryLetter = OPPOSITE[auxiliary[0]];
  const inferior = OPPOSITE[dominant[0]] + (dominant[1] === 'e' ? 'i' : 'e');

  return { dominant, auxiliary, tertiaryLetter, inferior };
}

export function oppositeType(code) {
  const map = { E: 'I', I: 'E', S: 'N', N: 'S', T: 'F', F: 'T', J: 'P', P: 'J' };
  return code
    .split('')
    .map((c) => map[c])
    .join('');
}

import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import questions from './data/questions';
import types, { typeCodes } from './data/types';
import { calcResult, getFunctionStack } from './utils/mbti';

test('시작 화면이 렌더링된다', () => {
  render(<App />);
  expect(screen.getByText(/테스트 시작하기/)).toBeInTheDocument();
});

test('문항은 지표별 5개씩(홀수) 총 20개이고, 각 문항은 해당 지표의 두 글자를 하나씩 가진다', () => {
  expect(questions).toHaveLength(20);
  ['EI', 'SN', 'TF', 'JP'].forEach((dim) => {
    const qs = questions.filter((q) => q.dim === dim);
    expect(qs).toHaveLength(5);
    qs.forEach((q) => {
      expect(q.a.map((a) => a.type).sort()).toEqual(dim.split('').sort());
    });
  });
});

test('결과 계산: 마지막 답변까지 반영된다', () => {
  const answers = questions.map((q) => q.a.find((a) => 'ENFP'.includes(a.type)).type);
  const r = calcResult(answers);
  expect(r.code).toBe('ENFP');
  expect(r.scores[0]).toMatchObject({ leftPct: 100, rightPct: 0 });
});

test('심리기능 순서가 Myers & Briggs Foundation Type Dynamics 표와 일치한다', () => {
  const official = {
    ISTJ: ['Si', 'Te'], ISFJ: ['Si', 'Fe'], INFJ: ['Ni', 'Fe'], INTJ: ['Ni', 'Te'],
    ISTP: ['Ti', 'Se'], ISFP: ['Fi', 'Se'], INFP: ['Fi', 'Ne'], INTP: ['Ti', 'Ne'],
    ESTP: ['Se', 'Ti'], ESFP: ['Se', 'Fi'], ENFP: ['Ne', 'Fi'], ENTP: ['Ne', 'Ti'],
    ESTJ: ['Te', 'Si'], ESFJ: ['Fe', 'Si'], ENFJ: ['Fe', 'Ni'], ENTJ: ['Te', 'Ni'],
  };
  Object.entries(official).forEach(([code, [dom, aux]]) => {
    const s = getFunctionStack(code);
    expect([s.dominant, s.auxiliary]).toEqual([dom, aux]);
  });
  expect(getFunctionStack('ISTJ')).toMatchObject({ tertiaryLetter: 'F', inferior: 'Ne' });
  expect(getFunctionStack('ENFP')).toMatchObject({ tertiaryLetter: 'T', inferior: 'Si' });
});

test('16개 유형 데이터가 모두 있고 한국인 분포 합계가 약 100%다', () => {
  expect(typeCodes).toHaveLength(16);
  typeCodes.forEach((c) => expect(types[c]).toBeDefined());
  const sum = typeCodes.reduce((acc, c) => acc + types[c].korea, 0);
  expect(sum).toBeGreaterThan(99.5);
  expect(sum).toBeLessThan(100.5);
});

test('20문항을 끝까지 풀면 로딩 화면으로 넘어간다', () => {
  render(<App />);
  fireEvent.click(screen.getByText(/테스트 시작하기/));
  questions.forEach((q) => {
    fireEvent.click(screen.getByText(q.a[0].text));
  });
  expect(screen.getByText(/중…/)).toBeInTheDocument();
});

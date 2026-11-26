# MBTI 유쾌한 성격 테스트

20문항으로 알아보는 유쾌한 MBTI 성격유형 테스트입니다.
처음에는 [이 강의](https://www.youtube.com/watch?v=BsSZ5EbekI8)를 보고 만든 12문항 테스트였고, 이를 확장했습니다.

## 주요 기능

- **20문항 테스트**: 지표(E/I, S/N, T/F, J/P)마다 5문항씩 배치해 동점이 나오지 않습니다.
  - 답변 순서를 섞어 "첫 번째 답 = 항상 E" 같은 패턴이 생기지 않게 했습니다.
  - 이전 문항으로 돌아갈 수 있고, 진행률 막대가 표시됩니다.
- **결과 페이지**
  - 지표별 선호 경향(%) 막대
  - 공식 유형 설명을 바탕으로 정리한 특징
  - 심리기능 4단계(주기능 · 부기능 · 3차기능 · 열등기능)와 스트레스 상황에서 나타나는 모습
  - 한국인 유형 분포와 내 유형의 순위
  - 재미용 별명, 공감 포인트, 강점과 성장 포인트
  - 정반대 유형 보기, 결과 공유(`?type=ENFP` 형태의 링크)
- **16유형 도감**: 16가지 유형을 모두 둘러볼 수 있습니다.

## 실행 방법

```bash
npm install
npm start      # 개발 서버 (http://localhost:3000)
npm test       # 테스트
npm run build  # 배포용 빌드
```

## 프로젝트 구조

```
src/
├── App.js                 # 화면 전환(시작/퀴즈/로딩/결과/도감)
├── App.css
├── components/            # Start, Quiz, Loading, Result, Gallery
├── data/
│   ├── questions.js       # 20문항
│   ├── types.js           # 16유형 정보
│   └── functions.js       # 선호지표 · 심리기능 · 열등기능 설명
└── utils/mbti.js          # 결과 계산, 심리기능 순서 계산
```

## 정보 출처

결과 화면의 정보는 아래 출처를 바탕으로 작성했습니다.
재미용으로 덧붙인 내용은 화면과 코드에 "재미용"이라고 따로 표시했습니다.

### 1. 선호지표 정의와 해석 원칙

- The Myers & Briggs Foundation, [Myers-Briggs Overview](https://www.myersbriggs.org/my-mbti-personality-type/myers-briggs-overview/)
  - 4가지 선호지표(E/I, S/N, T/F, J/P)의 정의
  - 해석 원칙
    - MBTI는 능력이나 우열이 아니라 선호를 나타냅니다.
    - 16가지 유형은 모두 동등하게 가치 있습니다.
    - 최종 유형은 본인이 가장 잘 맞는다고 확인한 유형(best-fit type)으로 정합니다.
  - 사용한 곳: `src/data/functions.js`의 `dimensions`, 시작 화면의 안내 문구, 결과 화면 하단의 고지문

### 2. 16가지 유형 설명

- The Myers & Briggs Foundation, [The 16 MBTI® Personality Types](https://www.myersbriggs.org/my-mbti-personality-type/the-16-mbti-personality-types/)
  - 유형별 공식 설명을 한국어로 옮겨 정리했습니다.
  - 사용한 곳: `src/data/types.js`의 `summary`, `traits`

### 3. 심리기능 순서 (Type Dynamics)

- The Myers & Briggs Foundation, [Type Dynamics Overview](https://www.myersbriggs.org/unique-features-of-myers-briggs/type-dynamics-overview/)
  - 첫 글자(E/I)와 마지막 글자(J/P)로 주기능과 부기능을 정하는 규칙
  - 3차기능은 부기능의 반대 기능이고, 열등기능은 주기능의 반대 기능입니다.
  - 16유형별 주기능과 부기능 표 (`src/App.test.js`에서 이 공식 표와 계산 결과가 같은지 검증합니다.)
  - 3차기능의 태도(외향/내향)는 공식 자료에서도 정해져 있지 않다고 설명합니다. 그래서 글자(S/N/T/F)만 표시합니다.
  - 사용한 곳: `src/utils/mbti.js`의 `getFunctionStack`, `src/data/functions.js`의 `functionInfo`
- 열등기능이 스트레스 상황에서 드러나는 모습("in the grip")
  - Naomi L. Quenk, *Was That Really Me? How Everyday Stress Brings Out Our Hidden Personality* (2nd ed., Nicholas Brealey/CPP, 2002)
  - 이 책의 내용을 요약했습니다.
  - 사용한 곳: `src/data/functions.js`의 `inferiorStress`

### 4. 한국인 유형 분포

- 송미리·박보민·강새하늘·김명준 (2021). 「한국인 대표 표본의 MBTI 유형 분포 연구: 2012-2020년 자료를 바탕으로」. *심리유형과 인간발달*, 22(2), 19-41. 한국심리유형학회. DOI: [10.52745/KAPT.2021.22.2.19](https://doi.org/10.52745/KAPT.2021.22.2.19) ([KCI](https://www.kci.go.kr/kciportal/ci/sereArticleSearch/ciSereArtiView.kci?sereArticleSearchBean.artiId=ART002774773))
  - 표본: 2012~2020년 MBTI Form M 응시자 19,070명
  - 표집 방식: 연령과 성별 비율을 대한민국 인구와 같게 맞춘 비례층화표집 (16~59세)
  - 결과: ISTJ가 가장 많고 INFJ가 가장 적습니다.
- 유형별 비율(%)은 어세스타 자료를 인용한 언론 보도 수치를 사용했습니다.
  - [인사이트, 2023.01.07](https://www.insight.co.kr/news/425441)
  - 16개 유형의 합은 99.9%입니다.
  - 논문의 결과(ISTJ 최다, INFJ 최소)와 일치합니다.
  - 사용한 곳: `src/data/types.js`의 `korea`

### 5. 16Personalities 별명 (참고용)

- 16Personalities, [Our Theory](https://www.16personalities.com/articles/our-theory)
  - "전략가", "중재자" 같은 별명은 16Personalities의 이름입니다.
  - 16Personalities는 MBTI의 네 글자 표기를 빌려 쓰지만 빅파이브(Big Five)를 기반으로 한 별도의 모델입니다. 인지기능 개념도 쓰지 않는다고 스스로 밝히고 있습니다.
  - 국내에서 많이 쓰여서 참고용으로만 표시하고, 이 점을 결과 화면에 안내합니다.
  - 사용한 곳: `src/data/types.js`의 `alias16p`

### 6. 정식 검사 안내

- 어세스타(ASSESTA), https://www.assesta.com
  - 국내 MBTI® 판권사이자 정식 보급기관입니다.
  - 결과 화면에서 정식 검사(Form M/Q)는 이곳을 통해 받을 수 있다고 안내합니다.

### 재미용 콘텐츠 (공식 정보 아님)

- 다음 항목은 이 사이트에서 재미를 위해 직접 작성했습니다.
  - 퀴즈 문항의 상황 설정
  - 유형별 재미 별명(`funTitle`)
  - "이럴 때 완전 OOOO" 공감 포인트(`funMoments`)
  - 로딩 문구
- 다만 퀴즈 문항은 1번 항목의 공식 선호지표 정의에 맞춰 작성했습니다.
  - E/I: 에너지의 방향
  - S/N: 정보를 받아들이는 방식
  - T/F: 결정을 내리는 방식
  - J/P: 바깥 세계를 대하는 방식
- 강점과 성장 포인트(`strengths`, `growth`)는 공식 유형 설명과 심리기능 이론을 바탕으로 요약했습니다.

### 이미지

- `src/freeImg/` 안의 이미지는 원본 프로젝트에 들어 있던 무료 이미지입니다 (Pixabay 등).

## 고지

이 테스트는 재미로 즐기는 **비공식 약식 테스트**이며, 정식 MBTI® 검사를 대신하지 않습니다.
MBTI, Myers-Briggs, Myers-Briggs Type Indicator는 The Myers & Briggs Foundation의 등록상표입니다.

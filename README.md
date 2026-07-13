# 이동원 포트폴리오

SSAFY 생활과 개발자로서의 목표, 경험을 소개하는 간단한 개인 포트폴리오입니다.  
토스 랜딩 페이지처럼 간결한 정보 구조와 스크롤 기반 인터랙션을 적용했으며, 별도의 프레임워크 없이 HTML, CSS, JavaScript로 제작했습니다.

## 페이지

| 페이지 | 파일 | 내용 |
| --- | --- | --- |
| 자기소개 | `index.html` | 프로필, 생년월일, 거주지, MBTI, 취미, 방명록 |
| SSAFY 목표 | `goals.html` | 다섯 가지 목표를 보여주는 인터랙티브 타임라인 |
| 커리어 | `career.html` | 기술 스택, 알고리즘 학습 현황, 프로젝트 경험 |

## 주요 기능

- 반응형 상단 내비게이션과 모바일 햄버거 메뉴
- 스크롤 진입 애니메이션
- 라이트·다크 모드 전환
- 한국어·영어 전환
- `localStorage` 기반 방명록
- 사용자 행동에 따라 스탬프를 모으는 탐험 패스
- 목표 타임라인 상세 정보 애니메이션
- 프로젝트별 상세 정보 전환

탐험 패스에서는 다음 행동을 완료할 수 있습니다.

1. 자기소개 끝까지 둘러보기
2. SSAFY 목표 5개 모두 확인하기
3. 프로젝트 4개 모두 확인하기
4. 다크 모드 사용하기
5. 영어 모드 사용하기
6. 방명록 작성하기

진행 상태와 사용자 설정은 현재 브라우저의 `localStorage`에 저장됩니다.

## 프로젝트 구조

```text
self_description2/
├─ index.html
├─ goals.html
├─ career.html
├─ css/
│  ├─ navbar.css
│  ├─ theme.css
│  ├─ gamification.css
│  ├─ introduction.css
│  ├─ goals.css
│  └─ career.css
├─ js/
│  ├─ site-controls.js
│  ├─ gamification.js
│  ├─ introduction.js
│  ├─ guestbook.js
│  ├─ goals.js
│  └─ career.js
├─ assets/
│  └─ images/
│     ├─ profile.jpg
│     └─ infp-mediator.png
└─ docs/
   └─ sample.txt
```
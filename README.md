# 이동원 포트폴리오

SSAFY 생활과 개발자로서의 목표, 경험을 소개하는 개인 포트폴리오입니다.  
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

## 로컬에서 실행하기

정적 웹사이트이므로 `index.html`을 직접 열어도 확인할 수 있습니다. 다만 브라우저 보안 정책에 따른 차이를 피하려면 로컬 서버 사용을 권장합니다.

Python이 설치되어 있다면 프로젝트 루트에서 실행합니다.

```bash
python -m http.server 4173
```

이후 브라우저에서 아래 주소로 접속합니다.

```text
http://localhost:4173
```

## Netlify 배포

별도의 빌드 과정이 없는 정적 프로젝트입니다.

1. 이 저장소를 GitHub에 푸시합니다.
2. Netlify에서 저장소를 연결합니다.
3. Build command는 비워 둡니다.
4. Publish directory에는 프로젝트 루트인 `.`을 입력합니다.
5. 배포를 실행합니다.

JavaScript와 `localStorage`는 Netlify 무료 정적 호스팅에서도 사용할 수 있습니다. 단, 방명록 데이터와 탐험 기록은 서버가 아닌 방문자의 브라우저에만 저장됩니다.

## 기술 구성

- HTML5
- CSS3
- Vanilla JavaScript
- Web Storage API
- Intersection Observer API

## 브라우저 데이터 초기화

사이트에서 사용하는 주요 저장 키는 다음과 같습니다.

| 용도 | 키 |
| --- | --- |
| 테마 | `dongwon-site-theme` |
| 언어 | `dongwon-site-language` |
| 방명록 | `dongwon-guestbook-entries` |
| 탐험 패스 | `portfolio-explore-pass` |

탐험 패스 기록은 패널의 `진행도 초기화` 버튼으로 삭제할 수 있습니다. 나머지 데이터는 브라우저 개발자 도구의 Local Storage에서 관리할 수 있습니다.

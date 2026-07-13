# 재사용 방법

각 HTML의 `<header class="site-header">...</header>` 블록을 그대로 복사하고 `navbar.css`를 연결하세요.

현재 페이지 링크에만 `is-active` 클래스와 `aria-current="page"`를 넣으면 파란색과 밑줄로 강조됩니다.

```html
<a class="navbar__link is-active" href="index.html" aria-current="page">기본정보</a>
```

모바일 메뉴는 숨겨진 체크박스와 `<label>`을 이용하므로 별도 JavaScript가 필요 없습니다. 페이지마다 `id="nav-toggle"`은 한 번만 사용하세요.

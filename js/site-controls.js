(function () {
  const THEME_KEY = 'dongwon-site-theme';
  const LANGUAGE_KEY = 'dongwon-site-language';
  const savedTheme = localStorage.getItem(THEME_KEY);
  const savedLanguage = localStorage.getItem(LANGUAGE_KEY);
  const preferredDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches;

  window.siteTheme = savedTheme || (preferredDark ? 'dark' : 'light');
  window.siteLanguage = savedLanguage || 'ko';
  document.documentElement.dataset.theme = window.siteTheme;
  document.documentElement.lang = window.siteLanguage;

  const koToEn = {
    '이동원의 이야기': "Dongwon's Story", '홈으로 이동': 'Go to home', '자기소개': 'About Me', 'SSAFY 목표': 'SSAFY Goals', '커리어': 'Career',
    '안녕하세요': 'HELLO', '좋아하는 일에는': 'For the things I love,', '마음부터 움직이는': 'I lead with my heart.', '이동원입니다.': "I'm Dongwon Lee.",
    '작은 호기심도 그냥 지나치지 않고,': 'I never let even a small curiosity pass by,', '천천히 제 것으로 만들어가고 있어요.': 'and slowly turn it into something of my own.',
    '상세 소개로 이동': 'Explore my story', '한여름에 태어난': 'Born in midsummer,', '사자자리예요.': "I'm a Leo.",
    '스무 번째 여름의 한가운데에서 태어났어요. 뜨거운 계절처럼, 좋아하는 일 앞에서는 열정이 먼저 앞섭니다.': 'I was born in the heart of summer. Like the season, passion comes first when I find something I love.',
    '마음의 집은 인천,': 'Incheon is home,', '오늘의 생활은 관악.': 'Gwanak is where I live today.',
    '본가는 인천에 있어요. 지금은 관악구에서 새로운 사람과 경험을 만나며 저만의 생활 반경을 넓히고 있습니다.': 'My family home is in Incheon. Now I live in Gwanak, expanding my world through new people and experiences.',
    '나의 본가': 'Family home', '지금 사는 곳': 'Current home', '인천': 'Incheon', '관악구': 'Gwanak',
    '조용하지만 마음속은': 'Quiet on the outside,', '열정적인 중재자.': 'a passionate Mediator.',
    '사람과 의미를 오래 들여다보는 편이에요. 진심이 닿는 일을 발견하면 제 속도대로 깊이 몰입합니다.': 'I take time to understand people and meaning. When something feels genuine, I immerse myself deeply at my own pace.',
    '#공감': '#Empathy', '#호기심': '#Curiosity', '#몰입': '#Focus',
    '쉬는 시간도': 'Even my downtime', '좋아하는 것으로 꽉 채워요.': 'is filled with things I love.',
    '스포츠 보기': 'Watching Sports', '러닝': 'Running', '게임': 'Gaming',
    '경기 시작 전 라인업부터 경기 후 하이라이트까지. 보는 시간도 제겐 꽤 진지한 취미예요.': 'From pre-game lineups to post-game highlights, watching sports is a serious hobby for me.',
    '복잡한 생각은 발끝에 두고 달려요. 한 걸음씩 쌓이는 기록에서 작은 성취를 느낍니다.': 'I leave complicated thoughts behind as I run and find small wins in every step.',
    '규칙을 이해하고 전략을 바꿔가며 해결하는 과정이 좋아요. 친구와 함께라면 재미는 두 배가 됩니다.': 'I enjoy understanding rules, changing strategies, and solving challenges—especially with friends.',
    'TMI · 응원할 때만큼은 누구보다 과몰입': 'TMI · I get completely invested when cheering', 'TMI · 뛰고 나서 보는 기록이 제일 뿌듯함': 'TMI · Reviewing my run feels the most rewarding', 'TMI · “한 판만”이 가장 지키기 어려운 약속': 'TMI · “Just one game” is the hardest promise to keep',
    '천천히, 하지만 꾸준히.': 'Slowly, but steadily.', '저다운 속도로 나아갑니다.': 'I move forward at my own pace.', '다음 이야기 · SSAFY 목표': 'Next · SSAFY Goals',
    '오늘의 배움을': "Today's learning,", '내일의 결과로.': "tomorrow's results.", '다섯 개의 여정 중': 'Explore five milestones.', '궁금한 단계를 눌러보세요.': 'Select a step to learn more.',
    '첫 번째 목표 확인': 'View the first goal', '두 번째 목표 확인': 'View the second goal', '세 번째 목표 확인': 'View the third goal', '네 번째 목표 확인': 'View the fourth goal', '다섯 번째 목표 확인': 'View the fifth goal',
    '목표 상세 닫기': 'Close goal details', '목표를 선택해 주세요.': 'Select a goal.', '한 단계씩, 분명하게.': 'One clear step at a time.', '다음 이야기 · 커리어': 'Next · Career',
    'SSAFY SW 역량 테스트': 'SSAFY SW Competency Test', 'B형 취득': 'Earn Level B', '정보처리기사': 'Engineer Information Processing', '취득': 'Certification', 'OPIc IH': 'OPIc IH', '의미 있는 대회에서': 'Win a meaningful', '수상': 'competition', '대기업 개발자로': 'Become a developer', '취업': 'at a major company',
    '알고리즘 문제를 논리적으로 분석하고, 제한 시간 안에 안정적으로 구현하는 실력을 증명합니다.': 'Prove my ability to analyze algorithm problems and implement reliable solutions within time limits.',
    '매일 한 문제 이상 풀이하고 오답 원인을 기록해, 유형별 접근법을 반복해서 체화합니다.': 'Solve at least one problem daily, document mistakes, and internalize approaches by pattern.',
    '소프트웨어 개발 전반의 이론을 단단히 정리하고, 현업에서 필요한 기본기를 자격으로 완성합니다.': 'Build a solid foundation in software development theory and validate practical fundamentals.',
    '필기 개념을 주차별로 정리하고 기출문제를 반복한 뒤, 실기 대비는 SQL과 서술형 중심으로 준비합니다.': 'Organize theory weekly, repeat past exams, and focus practical preparation on SQL and written answers.',
    '익숙한 주제에 대해 자연스럽게 의견과 경험을 설명할 수 있는 영어 커뮤니케이션 능력을 갖춥니다.': 'Develop the English communication skills to explain opinions and experiences naturally.',
    '자주 출제되는 주제별 스크립트를 제 말로 다시 만들고, 매일 녹음하며 표현과 발음을 개선합니다.': 'Rewrite common topics in my own words and improve expression and pronunciation through daily recordings.',
    '실제 문제를 해결하는 프로젝트를 완성하고, 기술뿐 아니라 기획과 협업의 결과까지 인정받습니다.': 'Complete a project that solves a real problem and earn recognition for planning and collaboration as well as technology.',
    '사용자 문제가 분명한 주제를 선택하고, 팀원과 빠르게 검증하며 완성도 높은 결과물을 만듭니다.': 'Choose a clear user problem, validate quickly with teammates, and deliver a polished result.',
    'SSAFY에서 쌓은 알고리즘, 프로젝트, 협업 경험을 바탕으로 더 큰 문제를 해결하는 개발자가 됩니다.': 'Use my SSAFY experience in algorithms, projects, and teamwork to solve bigger problems as a developer.',
    '프로젝트 경험을 명확한 성과로 정리하고, 코딩 테스트와 기술 면접을 꾸준히 준비해 기회를 잡습니다.': 'Turn project experience into clear outcomes and prepare consistently for coding tests and interviews.',
    '기술을 쌓고,': 'Building technology,', '문제를 해결하며': 'solving problems,', '성장합니다.': 'and growing.',
    '백엔드 기술을 중심으로': 'Focused on backend technology,', '사용자에게 실제로 필요한 서비스를 만들어왔어요.': 'I have built services that users genuinely need.',
    '서비스의 뒤편을': 'Building a solid', '단단하게 만듭니다.': 'foundation behind services.',
    '언어와 프레임워크부터 데이터, 인프라까지': 'From languages and frameworks to data and infrastructure,', '백엔드 개발의 전체 흐름을 경험했습니다.': 'I have experienced the full backend development flow.',
    '그리고 다시': 'and starting', '시작.': 'again.',
    '2월에 백준 골드 3을 달성했지만, 이후 학습에 소홀해지며 실력이 많이 줄었다고 느끼고 있어요.': 'I reached Baekjoon Gold III in February, but after neglecting practice, I feel my skills have declined.',
    '지금의 위치를 솔직히 인정하고': 'I honestly recognize where I am now', '문제 풀이 감각을 다시 쌓아가려 합니다.': 'and will rebuild my problem-solving instincts.',
    '달성': 'Achieved', '재정비': 'Reset', '현재 위치': 'Current', '꾸준함': 'Consistency', '다시 상승': 'Rise again',
    '네 번의 프로젝트,': 'Four projects,', '네 가지 문제 해결.': 'four problems solved.', '카드를 선택하면 각 프로젝트가 해결하려는 문제를 확인할 수 있어요.': 'Select a card to see the problem each project addresses.',
    '섬 여행을 더 쉽게 계획하고 즐길 수 있도록 도와주는 애플리케이션입니다.': 'An application that makes island travel easier to plan and enjoy.',
    '낯선 섬의 정보를 찾고 여행 동선을 계획하는 과정의 불편함을 줄입니다.': 'Reduces the friction of finding island information and planning routes.',
    '인공지능을 활용해 사용자의 감정을 살피고 관리하도록 돕는 애플리케이션입니다.': 'An AI application that helps users understand and manage their emotions.',
    '말로 표현하기 어려운 감정을 기록하고 돌아보는 과정을 더 편안하게 만듭니다.': 'Makes it easier to record and reflect on emotions that are hard to express.',
    'AI를 이용해 적합한 인재와 기업을 연결해주는 웹서비스입니다.': 'An AI web service that connects suitable talent with companies.',
    '인재의 역량과 기업의 요구를 더 효과적으로 연결해 채용 과정의 간극을 줄입니다.': 'Bridges the hiring gap by matching talent capabilities with company needs.',
    'AI를 이용해 웹 테스트 자동화를 지원하는 웹서비스입니다.': 'An AI web service that supports web test automation.',
    '반복적인 웹 테스트 작성과 실행의 부담을 줄이고 검증 과정의 효율을 높입니다.': 'Reduces repetitive test creation and execution while improving verification efficiency.',
    '잘하는 것에 안주하지 않고,': 'Never settling for what I do well,', '부족한 것부터 다시 채웁니다.': 'I rebuild from what I lack.', '처음으로 · 자기소개': 'Back to · About Me',
    '방명록': 'Guestbook', '다녀간 흔적을 남겨주세요.': 'Leave a note before you go.', '이름': 'Name', '메시지': 'Message', '남기기': 'Post', '아직 남겨진 메시지가 없어요.': 'No messages yet.', '삭제': 'Delete', '개의 메시지': 'messages'
  };
  const enToKo = Object.fromEntries(Object.entries(koToEn).map(([ko, en]) => [en, ko]));

  function replaceTextNode(node, dictionary) {
    const value = node.nodeValue;
    const trimmed = value.trim();
    if (!trimmed || !dictionary[trimmed]) return;
    node.nodeValue = value.replace(trimmed, dictionary[trimmed]);
  }

  function translate(root, language) {
    const dictionary = language === 'en' ? koToEn : enToKo;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) {
      const parent = walker.currentNode.parentElement;
      if (!parent || ['SCRIPT', 'STYLE', 'TEXTAREA'].includes(parent.tagName)) continue;
      nodes.push(walker.currentNode);
    }
    nodes.forEach((node) => replaceTextNode(node, dictionary));
    document.querySelectorAll('[aria-label]').forEach((element) => {
      const current = element.getAttribute('aria-label');
      if (dictionary[current]) element.setAttribute('aria-label', dictionary[current]);
    });
    document.querySelectorAll('[placeholder]').forEach((element) => {
      const current = element.getAttribute('placeholder');
      if (dictionary[current]) element.setAttribute('placeholder', dictionary[current]);
    });
  }

  function updateControls() {
    const themeButton = document.querySelector('.theme-toggle');
    const languageButton = document.querySelector('.language-toggle');
    if (themeButton) {
      const dark = window.siteTheme === 'dark';
      themeButton.innerHTML = `<span aria-hidden="true">${dark ? '☀' : '☾'}</span><b>${dark ? 'LIGHT' : 'DARK'}</b>`;
      const korean = window.siteLanguage === 'ko';
      themeButton.setAttribute('aria-label', dark ? (korean ? '라이트 모드로 전환' : 'Switch to light mode') : (korean ? '다크 모드로 전환' : 'Switch to dark mode'));
    }
    if (languageButton) {
      languageButton.innerHTML = `<span aria-hidden="true">文</span><b>${window.siteLanguage === 'ko' ? 'EN' : 'KO'}</b>`;
      languageButton.setAttribute('aria-label', window.siteLanguage === 'ko' ? 'Switch to English' : '한국어로 전환');
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    const menu = document.querySelector('.navbar__menu');
    if (menu) {
      const controls = document.createElement('li');
      controls.className = 'site-controls';
      controls.innerHTML = '<button class="site-control language-toggle" type="button"></button><button class="site-control theme-toggle" type="button"></button>';
      menu.appendChild(controls);
    }

    updateControls();
    if (window.siteLanguage === 'en') translate(document.body, 'en');

    document.querySelector('.theme-toggle')?.addEventListener('click', () => {
      window.siteTheme = window.siteTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.dataset.theme = window.siteTheme;
      localStorage.setItem(THEME_KEY, window.siteTheme);
      updateControls();
      window.dispatchEvent(new CustomEvent('site-theme-change', { detail: { theme: window.siteTheme } }));
    });

    document.querySelector('.language-toggle')?.addEventListener('click', () => {
      window.siteLanguage = window.siteLanguage === 'ko' ? 'en' : 'ko';
      document.documentElement.lang = window.siteLanguage;
      localStorage.setItem(LANGUAGE_KEY, window.siteLanguage);
      translate(document.body, window.siteLanguage);
      updateControls();
      window.dispatchEvent(new CustomEvent('site-language-change', { detail: { language: window.siteLanguage } }));
    });

    const observer = new MutationObserver((mutations) => {
      if (window.siteLanguage !== 'en') return;
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.TEXT_NODE) replaceTextNode(node, koToEn);
          if (node.nodeType === Node.ELEMENT_NODE) translate(node, 'en');
        });
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });
  });
})();

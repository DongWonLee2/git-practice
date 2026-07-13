const projects = {
  istetrip: { type: 'TRAVEL APPLICATION', title: 'Istetrip', summary: '섬 여행을 더 쉽게 계획하고 즐길 수 있도록 도와주는 애플리케이션입니다.', problem: '낯선 섬의 정보를 찾고 여행 동선을 계획하는 과정의 불편함을 줄입니다.', badge: 'TRAVEL', visual: 'island', number: '01' },
  modak: { type: 'AI EMOTION CARE', title: '모닥모닥', summary: '인공지능을 활용해 사용자의 감정을 살피고 관리하도록 돕는 애플리케이션입니다.', problem: '말로 표현하기 어려운 감정을 기록하고 돌아보는 과정을 더 편안하게 만듭니다.', badge: 'EMOTION', visual: 'emotion', number: '02' },
  weiver: { type: 'AI RECRUITING', title: 'WEIVER', summary: 'AI를 이용해 적합한 인재와 기업을 연결해주는 웹서비스입니다.', problem: '인재의 역량과 기업의 요구를 더 효과적으로 연결해 채용 과정의 간극을 줄입니다.', badge: 'MATCHING', visual: 'talent', number: '03' },
  probe: { type: 'AI TEST AUTOMATION', title: 'Probe', summary: 'AI를 이용해 웹 테스트 자동화를 지원하는 웹서비스입니다.', problem: '반복적인 웹 테스트 작성과 실행의 부담을 줄이고 검증 과정의 효율을 높입니다.', badge: 'TESTING', visual: 'testing', number: '04' }
};

const projectTabs = [...document.querySelectorAll('.project-tab')];
const projectPanel = document.querySelector('#project-panel');
const projectVisual = projectPanel.querySelector('.project-panel__visual');

function renderProject(tab) {
  const data = projects[tab.dataset.project];
  projectTabs.forEach((item) => { const selected = item === tab; item.classList.toggle('is-active', selected); item.setAttribute('aria-selected', String(selected)); });
  projectPanel.classList.add('is-switching');
  window.setTimeout(() => {
    projectPanel.setAttribute('aria-labelledby', tab.id);
    projectPanel.querySelector('.project-panel__type').textContent = data.type;
    projectPanel.querySelector('h3').textContent = data.title;
    projectPanel.querySelector('.project-panel__summary').textContent = data.summary;
    projectPanel.querySelector('.project-panel__problem p').textContent = data.problem;
    projectPanel.querySelector('.visual-badge').textContent = data.badge;
    projectPanel.querySelector('.visual-number').textContent = data.number;
    projectPanel.querySelector('.project-panel__index strong').textContent = data.number;
    projectVisual.className = `project-panel__visual project-panel__visual--${data.visual}`;
    projectPanel.classList.remove('is-switching');
  }, 220);
}

projectTabs.forEach((tab, index) => {
  tab.addEventListener('click', () => renderProject(tab));
  tab.addEventListener('keydown', (event) => {
    if (!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(event.key)) return;
    event.preventDefault();
    const previous = event.key === 'ArrowLeft' || event.key === 'ArrowUp';
    const next = projectTabs[(index + (previous ? -1 : 1) + projectTabs.length) % projectTabs.length];
    next.focus();
    renderProject(next);
  });
});

const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      currentObserver.unobserve(entry.target);
    });
  }, { threshold: .14, rootMargin: '0px 0px -7% 0px' });
  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}

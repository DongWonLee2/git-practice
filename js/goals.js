const goalData = {
  btest: {
    step: '01',
    category: 'STEP 01 · SOFTWARE SKILL',
    title: 'SSAFY SW 역량 테스트<br>B형 취득',
    description: '알고리즘 문제를 논리적으로 분석하고, 제한 시간 안에 안정적으로 구현하는 실력을 증명합니다.',
    plan: '매일 한 문제 이상 풀이하고 오답 원인을 기록해, 유형별 접근법을 반복해서 체화합니다.'
  },
  engineer: {
    step: '02',
    category: 'STEP 02 · CERTIFICATE',
    title: '정보처리기사<br>취득',
    description: '소프트웨어 개발 전반의 이론을 단단히 정리하고, 현업에서 필요한 기본기를 자격으로 완성합니다.',
    plan: '필기 개념을 주차별로 정리하고 기출문제를 반복한 뒤, 실기 대비는 SQL과 서술형 중심으로 준비합니다.'
  },
  opic: {
    step: '03',
    category: 'STEP 03 · COMMUNICATION',
    title: 'OPIc IH<br>취득',
    description: '익숙한 주제에 대해 자연스럽게 의견과 경험을 설명할 수 있는 영어 커뮤니케이션 능력을 갖춥니다.',
    plan: '자주 출제되는 주제별 스크립트를 제 말로 다시 만들고, 매일 녹음하며 표현과 발음을 개선합니다.'
  },
  award: {
    step: '04',
    category: 'STEP 04 · CHALLENGE',
    title: '의미 있는 대회에서<br>수상',
    description: '실제 문제를 해결하는 프로젝트를 완성하고, 기술뿐 아니라 기획과 협업의 결과까지 인정받습니다.',
    plan: '사용자 문제가 분명한 주제를 선택하고, 팀원과 빠르게 검증하며 완성도 높은 결과물을 만듭니다.'
  },
  career: {
    step: '05',
    category: 'STEP 05 · CAREER',
    title: '대기업 개발자로<br>취업',
    description: 'SSAFY에서 쌓은 알고리즘, 프로젝트, 협업 경험을 바탕으로 더 큰 문제를 해결하는 개발자가 됩니다.',
    plan: '프로젝트 경험을 명확한 성과로 정리하고, 코딩 테스트와 기술 면접을 꾸준히 준비해 기회를 잡습니다.'
  }
};

const milestones = [...document.querySelectorAll('.milestone')];
const detail = document.querySelector('#goal-detail');
const closeButton = document.querySelector('.goal-detail__close');
const progress = document.querySelector('.timeline__progress');
const mobileProgress = document.querySelector('.timeline__mobile-progress');
const detailNumber = document.querySelector('.goal-detail__number');
const detailCategory = document.querySelector('.goal-detail__category');
const detailTitle = document.querySelector('.goal-detail__body h2');
const detailDescription = document.querySelector('.goal-detail__description');
const detailPlan = document.querySelector('.goal-detail__plan p');
const detailStatus = document.querySelector('.goal-detail__status strong');
const detailRing = document.querySelector('.goal-detail__ring');
let activeMilestone = null;

function updateProgress(index) {
  const percentage = ((index + 1) / milestones.length) * 100;
  const pathStops = [10, 31, 52, 73, 91];
  progress.style.opacity = '1';
  progress.style.strokeDashoffset = `${100 - pathStops[index]}`;
  mobileProgress.style.height = `${percentage}%`;
  detailRing.style.strokeDashoffset = `${270 - (270 * (index + 1) / milestones.length)}`;
}

function renderGoal(milestone) {
  const data = goalData[milestone.dataset.goal];
  const index = milestones.indexOf(milestone);

  milestones.forEach((item) => {
    const selected = item === milestone;
    item.classList.toggle('is-active', selected);
    item.setAttribute('aria-expanded', String(selected));
  });

  const applyContent = () => {
    detailNumber.textContent = data.step;
    detailCategory.textContent = data.category;
    detailTitle.innerHTML = data.title;
    detailDescription.textContent = data.description;
    detailPlan.textContent = data.plan;
    detailStatus.textContent = `${data.step} / 05`;
    detail.classList.remove('is-switching');
  };

  if (detail.classList.contains('is-open')) {
    detail.classList.add('is-switching');
    window.setTimeout(applyContent, 180);
  } else {
    applyContent();
    detail.classList.add('is-open');
    detail.setAttribute('aria-hidden', 'false');
  }

  updateProgress(index);
  activeMilestone = milestone;

  if (window.matchMedia('(max-width: 820px)').matches) {
    window.setTimeout(() => detail.scrollIntoView({ behavior: 'smooth', block: 'center' }), 250);
  }
}

function closeDetail() {
  detail.classList.remove('is-open', 'is-switching');
  detail.setAttribute('aria-hidden', 'true');
  milestones.forEach((item) => {
    item.classList.remove('is-active');
    item.setAttribute('aria-expanded', 'false');
  });
  progress.style.strokeDashoffset = '100';
  progress.style.opacity = '0';
  mobileProgress.style.height = '0';
  activeMilestone?.focus();
  activeMilestone = null;
}

milestones.forEach((milestone, index) => {
  milestone.addEventListener('click', () => renderGoal(milestone));
  milestone.addEventListener('keydown', (event) => {
    if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key)) return;
    event.preventDefault();
    const previous = event.key === 'ArrowLeft' || event.key === 'ArrowUp';
    const nextIndex = (index + (previous ? -1 : 1) + milestones.length) % milestones.length;
    milestones[nextIndex].focus();
  });
});

closeButton.addEventListener('click', closeDetail);

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && detail.classList.contains('is-open')) closeDetail();
});

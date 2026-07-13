(function(){
  const KEY='portfolio-explore-pass';
  const stamps=[
    {id:'story',icon:'◉',ko:['스토리 탐험가','자기소개 끝까지 둘러보기'],en:['Story Explorer','Explore the full introduction']},
    {id:'goals',icon:'◆',ko:['목표 설계자','목표 5개 모두 확인하기'],en:['Goal Architect','Open all five goals']},
    {id:'projects',icon:'▦',ko:['프로젝트 리뷰어','프로젝트 4개 모두 확인하기'],en:['Project Reviewer','Explore all four projects']},
    {id:'dark',icon:'☾',ko:['야간 탐험가','다크모드 사용하기'],en:['Night Explorer','Try dark mode']},
    {id:'english',icon:'文',ko:['글로벌 방문자','영어 모드 사용하기'],en:['Global Visitor','Try English mode']},
    {id:'guestbook',icon:'✎',ko:['첫인상 전달자','방명록 작성하기'],en:['First Impression','Leave a guestbook message']}
  ];
  function blank(){return{earned:[],goals:[],projects:[],celebrated:false}}
  function load(){try{const value=JSON.parse(localStorage.getItem(KEY)||'{}');return{earned:Array.isArray(value.earned)?value.earned:[],goals:Array.isArray(value.goals)?value.goals:[],projects:Array.isArray(value.projects)?value.projects:[],celebrated:Boolean(value.celebrated)}}catch{return blank()}}
  let state=load();
  const save=()=>localStorage.setItem(KEY,JSON.stringify(state));
  const english=()=>window.siteLanguage==='en';
  const words=()=>english()?{title:'Explore Pass',summary:'Stamps collected',earned:'DONE',locked:'TODO',complete:'All stories discovered!',completeSub:'Thanks for exploring every corner.',reset:'Reset progress',open:'Open Explore Pass',close:'Close Explore Pass',toast:'Stamp earned'}:{title:'탐험 패스',summary:'모은 스탬프',earned:'완료',locked:'도전',complete:'모든 이야기를 발견했어요!',completeSub:'사이트의 모든 구석을 둘러봐 주셔서 감사해요.',reset:'진행도 초기화',open:'탐험 패스 열기',close:'탐험 패스 닫기',toast:'새 스탬프 획득'};

  const root=document.createElement('aside');
  root.className='explore-pass';
  root.innerHTML='<button class="explore-pass__trigger" type="button" aria-expanded="false"><svg viewBox="0 0 52 52" aria-hidden="true"><circle cx="26" cy="26" r="22"/><circle class="explore-pass__progress" cx="26" cy="26" r="22"/></svg><strong>0/6</strong></button><section class="explore-pass__panel" aria-hidden="true"><header class="explore-pass__header"><div><p class="explore-pass__eyebrow">EXPLORE PASS</p><h2></h2></div><button class="explore-pass__close" type="button">×</button></header><div class="explore-pass__summary"><p></p><strong></strong></div><ul class="explore-pass__list"></ul><div class="explore-pass__complete"><strong></strong><p></p></div><button class="explore-pass__reset" type="button"></button></section></aside>';
  const toast=document.createElement('div');
  toast.className='explore-toast';toast.setAttribute('role','status');toast.setAttribute('aria-live','polite');
  document.body.append(root,toast);
  const trigger=root.querySelector('.explore-pass__trigger');
  const panel=root.querySelector('.explore-pass__panel');
  const list=root.querySelector('.explore-pass__list');

  function render(){
    const text=words(),count=state.earned.length,complete=count===stamps.length;
    root.querySelector('.explore-pass__header h2').textContent=text.title;
    root.querySelector('.explore-pass__summary p').textContent=text.summary;
    root.querySelector('.explore-pass__summary strong').textContent=`${count} / ${stamps.length}`;
    trigger.querySelector('strong').textContent=`${count}/6`;
    root.querySelector('.explore-pass__progress').style.strokeDashoffset=String(138-(138*count/6));
    trigger.classList.toggle('is-complete',complete);trigger.setAttribute('aria-label',text.open);
    list.replaceChildren();
    stamps.forEach(stamp=>{const earned=state.earned.includes(stamp.id),copy=english()?stamp.en:stamp.ko,item=document.createElement('li');item.className=`explore-stamp${earned?' is-earned':''}`;item.innerHTML='<span class="explore-stamp__icon" aria-hidden="true"></span><div><strong></strong><p></p></div><span class="explore-stamp__state"></span>';item.querySelector('.explore-stamp__icon').textContent=earned?'✓':stamp.icon;item.querySelector('strong').textContent=copy[0];item.querySelector('p').textContent=copy[1];item.querySelector('.explore-stamp__state').textContent=earned?text.earned:text.locked;list.appendChild(item)});
    const completeBox=root.querySelector('.explore-pass__complete');completeBox.classList.toggle('is-visible',complete);completeBox.querySelector('strong').textContent=text.complete;completeBox.querySelector('p').textContent=text.completeSub;
    root.querySelector('.explore-pass__reset').textContent=text.reset;root.querySelector('.explore-pass__close').setAttribute('aria-label',text.close);
  }
  function openPanel(open){root.classList.toggle('is-open',open);trigger.setAttribute('aria-expanded',String(open));panel.setAttribute('aria-hidden',String(!open))}
  function notify(id){const stamp=stamps.find(item=>item.id===id),copy=english()?stamp.en:stamp.ko;toast.replaceChildren();const icon=document.createElement('span'),body=document.createElement('div'),title=document.createElement('strong'),name=document.createElement('small');icon.textContent='✦';title.textContent=words().toast;name.textContent=copy[0];body.append(title,name);toast.append(icon,body);toast.classList.add('is-visible');clearTimeout(notify.timer);notify.timer=setTimeout(()=>toast.classList.remove('is-visible'),2600)}
  function celebrate(){const colors=['#3182f6','#6d5dfc','#ffd43b','#2f9e6f','#ff6b6b'];for(let i=0;i<42;i++){const piece=document.createElement('i');piece.className='confetti-piece';piece.style.left=`${Math.random()*100}vw`;piece.style.background=colors[i%colors.length];piece.style.setProperty('--drift',`${(Math.random()-.5)*260}px`);piece.style.setProperty('--duration',`${1.8+Math.random()*1.8}s`);piece.style.animationDelay=`${Math.random()*.45}s`;document.body.appendChild(piece);setTimeout(()=>piece.remove(),4000)}}
  function earn(id){if(state.earned.includes(id))return;state.earned.push(id);const completed=state.earned.length===stamps.length&&!state.celebrated;if(completed)state.celebrated=true;save();render();notify(id);if(completed){celebrate();setTimeout(()=>openPanel(true),500)}}

  trigger.addEventListener('click',()=>openPanel(!root.classList.contains('is-open')));
  root.querySelector('.explore-pass__close').addEventListener('click',()=>{openPanel(false);trigger.focus()});
  root.querySelector('.explore-pass__reset').addEventListener('click',()=>{state=blank();save();render()});
  document.addEventListener('keydown',event=>{if(event.key==='Escape'&&root.classList.contains('is-open'))openPanel(false)});
  document.addEventListener('click',event=>{
    const goal=event.target.closest('[data-goal]');
    if(goal){if(!state.goals.includes(goal.dataset.goal))state.goals.push(goal.dataset.goal);if(state.goals.length>=5)earn('goals');save()}
    const project=event.target.closest('[data-project]');
    if(project){if(!state.projects.includes(project.dataset.project))state.projects.push(project.dataset.project);if(state.projects.length>=4)earn('projects');save()}
  });
  const visibleProject=document.querySelector('[data-project][aria-selected="true"]');
  if(visibleProject&&!state.projects.includes(visibleProject.dataset.project)){
    state.projects.push(visibleProject.dataset.project);
    if(state.projects.length>=4)earn('projects');
    save();
  }
  window.addEventListener('site-theme-change',event=>{if(event.detail.theme==='dark')earn('dark')});
  window.addEventListener('site-language-change',event=>{if(event.detail.language==='en')earn('english');render()});
  window.addEventListener('guestbook-entry-created',()=>earn('guestbook'));
  if(window.siteTheme==='dark')earn('dark');if(window.siteLanguage==='en')earn('english');
  const storyTarget=document.querySelector('.guestbook');
  if(storyTarget){const observer=new IntersectionObserver(entries=>{if(entries.some(entry=>entry.isIntersecting)){earn('story');observer.disconnect()}},{threshold:.18});observer.observe(storyTarget)}
  render();
})();

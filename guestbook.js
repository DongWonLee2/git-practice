const GUESTBOOK_KEY = 'dongwon-guestbook-entries';
const guestbookForm = document.querySelector('.guestbook-form');
const guestbookList = document.querySelector('.guestbook-list');
const guestbookCount = document.querySelector('.guestbook__count');

function loadEntries() {
  try {
    const parsed = JSON.parse(localStorage.getItem(GUESTBOOK_KEY) || '[]');
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveEntries(entries) {
  localStorage.setItem(GUESTBOOK_KEY, JSON.stringify(entries));
}

function renderGuestbook() {
  const entries = loadEntries();
  guestbookCount.textContent = entries.length;
  guestbookList.replaceChildren();

  if (!entries.length) {
    const empty = document.createElement('li');
    empty.className = 'guestbook-empty';
    empty.textContent = window.siteLanguage === 'en' ? 'No messages yet.' : '아직 남겨진 메시지가 없어요.';
    guestbookList.appendChild(empty);
    return;
  }

  entries.slice().reverse().forEach((entry) => {
    const item = document.createElement('li');
    item.className = 'guestbook-card';
    const meta = document.createElement('div');
    meta.className = 'guestbook-card__meta';
    const name = document.createElement('strong');
    name.textContent = entry.name;
    const time = document.createElement('time');
    time.dateTime = entry.createdAt;
    time.textContent = new Intl.DateTimeFormat(window.siteLanguage === 'en' ? 'en-US' : 'ko-KR', { dateStyle: 'medium' }).format(new Date(entry.createdAt));
    const message = document.createElement('p');
    message.textContent = entry.message;
    const remove = document.createElement('button');
    remove.type = 'button';
    remove.textContent = window.siteLanguage === 'en' ? 'Delete' : '삭제';
    remove.setAttribute('aria-label', `${entry.name} ${remove.textContent}`);
    remove.addEventListener('click', () => {
      saveEntries(loadEntries().filter((current) => current.id !== entry.id));
      renderGuestbook();
    });
    meta.append(name, time);
    item.append(meta, message, remove);
    guestbookList.appendChild(item);
  });
}

guestbookForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(guestbookForm);
  const name = String(formData.get('name') || '').trim();
  const message = String(formData.get('message') || '').trim();
  if (!name || !message) return;
  const entries = loadEntries();
  entries.push({ id: crypto.randomUUID?.() || `${Date.now()}-${Math.random()}`, name, message, createdAt: new Date().toISOString() });
  saveEntries(entries.slice(-50));
  guestbookForm.reset();
  renderGuestbook();
  window.dispatchEvent(new CustomEvent('guestbook-entry-created'));
});

window.addEventListener('site-language-change', renderGuestbook);
renderGuestbook();

/* =============================================
   APPHUB — app.js
   ============================================= */

// Default apps (pre-caricati)
const DEFAULT_APPS = [
  {
    id: 1,
    name: 'CRM Aziendale',
    url: '#',
    desc: 'Gestisci clienti, lead e opportunità commerciali.',
    category: 'gestionale',
    icon: '🏢',
  },
  {
    id: 2,
    name: 'Slack',
    url: 'https://slack.com',
    desc: 'Comunicazione interna del team in tempo reale.',
    category: 'comunicazione',
    icon: '💬',
  },
  {
    id: 3,
    name: 'Google Analytics',
    url: 'https://analytics.google.com',
    desc: 'Monitora il traffico e il comportamento utenti.',
    category: 'analytics',
    icon: '📊',
  },
  {
    id: 4,
    name: 'Gestione HR',
    url: '#',
    desc: 'Presenze, ferie, buste paga e onboarding.',
    category: 'gestionale',
    icon: '👥',
  },
  {
    id: 5,
    name: 'Jira',
    url: 'https://www.atlassian.com/software/jira',
    desc: 'Tracciamento progetti e issue management.',
    category: 'gestionale',
    icon: '🎯',
  },
  {
    id: 6,
    name: 'Metabase',
    url: '#',
    desc: 'Dashboard e report sui dati aziendali.',
    category: 'analytics',
    icon: '📈',
  },
  {
    id: 7,
    name: 'Confluence',
    url: 'https://www.atlassian.com/software/confluence',
    desc: 'Wiki aziendale e knowledge base condivisa.',
    category: 'utility',
    icon: '📚',
  },
  {
    id: 8,
    name: 'Microsoft Teams',
    url: 'https://teams.microsoft.com',
    desc: 'Videoconferenze e collaborazione in team.',
    category: 'comunicazione',
    icon: '🎥',
  },
];

// State
let apps = loadApps();

// ---- PERSISTENCE ----
function loadApps() {
  try {
    const stored = localStorage.getItem('apphub_apps');
    return stored ? JSON.parse(stored) : [...DEFAULT_APPS];
  } catch {
    return [...DEFAULT_APPS];
  }
}

function saveApps() {
  localStorage.setItem('apphub_apps', JSON.stringify(apps));
}

// ---- RENDER ----
function renderApps(list) {
  const grid = document.getElementById('apps-grid');
  if (!list.length) {
    grid.innerHTML = '<div class="apps-empty">Nessun applicativo trovato.</div>';
    return;
  }
  grid.innerHTML = list
    .map(
      (app) => `
    <a class="app-card" href="${app.url}" target="_blank" rel="noopener noreferrer"
       data-id="${app.id}" onclick="handleCardClick(event, '${app.url}')">
      <button class="app-card__remove" title="Rimuovi" onclick="removeApp(event, ${app.id})">✕</button>
      <div class="app-card__icon">${app.icon || '🔗'}</div>
      <div class="app-card__name">${escapeHtml(app.name)}</div>
      <div class="app-card__desc">${escapeHtml(app.desc)}</div>
      <span class="app-card__badge">${escapeHtml(app.category)}</span>
    </a>`
    )
    .join('');
}

function handleCardClick(e, url) {
  if (url === '#') {
    e.preventDefault();
    showToast('Applicativo non ancora configurato.');
  }
}

// ---- FILTER ----
function filterApps() {
  const query = document.getElementById('search-input').value.toLowerCase();
  const category = document.getElementById('category-filter').value;
  const filtered = apps.filter((app) => {
    const matchName = app.name.toLowerCase().includes(query) || app.desc.toLowerCase().includes(query);
    const matchCat = !category || app.category === category;
    return matchName && matchCat;
  });
  renderApps(filtered);
}

// ---- ADD APP ----
function addApp(e) {
  e.preventDefault();
  const name = document.getElementById('new-app-name').value.trim();
  const url = document.getElementById('new-app-url').value.trim();
  const desc = document.getElementById('new-app-desc').value.trim() || 'Nessuna descrizione.';
  const category = document.getElementById('new-app-category').value;
  const icon = document.getElementById('new-app-icon').value.trim() || '🔗';

  const newApp = {
    id: Date.now(),
    name,
    url,
    desc,
    category,
    icon,
  };

  apps.unshift(newApp);
  saveApps();
  updateStatCounter();
  filterApps();

  // Reset form
  e.target.reset();
  document.getElementById('modal-add').style.display = 'none';
  showToast(`"${name}" aggiunto con successo!`);
}

// ---- REMOVE APP ----
function removeApp(e, id) {
  e.preventDefault();
  e.stopPropagation();
  apps = apps.filter((a) => a.id !== id);
  saveApps();
  updateStatCounter();
  filterApps();
  showToast('Applicativo rimosso.');
}

// ---- MODAL ----
function closeModalOnOverlay(e) {
  if (e.target === e.currentTarget) {
    e.currentTarget.style.display = 'none';
  }
}

// ---- CONTACT FORM ----
function handleContactSubmit(e) {
  e.preventDefault();
  showToast('Richiesta inviata! Ti contatteremo presto.');
  e.target.reset();
}

// ---- TOAST ----
function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

// ---- STAT COUNTER ANIMATION ----
function updateStatCounter() {
  document.getElementById('stat-apps').textContent = apps.length;
}

function animateCounter(el, target, duration = 1000) {
  const start = performance.now();
  const update = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    el.textContent = Math.round(progress * target);
    if (progress < 1) requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
}

// ---- UTILS ----
function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// ---- INIT ----
document.addEventListener('DOMContentLoaded', () => {
  renderApps(apps);

  // Animate stat counter
  const statEl = document.getElementById('stat-apps');
  animateCounter(statEl, apps.length, 1200);

  // ESC closes modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.getElementById('modal-add').style.display = 'none';
    }
  });
});

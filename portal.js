// Protezione pagina: se non loggato, torna al login
const user = sessionStorage.getItem('apphub_user');
if (!user) {
  window.location.href = 'index.html';
}

// Mostra nome utente in navbar
document.getElementById('navbar-user').textContent = user;

function logout() {
  sessionStorage.removeItem('apphub_user');
  window.location.href = 'index.html';
}

function openFunction(url) {
  if (url) window.open(url, '_blank', 'noopener,noreferrer');
}

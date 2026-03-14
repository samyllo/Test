// Credenziali — sostituisci con autenticazione reale su backend
const USERS = [
  { username: 'admin', password: 'admin123' },
  { username: 'test',  password: 'test' },
];

function handleLogin(e) {
  e.preventDefault();
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value;
  const errorMsg = document.getElementById('error-msg');

  const match = USERS.find(u => u.username === username && u.password === password);

  if (match) {
    errorMsg.textContent = '';
    localStorage.setItem('apphub_user', username);
    window.location.href = 'portal.html';
  } else {
    errorMsg.textContent = 'Utente o password non corretti.';
  }
}

function togglePassword() {
  const input = document.getElementById('password');
  input.type = input.type === 'password' ? 'text' : 'password';
}

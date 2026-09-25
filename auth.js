const form = document.getElementById('register-form');

form.addEventListener('submit', function (event) {
  event.preventDefault();

  const username = document.getElementById('reg-username').value;
  const password = document.getElementById('reg-password').value;
  const password2 = document.getElementById('reg-password2').value;

if (password !== password2) {
  alert('Пароли не совпадают');
  return;
}

fetch('/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ username, password })
})
  .then(response => response.json())
  .then(data => {
  document.getElementById('register-message').textContent = data.message;
});
});

const loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit', function (event) {
  event.preventDefault();

  const username = document.getElementById('login-username').value;
  const password = document.getElementById('login-password').value;

  fetch('/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  })
    .then(response => response.json())
    .then(data => {
  document.getElementById('login-message').textContent = data.message;
});
});
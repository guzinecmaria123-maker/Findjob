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
  .then(data => console.log(data));
});
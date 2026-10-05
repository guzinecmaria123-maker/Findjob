const registerForm = document.getElementById('register-form');
const registerMessage = document.getElementById('register-message');
const authModal = document.getElementById('authModal');
let registerCloseTimer;

function showRegisterMessage(text, isSuccess) {
  registerMessage.textContent = text;
  registerMessage.classList.toggle('text-success', isSuccess);
  registerMessage.classList.toggle('text-danger', !isSuccess);
}

registerForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const username = document.getElementById('reg-username').value.trim();
  const password = document.getElementById('reg-password').value;
  const password2 = document.getElementById('reg-password2').value;

  if (password !== password2) {
    showRegisterMessage('Пароли не совпадают', false);
    return;
  }

  const submitButton = registerForm.querySelector('[type="submit"]');
  submitButton.disabled = true;

  try {
    const response = await fetch('/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();

    showRegisterMessage(data.message, response.ok);

    if (response.ok) {
      registerCloseTimer = setTimeout(() => {
        bootstrap.Modal.getOrCreateInstance(authModal).hide();
      }, 1500);
    }
  } catch {
    showRegisterMessage('Нет связи с сервером', false);
  } finally {
    submitButton.disabled = false;
  }
});

authModal.addEventListener('hidden.bs.modal', () => {
  clearTimeout(registerCloseTimer);
  registerForm.reset();
  registerMessage.textContent = '';
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
      const message = document.getElementById('login-message');
      message.textContent = data.message;

      if (data.success) {
        setTimeout(function () {
          const modalElement = document.getElementById('authModal');
          const modal = bootstrap.Modal.getInstance(modalElement);
          modal.hide();

          message.textContent = '';
          loginForm.reset();
        }, 1500);
      }
    });
});
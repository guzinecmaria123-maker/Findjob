const express = require('express');   // подключаем Express
const app = express();                // создаём сам сервер (приложение)
const Database = require('better-sqlite3');
const db = new Database('users.db');
const bcrypt = require('bcrypt');

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
  )
`);
app.use(express.static(__dirname));
app.use(express.json());
app.post('/register', async (req, res) => {
  const username = typeof req.body?.username === 'string' ? req.body.username.trim() : '';
  const password = typeof req.body?.password === 'string' ? req.body.password : '';

  if (!username || password.length < 6) {
    return res.status(400).json({ message: 'Введите имя и пароль не короче 6 символов' });
  }

  const hash = await bcrypt.hash(password, 10);

  try {
    db.prepare('INSERT INTO users (username, password) VALUES (?, ?)').run(username, hash);
  } catch (error) {
    if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
      return res.status(409).json({ message: 'Это имя уже занято' });
    }
    console.error(error);
    return res.status(500).json({ message: 'Ошибка сервера, попробуйте позже' });
  }

  console.log('Новый пользователь:', username);
  res.status(201).json({ message: 'Регистрация прошла успешно' });
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const stmt = db.prepare('SELECT * FROM users WHERE username = ?');
  const user = stmt.get(username);

  if (!user) {
    res.json({ success: false, message: 'Неверное имя или пароль' });
    return;
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    res.json({ success: false, message: 'Неверное имя или пароль' });
    return;
  }

  res.json({ success: true, message: 'Вход выполнен' });
});

app.listen(3000, () => {              // запускаем сервер на порту 3000
  console.log('Сервер запущен на порту 3000');
});
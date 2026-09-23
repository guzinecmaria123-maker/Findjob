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
  const { username, password } = req.body;
  const hash = await bcrypt.hash(password, 10);
  const stmt = db.prepare('INSERT INTO users (username, password) VALUES (?, ?)');
  stmt.run(username, hash);
  console.log('Новый пользователь:', username);
  res.json({ message: 'Регистрация прошла успешно' });
});
app.listen(3000, () => {              // запускаем сервер на порту 3000
  console.log('Сервер запущен на порту 3000');
});
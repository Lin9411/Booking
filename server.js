// 引入模組
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const port = 3000;

// 使用 JSON 中介軟體
app.use(express.json());
app.use(express.static('public')); // 假設你的 HTML 放在 public 資料夾

// 連接 SQLite 資料庫
const db = new sqlite3.Database('./final_project.db', (err) => {
  if (err) {
    console.error('無法連接 SQLite 資料庫：', err.message);
  } else {
    console.log('成功連接到 SQLite 資料庫');
  }
});

// ✅ 這一段放這裡！建立接收表單資料的路由
app.post('/addUser', (req, res) => {
  const { name, age } = req.body;

  const stmt = db.prepare("INSERT INTO user (name, age) VALUES (?, ?)");
  stmt.run(name, age, function(err) {
    if (err) {
      console.error("寫入失敗", err);
      res.status(500).json({ message: "資料寫入失敗" });
    } else {
      res.json({ message: "資料寫入成功", id: this.lastID });
    }
  });
});

// 啟動伺服器
app.listen(port, () => {
  console.log(`伺服器已啟動：http://localhost:${port}`);
});

const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3002;

// 정적 파일 서빙
app.use(express.static(path.join(__dirname, 'dist')));

// 모든 경로 index.html로 리다이렉트 (SPA 지원)
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`
╔══════════════════════════════════════════╗
║  🏢 Pixel Corp 대시보드                  ║
║  🌐 서버 실행 중!                        ║
║                                          ║
║  📱 접속: http://192.168.35.250:${PORT}     ║
║  💻 로컬: http://localhost:${PORT}         ║
╚══════════════════════════════════════════╝
  `);
});

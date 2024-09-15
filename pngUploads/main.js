const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors())
app.use(express.json());
const multer = require("multer");
const upload = multer(); // Создаем экземпляр multer
const fs = require('fs');
const path = require('path');

app.post("/", upload.single('file'), async (req, res) => {
  console.log(req.file); // Вывод информации о файле

  // Путь к директории, где будут храниться файлы
  const uploadsDir = path.join(__dirname, 'uploads');
  
  // Проверяем, существует ли директория, и создаем её, если нет
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }

  // Полный путь к файлу включая имя файла
  const filePath = path.join(uploadsDir, `${req.file.originalname}`);

  // Сохраняем файл на сервере
  fs.writeFile(filePath, req.file.buffer, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error saving file');
    }
    console.log(`File saved to ${filePath}`);
    return res.send('File uploaded successfully');
  });
});


app.get('/uploads/:filename', (req, res) => {
  const filename = req.params.filename;
  const imagePath = path.join(__dirname, 'uploads', filename);
  if (fs.existsSync(imagePath)) {
    res.sendFile(imagePath);
  } else {
    res.status(404).send('File not found');
  }
});
app.listen(3001, () => {
  console.log('Proxy server running on port 3001');
});
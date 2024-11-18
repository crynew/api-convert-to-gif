import express, { Request, Response } from 'express';
import multer from 'multer';
import ffmpeg from 'fluent-ffmpeg';
import path from 'path';
import fs from 'fs';

const app = express();
const PORT = 3000;

const uploadDirectory = path.resolve(__dirname, 'uploads');

if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDirectory);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage: storage });

app.post('/convert-to-gif', upload.single('video'), (req: Request, res: Response): void => {
  if (!req.file) {
    res.status(400).json({ message: 'No video file uploaded.' });
    return;
  }

  console.log("Recebi o vídeo!");

  const videoPath = path.resolve(uploadDirectory, req.file.filename);
  const gifPath = path.resolve(uploadDirectory, `${req.file.filename}.gif`);

  ffmpeg(videoPath)
    .setStartTime('00:00:05')
    .setDuration(5)
    .output(gifPath)
    .on('end', () => {
      console.log('Conversão concluída.');
      res.sendFile(gifPath, (err) => {
        if (err) {
          console.error('Erro ao enviar o GIF:', err);
          return res.status(500).json({ message: 'Erro ao enviar o arquivo GIF.' });
        }

        fs.unlinkSync(videoPath);
        fs.unlinkSync(gifPath);
      });
    })
    .on('error', (err: Error) => {
      console.error('Erro durante a conversão:', err);
      res.status(500).json({ message: 'Erro ao converter o vídeo para GIF.', error: err.message });
    })
    .run();
});

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
});

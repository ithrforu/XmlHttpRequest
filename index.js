const express = require('express');
const app = express();
const cors = require('cors');
const multer  = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __dirname + '/files/')
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  }
});

const upload = multer({ storage: storage });

app.use(cors({
  origin: '*'
}));
app.use(express.raw());
app.use(express.urlencoded({ extended: true }));

app.post('/', upload.single('myFile'), (req,res) => {
  console.log(req.body, req.file);
  res.send('Заходите!');
});

app.get('/', (req, res) => {
  res.send({ message: 'Hello WWW!' });
});

app.listen(3333);
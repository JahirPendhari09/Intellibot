const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors());

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'C:/Users/USER/Desktop/videos');
    },
    filename: (req, file, cb) => {
        console.log(file);
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage });

app.post('/upload', upload.single('video'), (req, res) => {
    try {
        const videoUrl = `http://localhost:8080/videos/${req.file.filename}`;

        res.json({
            status: 'success',
            message: 'File uploaded successfully',
            videoUrl: videoUrl,
        });
    } catch (error) {
        console.error('Error uploading file', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

const port = 8080;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

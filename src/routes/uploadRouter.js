const express = require('express');
const multer = require('multer');
const router = express.Router();


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './upload')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
});
const upload = multer({ storage: storage });

// Route POST để upload file
router.post('/upload', upload.single('file'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }
        // Xây dựng URL hoàn chỉnh của hình ảnh
        const imageUrl = `http://localhost:3000/api/images/${req.file.filename}`;
        // Trả về URL của file đã upload
        res.status(200).json(imageUrl);
    } catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/images/:imageName', (req, res) => {
    try {
        const imageName = req.params.imageName;
        const path = require('path');
        const filePath = path.join(__dirname, '..', 'upload', imageName);

        res.sendFile(filePath);
    }
    catch (error) {
        console.error('Error get file:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;

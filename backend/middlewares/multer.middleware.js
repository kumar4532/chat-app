import fs from 'fs';
import path from 'path';
import multer from 'multer';

const __dirname = path.resolve();

const tempDir = path.join(__dirname, 'public/temp');
if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, tempDir); 
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

export const upload = multer({ storage });
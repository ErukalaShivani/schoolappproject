// pages/api/schools/index.js
import nextConnect from 'next-connect';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { getPool } from '../../../lib/db';

const uploadDir = path.join(process.cwd(), '/public/schoolImages');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const name = Date.now() + '-' + Math.round(Math.random() * 1e9) + ext;
    cb(null, name);
  }
});
const upload = multer({ storage });

const apiRoute = nextConnect({
  onError(error, req, res) {
    console.error(error);
    res.status(500).json({ error: `Something went wrong: ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
});

apiRoute.use(upload.single('image'));

apiRoute.post(async (req, res) => {
  try {
    const { name, address, city, state, contact, email_id } = req.body;
    const imageFile = req.file ? `/schoolImages/${req.file.filename}` : null;

    if (!name || !address || !city || !state || !contact || !email_id) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const pool = await getPool();
    const [result] = await pool.query(
      `INSERT INTO schools (name, address, city, state, contact, image, email_id)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [name, address, city, state, contact, imageFile, email_id]
    );

    res.status(201).json({ message: 'School added', id: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'DB error' });
  }
});

apiRoute.get(async (req, res) => {
  try {
    const pool = await getPool();
    const [rows] = await pool.query(`SELECT id, name, address, city, state, contact, image FROM schools ORDER BY id DESC`);
    res.status(200).json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'DB error' });
  }
});

export const config = {
  api: {
    bodyParser: false
  }
};

export default apiRoute;

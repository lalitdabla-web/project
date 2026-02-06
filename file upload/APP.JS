// server.js
import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";

const app = express();

// 1️⃣ Ensure upload folder exists
const uploadFolder = path.join(process.cwd(), "upload");
if (!fs.existsSync(uploadFolder)) {
  fs.mkdirSync(uploadFolder);
}

// 2️⃣ Configure Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadFolder);
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + path.extname(file.originalname);
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

// 3️⃣ HTML form route
app.get("/", (req, res) => {
  res.send(`
    <h1>File Upload Server</h1>
    <form method="post" action="/upload" enctype="multipart/form-data">
      <input type="file" name="myfile" />
      <button type="submit">Upload</button>
    </form>
  `);
});

// 4️⃣ POST route to handle file upload
app.post("/upload", upload.single("myfile"), (req, res) => {
  console.log("Uploaded File Info:", req.file);

  if (!req.file) {
    return res.status(400).send("No file uploaded!");
  }

  res.send("File uploaded successfully: " + req.file.filename);
});

// 5️⃣ Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

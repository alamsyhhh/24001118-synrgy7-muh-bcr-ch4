/**
 * Impor HTTP Standar Library dari Node.js
 * Hal inilah yang nantinya akan kita gunakan untuk membuat
 * HTTP Server
 */
const http = require('http');
const fs = require('fs');
const path = require('path');
const { PORT = 8000 } = process.env; // Ambil port dari environment variable

// Direktori publik yang berisi berkas-berkas yang dapat diakses publik
const PUBLIC_DIRECTORY = path.join(__dirname, '../public');

// Fungsi untuk menentukan tipe konten berdasarkan ekstensi berkas
function getContentType(filePath) {
  const extname = path.extname(filePath);
  switch (extname) {
    case '.html':
      return 'text/html';
    case '.css':
      return 'text/css';
    case '.js':
      return 'text/javascript';
    case '.png':
      return 'image/png';
    case '.jpg':
    case '.jpeg':
      return 'image/jpeg';
    case '.gif':
      return 'image/gif';
    default:
      return 'application/octet-stream';
  }
}

// Fungsi untuk menangani permintaan HTTP
function onRequest(req, res) {
  switch (req.url) {
    case '/':
      req.url = 'index.html';
      break;
    case '/cars':
      req.url = 'rentCar.html';
      break;
    // Tambahkan penanganan rute lain jika diperlukan
  }

  const filePath = path.join(PUBLIC_DIRECTORY, req.url);

  // Baca berkas dari sistem file
  fs.readFile(filePath, (err, data) => {
    if (err) {
      // Jika berkas tidak ditemukan, kirimkan respons 404
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('<h1>Halaman tidak ditemukan</h1>');
    } else {
      // Jika berkas ditemukan, kirimkan berkas beserta tipe konten yang sesuai
      const contentType = getContentType(filePath);
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(data);
    }
  });
}

// Buat instance server HTTP
const server = http.createServer(onRequest);

// Jalankan server
server.listen(PORT, 'localhost', () => {
  console.log('Server sudah berjalan, silahkan buka http://localhost:%d', PORT);
});

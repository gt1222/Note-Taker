const html = require('express').Router();
const path = require('path');

// GET /notes notes.html
html.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '../public/notes.html'))
);

// GET * return index.html
html.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '../public/index.html'))
);

module.exports = html;
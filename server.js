// dependencies
const express = require('express');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const api = require('./routes/index');
const html = require('./routes/index');
const { readAndAppend, readFromFile } = require('./helpers/fsUtils');

const app = express();
const PORT = process.env.PORT || 3001;

// middlware pasing JSON and urlencoded form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Routes
app.use('/api', api);
app.use('/', html);

// GET /notes notes.html
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// GET * return index.html
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET /api/notes read db.json file and return all saved notes
app.get('/api/notes', (req, res) =>
  readFromFile('/db/db.json').then((data)=> res.json(JSON.parse(data)))
);

// POST /api/notes
app.post('/api/notes', (req, res) => {
  const { title, text } = req.body;

  if(req.body) {
    const newNote = {
      title,
      text,
      id: uuidv4(),
    };

    readAndAppend(newNote, '/db/db.json');

    const response = {
      status: 'success',
      body: newNote,
    };

    res.json(response);
  } else {
    res.json('Error in adding note')
  }
});

// DELETE /api/notes/:id

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);

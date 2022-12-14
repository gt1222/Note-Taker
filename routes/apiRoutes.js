const api = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const {
    readFromFile,
    readAndAppend,
    writeToFile,
} = require('../helpers/fsUtils');

// GET /api/notes read db.json file and return all saved notes
api.get('/api/notes', (req, res) => {
    readFromFile('db/db.json').then((data)=> res.json(JSON.parse(data)))
});

// POST /api/notes
api.post('/api/notes', (req, res) => {
  console.log(req.body);
  const { title, text } = req.body;

  if(req.body) {
    const newNote = {
      title,
      text,
      id: uuidv4(),
    };

    readAndAppend(newNote, 'db/db.json');
    res.json('Note addd successfully');
  } else {
    res.json('Error in adding note');
  }
});

// DELETE /api/notes/:id

// `GET /api/notes` should read the `db.json` file and return all saved notes as JSON.

// `POST /api/notes` should receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client. You'll need to find a way to give each note a unique id when it's saved (look into npm packages that could do this for you).

// `DELETE /api/notes/:id` should receive a query parameter that contains the id of a note to delete. To delete a note, you'll need to read all notes from the `db.json` file, remove the note with the given `id` property, and then rewrite the notes to the `db.json` file.

module.exports = api;
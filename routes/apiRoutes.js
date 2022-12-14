const api = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const {
    readFromFile,
    readAndAppend,
    writeToFile,
} = require('../helpers/fsUtils');

// GET /api/notes read db.json file and return all saved notes
api.get('/notes', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
});

// POST /api/notes
api.post('/notes', (req, res) => {
    console.log(req.body);
    const { title, text } = req.body;

    if (req.body) {
        const newNote = {
            title,
            text,
            noteId: uuidv4(),
        };

        readAndAppend(newNote, './db/db.json');
        res.json('Note addd successfully');
    } else {
        res.json('Error in adding note');
    }
});

// DELETE /api/notes/:id
api.delete('/notes/:id', (req, res) => {
    const id = req.params.noteId;
    readFromFile('./db/db.json')
        .then((data) => JSON.parse(data))
        .then((json) => {
            const result = json.filter((note) => note.noteId !== id);

            writeToFile('./db/db.json', result);
            res.json(`Note ${id} has been deleted`);
        });
});

module.exports = api;
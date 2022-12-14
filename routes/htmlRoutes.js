const html = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const {
    readFromFile,
    readAndAppend,
    writeToFile,
} = require('../helpers/fsUtils');
// `GET /notes` should return the `notes.html` file.

// `GET *` should return the `index.html` file.

module.exports = html;
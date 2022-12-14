// dependencies
const express = require('express');
const api = require('./routes/apiRoutes');
const html = require('./routes/htmlRoutes');

const app = express();
const PORT = process.env.PORT || 3001;

// middlware pasing JSON and urlencoded form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Routes
app.use('/api', api);
app.use('/', html);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);

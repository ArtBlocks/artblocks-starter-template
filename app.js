const express = require('express');
const handlebars = require('express-handlebars');
const utils = require('./utils');
const md = require('markdown-it')();

const app = express();
const port = 3000;

app.set('view engine', 'hbs');
app.engine(
  'hbs',
  handlebars({
    layoutsDir: __dirname + '/views/layouts',
    extname: 'hbs',
    defaultLayout: 'index',
    partialsDir: __dirname + '/views/partials/',
  }),
);

app.use(express.static('public'));

app.get('/', (req, res) => {
  const readme = md.render(utils.getReadme());
  
  res.render('main', {
    pieces: utils.getPieces(),
    readme
  });
});

app.get('/:route', (req, res) => {
  res.render('piece', {
    scriptName: `${req.params.route}.js`,
    pieces: utils.getPieces()
  });
});

app.get('*', (req, res) => {
  res.status(404).send('Not found');
});

app.listen(port, () => {
  console.log('Server running on port 3000');
});

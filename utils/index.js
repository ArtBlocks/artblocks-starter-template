const fs = require('fs');

const getPieces = () => {
  const files = fs.readdirSync(`${__dirname}/../public/js/pieces`);
  const pieces = files.map((file) => file.slice(0, -3))
  return pieces;
}

const getReadme = () => {
  return fs.readFileSync(`${__dirname}/../README.md`, 'utf8');
}

module.exports = {
  getPieces,
  getReadme,
}

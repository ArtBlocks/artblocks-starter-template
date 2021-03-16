const fs = require('fs');
const pJson = require('../package.json');

const getPieces = () => {
  const files = fs.readdirSync(`${__dirname}/../public/js/pieces`);
  const pieces = files.map((file) => file.slice(0, -3))
  return pieces;
};

const getReadme = () => {
  return fs.readFileSync(`${__dirname}/../README.md`, 'utf8');
};

const getNavAttributes = () => {
  return {
    pieces: getPieces(),
    version: pJson.version
  }
};

module.exports = {
  getPieces,
  getReadme,
  getNavAttributes,
};

const fs = require('fs');

const getPieces = () => {
  const files = fs.readdirSync('./public/js/pieces');
  const pieces = files.map((file) => file.slice(0, -3))
  return pieces;
}

module.exports = {
  getPieces,
}

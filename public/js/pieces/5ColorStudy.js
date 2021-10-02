// Turn the hash into hash pairs.
// This means 0xeca4cf6288eb455f388301c28ac01a8da5746781d22101a65cb78a96a49512c8
// turns into ["ec", "a4", "cf", "62", "88", "eb", ...]
const hashPairs = [];
for (let j = 0; j < 32; j++) {
  hashPairs.push(tokenData.hash.slice(2 + (j * 2), 4 + (j * 2)));
}

// Parse the hash pairs into ints. Hash pairs are base 16 so "ec" becomes 236.
// Each pair will become a value ranging from 0 - 255
const decPairs = hashPairs.map(x => {
  return parseInt(x, 16);
});

// Grab the first 16 values of the hash to use as a noise seed.
const seed = parseInt(tokenData.hash.slice(0, 16), 16);

let numShapes = 0;

function setup() {
  // Grab the smaller of the window sizes and use that as the canvas size.
  const smallerDimension = windowWidth < windowHeight ? windowWidth : windowHeight;
  createCanvas(smallerDimension, smallerDimension);

  // See the noise value.
  noiseSeed(seed);

  const padding = width/25;

  // Define the grid area as the width of the canvas minus the padding.
  const gridArea = width - padding;

  let total;
  for (let i = 0; i < decPairs.length; i++) {
    if (decPairs[i] > 128) {
      numShapes++;
    }
    total += decPairs[i];

  }

  let mean = total / decPairs.length;
  let std = getStandardDeviation(decPairs, mean); 
  numShapes = numShapes/2;
  noStroke();
  // Move to the center of the canvas and draw a square that encompasses the canvas.
  push();
  translate(width/2, width/2);
  rectMode(CENTER)
  square(0,0,width - padding/2);
  pop();
  
  // Account for the padding and define the size of each cell in the grid.
  translate(padding/2, padding/2);
  const cellSize = gridArea/(numShapes + 1);
  for(let i = 0; i < numShapes; i++) {
    rectangle(width/4*(noise(width/2)), height*(noise(width/2)),
        Math.abs(decPairs[i]-(width/2*Math.abs(randomGaussian(mean, std)))), Math.abs(height-(height*(noise(i)))), TWO_PI/Math.abs(randomGaussian(mean, std)), decPairs[i]);
  }
}

function draw() {

}

function rectangle(x,y,w,h,angle, color) {
  console.log(x + " " + y + " " + w + " " + h + " " + angle + " ");
  while(y+h>width) {
    y--;
  } 
  while(y+w>width) {
    y--;
  }
  while(y+w>height) {
    y--;
  }
  while(x+h>height) {
    h--;
  }
  while(x+w>width) {
    w--;
  }
  while(x+h>width) {
    w--;
  }
  while(x+w>height) {
    w--;
  }
  
  beginShape();
  fill(color);
  translate(width/4,0);
  rect(x,y,w/2,h);
  rotate(PI/angle);
  endShape();
}

function getStandardDeviation (array, mean) {
  const n = array.length
  return Math.sqrt(array.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n)
}
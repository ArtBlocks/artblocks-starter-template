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

// Grab the first hash pair int to use as a line thickness value.
const lineThickness = decPairs[1];

// Grab three different different hash pair ints to use as RGB values.
const rColor = decPairs[28];
const gColor = decPairs[29];
const bColor = decPairs[30];

const waterSeed = decPairs[0];

function setup() {
  //#region Setup
  // Grab the smaller of the window sizes and use that as the canvas size.
  const smallerDimension = windowWidth < windowHeight ? windowWidth : windowHeight;
  createCanvas(smallerDimension, smallerDimension);

  // See the noise value.
  noiseSeed(seed);

  // Create the variable values.
  const padding = width/25;

  // Define the grid area as the width of the canvas minus the padding.
  const gridArea = width - padding;

  // Colors
  var backgroundColors = ["#a4aa79"];

  // Move to the center of the canvas and draw a square that encompasses the canvas.
  push();
  translate(width/2, width/2);
  rectMode(CENTER)
  noStroke();
  fill("#a4aa79"); //Green
  square(0,0,width - padding/2);
  pop();

  // Account for the padding and define the size of each cell in the grid.

  //#endregion Setup
  let waterSeed = seed;
  drawWater(height-padding/4, width-padding/4, padding/4, "#93b3c4", waterSeed);
}

function draw() {

}

function drawWater(height, width, padding, color, seed) {
  fill(color); //dark blue
  noStroke();
  var x1 = width;
  var y1 = height;
  var x2 = width;
  var y2 = height;
  var x3 = width;
  var y3 = height;

  if(waterSeed > 128) {
    x1 = padding;
    y2 = height;
    x3 = padding;
    y1 = height - decPairs[1];
    x2 = padding + decPairs[1];
    y3 = height;
  } else {
    x3 = width - decPairs[1];
    y2 = height - decPairs[1];
  }
  triangle(x1, x2,
      x2, y2,
      x3, y3);
      curve(5, 26, 73, 24, 73, 61, 15, 65);
}

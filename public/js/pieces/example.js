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

function setup() {
  // Grab the smaller of the window sizes and use that as the canvas size.
  const smallerDimension = windowWidth < windowHeight ? windowWidth : windowHeight;
  createCanvas(smallerDimension, smallerDimension);

  // See the noise value.
  noiseSeed(seed);

  // Create the variable values.
  const numCircles = 50;
  const padding = width/25;

  // Define the grid area as the width of the canvas minus the padding.
  const gridArea = width - padding;

  // Move to the center of the canvas and draw a square that encompasses the canvas.
  push();
  translate(width/2, width/2);
  rectMode(CENTER)
  square(0,0,width - padding/2);
  pop();

  // Account for the padding and define the size of each cell in the grid.
  translate(padding/2, padding/2);
  const cellSize = gridArea/(numCircles + 1);

  // Set the circle fill color.
  fill(rColor, gColor, bColor);

  // Set the strokeWeight by turning the 0 - 255 value into a 0 - 5 value.
  strokeWeight(map(lineThickness, 0, 255, 0, 5));

  // Loop through each cell in the grid and place an ellipse.
  let xOff = 0;
  for(let x = 0; x < numCircles; x++) {
    let yOff = 0;
    for(let y = 0; y < numCircles; y++) {
      // Set the ellipse size based on noise.
      const ellipseSize = map(noise(xOff, yOff), 0, 1, 0, cellSize);
      
      // Create the ellipse.
      ellipse(cellSize * (x + 1), cellSize * (y + 1), ellipseSize, ellipseSize);
      yOff += .1;
    }
    xOff += .1;
  }
}

function draw() {

}

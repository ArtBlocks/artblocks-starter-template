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
  // Define the curve points as JavaScript objects
  let v = 20;
  noStroke();

  while (v + 65 < height){
    v += 10;
    let p1 = { x: 0, y: 26 + v};
    let p2 = { x: 73, y: 24 + v };
    let p3 = { x: 130, y: 61 + v};
    let p4 = { x: 255, y: 65 + v};
    let p5 = { x: 280, y: 10 + v};
    let p6 = { x: 350, y: 85 + v};
    let p7 = { x: 450, y: 10 + v};
    let p8 = { x: width, y: 10 + v};
 //   rotate(PI/3/decPairs[0]-decPairs[2]*decPairs[5]);
    let res = 10;
    drawSnake(p1,p2,p3,p4, res);
    drawSnake(p4,p5,p6,p7, res);

  }
}

function drawSnake(p1, p2, p3, p4, res) {

  curve(p1.x, p1.y, p1.x, p1.y, p2.x, p2.y, p3.x, p3.y);
  curve(p1.x-res, p1.y+res, p1.x-res, p1.y+res, p2.x-res, p2.y+res, p3.x-res, p3.y+res);
  stroke(0)
  curve(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y, p4.x, p4.y);
  curve(p1.x-res, p1.y+res, p2.x-res, p2.y+res, p3.x-res, p3.y+res, p4.x-res, p4.y+res);
  curve(p2.x, p2.y, p3.x, p3.y, p4.x, p4.y, p4.x, p4.y);
  curve(p2.x-res, p2.y+res, p3.x-res, p3.y+res, p4.x-res, p4.y+res, p4.x-res, p4.y+res);
}

function draw() {

}

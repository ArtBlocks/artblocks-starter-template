const hashPairs = [];
for (let i = 0; i < 1; i++) {
     for (let j = 0; j < 32; j++) {
          hashPairs.push(tokenData.hash.slice(2 + (j * 2), 4 + (j * 2)));
     }
}

const decPairs = hashPairs.map(x => {
     return parseInt(x, 16);
});

const seed = parseInt(tokenData.hash.slice(0, 16), 16);
const lineThickness = decPairs[1];
const rColor = decPairs[28];
const gColor = decPairs[29];
const bColor = decPairs[30];

function setup() {
  const canvasX = windowWidth;
  const canvasY = canvasX;
  createCanvas(canvasX, canvasY);

  noiseSeed(seed);
  const numCircles = 50;
  const padding = canvasX/25;
  const drawableArea = windowWidth - padding;

  push();
  translate(canvasX/2, canvasY/2);
  rectMode(CENTER)
  square(0,0,canvasX - padding/2);
  pop();

  translate(padding/2, padding/2);
  const gridSize = drawableArea/(numCircles + 1);

  fill(rColor, gColor, bColor);
  strokeWeight(map(lineThickness, 0, 255, 0, 5));
  let xOff = 0;
  for(let x = 0; x < numCircles; x++) {
    let yOff = 0;
    for(let y = 0; y < numCircles; y++) {
      push();
      const ellipseSize = map(noise(xOff, yOff), 0, 1, 0, gridSize);
      ellipse(gridSize * (x + 1), gridSize * (y + 1), ellipseSize, ellipseSize);
      pop();
      yOff += .1;
    }
    xOff += .1;
  }
}

function draw() {

}

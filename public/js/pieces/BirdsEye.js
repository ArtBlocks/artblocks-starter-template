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

let gxZero = 0;
let gyZero = 0;
let gHeight = 0;
let gWidth = 0;

let roadColor, grassColor, dirtColor, carColor, carWindowColor, shadowColor;
let pg;
function setup() {
  //#region Setup
  // Grab the smaller of the window sizes and use that as the canvas size.
  const smallerDimension = windowWidth < windowHeight ? windowWidth : windowHeight;
  let canvas = createCanvas(smallerDimension, smallerDimension);
  // See the noise value.
  // Colors
  roadColor = [[165,165,165,255]];
  dirtColor = [[209,204,178,255]];
  grassColor = [[159,170,109,255]];
  carColor = [[229,218,190,255]];
  carWindowColor = [[58,58,58,255]];
  shadowColor = [[10,10,10,255]];
  // Create the variable values.
  const padding = width/25;

  // Define the grid area as the width of the canvas minus the padding.
  gWidth = width-padding/4;
  gHeight = height-padding/4;
  gxZero = padding/4;
  gyZero = padding/4;
  strokeWeight(1);
  stroke(shadowColor[0][0], shadowColor[0][1],shadowColor[0][2],shadowColor[0][3]);

}

let loop = 0;
function draw() {
    recursion(0,height/2, width, height/2, 100, 0)
    colorIn();
    noLoop();
}

function recursion(x1, y1, x2, y2, minSize, index) {
    
    if(x2-x1 < minSize) {
        return;
    }
    if(x1 < 0 || x1 > width || x2 < 0 || x2 > width || 
        y1 < 0 || y1 > height || y2 < 0 || y2 > height) {
        return;
    }
    
    //100 x 100
    //0,50,100,50
    if(index === 4) {
        index = 0;
    }
    let seed = decPairs[index];
    let xChange = ((x2-x1)/2)*(seed/256)+minSize-1;
    let yChange = ((y2)/2)*(seed/256)+minSize-1;
    beginShape(); 
    curveVertex(x1, y1);
    curveVertex(x2, y2);
    endShape();
    
    line(x1,y1,x2,y2);
    line(x2-x1, y2-y1, x2-x1, y2);
    line(x2+x1, y2-y1, x2+x1, y2);
    line(x1, y2-y1, x1, y2);
    line(x2, y2-y1, x2, y2);
   
    if(decPairs[0] > 128) {
        line(x2, y2, x2, y2 + y1);
    } else {
        line(x1, y2, x1, y2 + y1);
    }
   
    recursion(x1, y1-yChange, x2-xChange, y1-yChange, minSize, index+1)
    recursion(x1, y1+yChange, x2-xChange, y1+yChange, minSize, index+1)
    recursion(x1+xChange, y1-yChange, x2, y1-yChange, minSize, index+1)
    recursion(x1+xChange, y1+yChange, x2, y1+yChange, minSize, index+1)
}

function colorIn() {
    let r;
    let g;
    let b;
    let a;
    let r2;
    let g2;
    let b2;
    let a2;
    const myColors = [[209,204,178,200], [159,170,109,255], [209,204,178,255], [229,218,190,255],
        [209,154,178,40], [159,10,109,255], [209,204,178,35], [229,54,190,255],
        [209,2,78,150], [19,170,109,225], [209,204,178,255], [229,218,190,255]];
    let switchColor = 0;
  
    loadPixels();
    for (let i = 0; i < 16 * (width * height); i += 4) {
       
        r = pixels[i];
        g = pixels[i + 1];
        b = pixels[i + 2];
        a = pixels[i + 3];
        if (!isColor(r, g, b, a, 0, shadowColor)) {
            r2 = myColors[switchColor][0];
            g2 = myColors[switchColor][1];
            b2 = myColors[switchColor][2];
            a2 = myColors[switchColor][3];
            pixels[i] = r2;
            pixels[i+1] = g2;
            pixels[i+2] = b2;
            pixels[i+3] = 255;
        } else {
            if(switchColor === myColors.length-1) {
                switchColor = 0;
            } else {
                switchColor = switchColor + 1;
            }
        }
    }
    updatePixels();
}
function colorIn2() {
    let r;
    let g;
    let b;
    let a;
    let r2;
    let g2;
    let b2;
    let a2;
    const myColors = [[209,204,178,255], [159,170,109,255], [209,204,178,255], [229,218,190,255]];
    let switchColor = 0;
    
    for (let i = 0; i < width; i++) {
        for (let j = 0; j < height; j++) {
            r = pixels[i];
            g = pixels[i + 1];
            b = pixels[i + 2];
            a = pixels[i + 3];
            if (!isColor(r, g, b, a, 0, shadowColor)) {
                r2 = myColors[switchColor][0];
                g2 = myColors[switchColor][1];
                b2 = myColors[switchColor][2];
                a2 = myColors[switchColor][3];
                pixels[i] = r2;
                pixels[i + 1] = g2;
                pixels[i + 2] = b2;
                pixels[i + 3] = a2;
            } else {
                if (switchColor === myColors.length - 1) {
                    switchColor = 0;
                } else {
                    switchColor = switchColor + 1;
                }
            }
        }
    }
    updatePixels();
}

function isColor(r,g,b,a, index, color) {
    return r === color[index][0] &&
        g === color[index][1] &&
        b === color[index][2];
}
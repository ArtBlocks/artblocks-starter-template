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

let roadPixel = 1;
let dirtPixel = 2;
let grassPixel = 0;

let isDirt = false;
let roadColor, grassColor, dirtColor, carColor, carWindowColor, shadowColor;
let car, car2;
let pR;
function setup() {
  //#region Setup
  // Grab the smaller of the window sizes and use that as the canvas size.
  const smallerDimension = windowWidth < windowHeight ? windowWidth : windowHeight;
  let canvas = createCanvas(smallerDimension, smallerDimension);
  // See the noise value.
  noiseSeed(seed);
  // Colors
  roadColor = [[165,165,165,255]];
  dirtColor = [[209,204,178,255]];
  grassColor = [[159,170,109,255]];
  carColor = [[229,218,190,255]];
  carWindowColor = [[58,58,58,255]];
  shadowColor = [[73,73,73,80]];
  // Create the variable values.
  const padding = width/25;

  // Define the grid area as the width of the canvas minus the padding.
  gWidth = width-padding/4;
  gHeight = height-padding/4;
  gxZero = padding/4;
  gyZero = padding/4;
  strokeCap(SQUARE);
    // Move to the center of the canvas and draw a square that encompasses the canvas.
  push();
  translate(width/2, width/2);
  rectMode(CENTER)
  noStroke();
  fill(grassColor[0][0],grassColor[0][1],grassColor[0][2]);
  square(0,0,width - padding/2);
  pop();
  //#endregion
  let y1 = 200;
  let cary1 = 
  drawHorizontalRoad(50, 250);
  drawHorizontalRoad(50, 300);
  drawHorizontalRoad(50, 500);
  
  drawVerticalRoad(50,500);
  drawVerticalRoad(50,230);
  drawVerticalRoad(50,100);
  
  car = new Car(gxZero, 250+5, 0, carColor[0], shadowColor[0], carWindowColor[0], 50, 1);
  car2 = new Car(gWidth, 250-17, 1, carColor[0], shadowColor[0], carWindowColor[0], 50, 1);
  car3 = new Car(gxZero, 300+5, 0, carColor[0], shadowColor[0], carWindowColor[0], 50, 2);
  car4 = new Car(gWidth, 300-17, 1, carColor[0], shadowColor[0], carWindowColor[0], 50, 2);
  drawDirt(); 
  isDirt = true;
}

function draw() {  
    push();
    car.move();
    car2.move();
    car3.move();
    car4.move();
    car.display();  
    car2.display();
    car3.display();
    car4.display();
    pop();
}

function drawHorizontalRoad(res, y) {
    noStroke();
    strokeWeight(res);
    noFill();
    stroke(roadColor[0][0],roadColor[0][1],roadColor[0][2]);
    line(gxZero, y, gWidth, y);
}

function drawVerticalRoad(res, x) {
    noStroke();
    strokeWeight(res);
    noFill();
    stroke(roadColor[0][0],roadColor[0][1],roadColor[0][2]);
    line(x, gyZero, x, gHeight);
}

function drawDiagonalDownLeftToRight(res, x) {
    noStroke();
    strokeWeight(res);
    noFill();
    
    stroke(roadColor[0][0],roadColor[0][1],roadColor[0][2]);
    line(x, gyZero, gWidth, gHeight);
}

function drawDiagonalUpLeftToRight(res, x) {
    noStroke();
    strokeWeight(res);
    noFill();
    stroke(roadColor[0][0],roadColor[0][1],roadColor[0][2]);
    line(x, gHeight, gWidth, gyZero);
}

function drawDirt() {
    let r;
    let g;
    let b;
    let a;
    let r2;
    let g2;
    let b2;
    let a2;
    let index5Above;
    let index4Above;
    let index3Above;
    let index2Above;
    let index1Above;
    let index5Below;
    let index4Below;
    let index3Below;
    let index2Below;
    let index1Below;
    loadPixels();
    let index1Below2;
    let index2Below2;
    let index3Below2;
    let index1Above2;
    let index2Above2;
    let index3Above2;
    let r3;
    let g3;
    let b3;
    let a3;
    for (let i = 0; i < 16 * (width * height); i += 4) {
        r = pixels[i];
        g = pixels[i + 1];
        b = pixels[i + 2];
        a = pixels[i + 3];
        if (isColor(r, g, b, a, 0, roadColor)) {
            index5Above = i - 5 * 4;
            index4Above = i - 4 * 4;
            index3Above = i - 3 * 4;
            index2Above = i - 2 * 4;
            index1Above = i - 4;
            index5Below = i + 5 * 4;
            index4Below = i + 4 * 4;
            index3Below = i + 3 * 4;
            index2Below = i + 2 * 4;
            index1Below = i + 4;
            if (index5Above >= 0) {
                r2 = pixels[index5Above];
                g2 = pixels[index5Above + 1];
                b2 = pixels[index5Above + 2];
                a2 = pixels[index5Above + 3];
                if (isColor(r2, g2, b2, a2, 0, grassColor)) {
                    pixels[index5Above] = dirtColor[0][0];
                    pixels[index5Above + 1] = dirtColor[0][1];
                    pixels[index5Above + 2] = dirtColor[0][2];
                    pixels[index5Above + 3] = dirtColor[0][3];
                    pixels[index4Above] = dirtColor[0][0];
                    pixels[index4Above + 1] = dirtColor[0][1];
                    pixels[index4Above + 2] = dirtColor[0][2];
                    pixels[index4Above + 3] = dirtColor[0][3];
                    pixels[index3Above] = dirtColor[0][0];
                    pixels[index3Above + 1] = dirtColor[0][1];
                    pixels[index3Above + 2] = dirtColor[0][2];
                    pixels[index3Above + 3] = dirtColor[0][3];
                    pixels[index2Above] = dirtColor[0][0];
                    pixels[index2Above + 1] = dirtColor[0][1];
                    pixels[index2Above + 2] = dirtColor[0][2];
                    pixels[index2Above + 3] = dirtColor[0][3];
                    pixels[index1Above] = dirtColor[0][0];
                    pixels[index1Above + 1] = dirtColor[0][1];
                    pixels[index1Above + 2] = dirtColor[0][2];
                    pixels[index1Above + 3] = dirtColor[0][3];
                    i = i + 35 * 4;
                    continue;
                }
            }
            if (pixels.length > (index5Below + 3)) {
                r2 = pixels[index1Below];
                g2 = pixels[index1Below + 1];
                b2 = pixels[index1Below + 2];
                a2 = pixels[index1Below + 3];
                if (isColor(r2, g2, b2, a2, 0, grassColor)) {
                    pixels[index5Below] = dirtColor[0][0];
                    pixels[index5Below + 1] = dirtColor[0][1];
                    pixels[index5Below + 2] = dirtColor[0][2];
                    pixels[index5Below + 3] = dirtColor[0][3];
                    pixels[index4Below] = dirtColor[0][0];
                    pixels[index4Below + 1] = dirtColor[0][1];
                    pixels[index4Below + 2] = dirtColor[0][2];
                    pixels[index4Below + 3] = dirtColor[0][3];
                    pixels[index3Below] = dirtColor[0][0];
                    pixels[index3Below + 1] = dirtColor[0][1];
                    pixels[index3Below + 2] = dirtColor[0][2];
                    pixels[index3Below + 3] = dirtColor[0][3];
                    pixels[index2Below] = dirtColor[0][0];
                    pixels[index2Below + 1] = dirtColor[0][1];
                    pixels[index2Below + 2] = dirtColor[0][2];
                    pixels[index2Below + 3] = dirtColor[0][3];
                    pixels[index1Below] = dirtColor[0][0];
                    pixels[index1Below + 1] = dirtColor[0][1];
                    pixels[index1Below + 2] = dirtColor[0][2];
                    pixels[index1Below + 3] = dirtColor[0][3];
                    continue;
                }
            }
            index3Above2 = i - (3 * width * 16);
            index2Above2 = i - (2 * width * 16);
            index1Above2 = i - (width * 16);
            index3Below2 = i + (3 * width * 16);
            index2Below2 = i + (2 * width * 16);
            index1Below2 = i + (width * 16);
            if (index3Above2 >= 0) {
                r3 = pixels[index3Above2];
                g3 = pixels[index3Above2 + 1];
                b3 = pixels[index3Above2 + 2];
                a3 = pixels[index3Above2 + 3];
                if (isColor(r3, g3, b3, a3, 0, grassColor)) {
                    pixels[index3Above2] = dirtColor[0][0];
                    pixels[index3Above2 + 1] = dirtColor[0][1];
                    pixels[index3Above2 + 2] = dirtColor[0][2];
                    pixels[index3Above2 + 3] = dirtColor[0][3];
                    pixels[index2Above2] = dirtColor[0][0];
                    pixels[index2Above2 + 1] = dirtColor[0][1];
                    pixels[index2Above2 + 2] = dirtColor[0][2];
                    pixels[index2Above2 + 3] = dirtColor[0][3];
                    pixels[index1Above2] = dirtColor[0][0];
                    pixels[index1Above2 + 1] = dirtColor[0][1];
                    pixels[index1Above2 + 2] = dirtColor[0][2];
                    pixels[index1Above2 + 3] = dirtColor[0][3];
                    continue;
                }
            }
            if (pixels.length > (index3Below2 + 3)) {
                r3 = pixels[index1Below2];
                g3 = pixels[index1Below2 + 1];
                b3 = pixels[index1Below2 + 2];
                a3 = pixels[index1Below2 + 3];
                if (isColor(r3, g3, b3, a3, 0, grassColor)) {
                    pixels[index3Below2] = dirtColor[0][0];
                    pixels[index3Below2 + 1] = dirtColor[0][1];
                    pixels[index3Below2 + 2] = dirtColor[0][2];
                    pixels[index3Below2 + 3] = dirtColor[0][3];
                    pixels[index2Below2] = dirtColor[0][0];
                    pixels[index2Below2 + 1] = dirtColor[0][1];
                    pixels[index2Below2 + 2] = dirtColor[0][2];
                    pixels[index2Below2 + 3] = dirtColor[0][3];
                    pixels[index1Below2] = dirtColor[0][0];
                    pixels[index1Below2 + 1] = dirtColor[0][1];
                    pixels[index1Below2 + 2] = dirtColor[0][2];
                    pixels[index1Below2 + 3] = dirtColor[0][3];
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

class Car {
    constructor(x, y, direction, color, shadow, windowColor, size, speed) {
        this.x = x;
        this.y = y;
        this.direction = direction;
        this.color = color;
        this.shadow = shadow;
        this.size = size;
        this.speed = speed;
        this.windowColor = windowColor;
        if(this.direction === 0) {
            this.width = this.size;
            this.height = this.size/2.8;
        }
        if(this.direction === 1) {
            this.width = this.size;
            this.height = this.size/2.8;
        }
    }
    
    move() {
        if(this.direction === 0) {
            if(this.x >= gxZero && this.x < gWidth) {
                let oldX = this.x;
                this.x += this.speed;
                noStroke();
                fill(roadColor[0], roadColor[1], roadColor[2], roadColor[3]);
                rect(this.x - 4, this.y - 3.5, this.width, this.height + 2.5);
                if(oldX+this.size >= gWidth) {
                    noStroke();
                    fill(255,255,255,255);
                    rect(gWidth, 0, this.width, gHeight);
                 
                }
                if(oldX === gxZero) {
                    noStroke();
                    fill(255,255,255,255);
                    rect(0, 0, gxZero, gHeight);
                }
            }//Move left to right
        }
        if(this.direction === 1) {
            if(this.x > gxZero && this.x <= gWidth) {
                let oldX = this.x;
                this.x -= this.speed;
                noStroke();
                fill(roadColor[0], roadColor[1], roadColor[2], roadColor[3]);
                rect(this.width+this.x, this.y - 2.2, this.width, this.height + 1);
                noStroke();
                fill(255,255,255,255);
                rect(gWidth, 0, this.width, gHeight);
                noStroke();
                fill(255,255,255,255);
                rect(0, 0, gxZero, gHeight);
            }//Move right to left
        }
    }

    display() {
        noStroke();
        if(this.x < gWidth) {
            noStroke();
            if(this.direction === 0) {
                if(this.x-1 > gxZero) {
                    fill(this.shadow[0], this.shadow[1], this.shadow[2], this.shadow[3]);
                    rect(this.x + 1, this.y - 1, this.width, this.height);
                    fill(this.color[0], this.color[1], this.color[2], this.color[3]);
                    rect(this.x, this.y - 2.5, this.width, this.height);
                    fill(this.shadow[0], this.shadow[1], this.shadow[2], this.shadow[3]);
                    rect((this.x + this.size * .4) - 1.8, this.y - 1.8, this.width / 3, this.height * .8);
                    fill(this.windowColor[0], this.windowColor[1], this.windowColor[2], this.windowColor[3]);
                    rect(this.x + this.size * .4, this.y - 1.5, this.width / 3, this.height * .8);
                }
            }
            if(this.direction === 1) {
                if(this.x+1 < gWidth) {
                    fill(this.shadow[0], this.shadow[1], this.shadow[2], this.shadow[3]);
                    rect(this.x + 1, this.y - 1, this.width, this.height);
                    fill(this.color[0], this.color[1], this.color[2], this.color[3]);
                    rect(this.x, this.y - 2.5, this.width, this.height);
                    fill(this.shadow[0], this.shadow[1], this.shadow[2], this.shadow[3]);
                    rect((this.x + this.size * .3) + 1.8, this.y-1.5, this.width / 3, this.height * .8);
                    fill(this.windowColor[0], this.windowColor[1], this.windowColor[2], this.windowColor[3]);
                    rect(this.x + this.size * .3, this.y-1.5, this.width / 3, this.height * .8);
                }
            }
        }
    }
}
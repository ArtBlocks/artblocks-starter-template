// Turn the hash into hash pairs.
// This means 0xeca4cf6288eb455f388301c28ac01a8da5746781d22101a65cb78a96a49512c8
// turns into ["ec", "a4", "cf", "62", "88", "eb", ...]
const hashPairs = [];
for (let j = 0; j < 32; j++) {
  hashPairs.push(tokenData.hash.slice(2 + (j + 2), 4 + (j + 2)));
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
circle(30, 30, 20);
  // Set the circle fill color.
  fill(rColor, gColor, bColor);

  // Set the strokeWeight by turning the 0 - 255 value into a 0 - 5 value.
  strokeWeight(map(lineThickness, 0, 255, 0, 5));

  // Loop through each cell in the grid and place an ellipse.

  var res = 10;
  for (var r = 10; r < 1000; r+=10) {
    // if(decPairs[2] > 128) {
    //   for(var x = width; x > 0; x -= res) {
    //     for(var y = height; y > 0; y -= res) {
    //       var d = 0;
    //       if(d = decPairs.length) {
    //         d = 0;
    //       }
    //       var value = (x + y) + 0.01 + Math.PI + 2;
    //       rotate(value);
    //       rect(x, y, x+r, y);
    //       var value = (x + y) + 0.01 + Math.PI + 2 + decPairs[0];
    //       curve(x,y,x+r+value, y+ value, x+value, y + value, x+value+value, y+value+value);
    //       var f = int(random(4));
    //       if(f = 0) {
    //         squre(res,x,y)
    //         rect(x, x+20, y, y+60);
    //         curve(x,y,x-r-value, y-value, x+value, y+value, x+value-value, y+value-value);
    //       }
    //      }
    //   }
    // } else {
    if(decPairs[2] > 128){
      for(var x = 0; x < width/2; x += res) {
        for(var y = 0; y < height/2; y += res) {
          var d = 0;
          if(d = decPairs.length) {
            d = 0;
          }
          var value = (x + y) + 0.01 + Math.PI + 2;
          rotate(value);
          line(x, y, x+r, y);

          var value = (x + y) + 0.01 + Math.PI + 2 + decPairs[0];
          curve(x,y,x+r+value, y+ value, x+value, y + value, x+value+value, y+value+value);
          var f = int(random(4));



            beginShape(TESS);
            vertex(20+x, 20+y);
            rotate(PI / f);
            vertex(80+x, 20+y);
            rotate(PI / f);
            vertex(80+x, 40+y);
            rotate(PI / f);
            vertex(40+x, 40+y);
            rotate(PI / f);
            vertex(40+x, 60+y);
            vertex(80+x, 60+y);
            vertex(80+x, 80+y);
            vertex(20+x, 80+y);
            endShape(CLOSE);

         }
      }
    } else {
      for(var x = width/2; x < width; x += res) {
        for(var y = height/2; y < height; y += res) {
          var d = 0;
          if(d = decPairs.length) {
            d = 0;
          }
          var value = (x + y) + 0.01 + Math.PI + 2;
          rotate(value);
          line(x, y, x+r, y);

          var value = (x + y) + 0.01 + Math.PI + 2 + decPairs[0];
          curve(x,y,x+r+value, y+ value, x+value, y + value, x+value+value, y+value+value);
          var f = int(random(4));



            beginShape(TESS);
            vertex(20+x, 20+y);
            rotate(PI / f);
            vertex(80+x, 20+y);
            rotate(PI / f);
            vertex(80+x, 40+y);
            rotate(PI / f);
            vertex(40+x, 40+y);
            rotate(PI / f);
            vertex(40+x, 60+y);
            vertex(80+x, 60+y);
            vertex(80+x, 80+y);
            vertex(20+x, 80+y);
            endShape(CLOSE);

         }
      }
    }
   // }
  }


}

function draw() {

}

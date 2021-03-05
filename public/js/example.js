let hashPairs = [];
for (let i = 0; i < 1; i++) {
     for (let j = 0; j < 32; j++) {
          hashPairs.push(tokenData.hash.slice(2 + (j * 2), 4 + (j * 2)));
     }
}
let decPairs = hashPairs.map(x => {
     return parseInt(x, 16);
});

let seed = parseInt(tokenData.hash.slice(0, 16), 16);
let backgroundIndex = 0;
let backgroundArray = [255, 225, 200, 175, 150, 125, 100, 75, 50, 25, 0, 25, 50, 75, 100, 125, 150, 175, 200, 225];
let index = 0;
let ht;
let wt = 2;
let speed = 1;
let segments;
let amp = 1;
let direction = 1;
let loops = false;
let startColor = decPairs[29];
let reverse = decPairs[30] < 128;
let slinky = decPairs[31] < 35;
let pipe = decPairs[22] < 32;
let bold = decPairs[23] < 15;
let segmented = decPairs[24] < 30;
let fuzzy = pipe && !slinky;


function setup() {
     let portrait = windowWidth < windowHeight;
     createCanvas(windowWidth > windowHeight * 3 / 2 ? windowHeight * 3 / 2 : windowWidth, windowWidth > windowHeight * 3 / 2 ? windowHeight : windowWidth * 2 / 3);
     var el = document.getElementsByTagName("canvas")[0];
     el.addEventListener("touchstart", mouseClicked, false);
     colorMode(HSB, 255);
     segments = map(decPairs[26], 0, 255, 12, 20);
     ht = map(decPairs[27], 0, 255, 3, 4);
     spread = decPairs[28] < 3 ? 0.5 : map(decPairs[28], 0, 255, 5, 50);
}

function draw() {
     color = 0;
     background(backgroundArray[backgroundIndex]);
     let div = Math.floor(map(Math.round(decPairs[24]), 0, 230, 3, 20));
     let steps = slinky ? 50 : fuzzy ? 1000 : 200;
     translate((width / 2) - (width / wt / 2), height / 2);
     for (let j = 0; j < segments - 2; j++) {
          for (let i = 0; i <= steps; i++) {
               let t = i / steps;
               let x = curvePoint(width / segments / wt * j, width / segments / wt * (j + 1), width / segments / wt * (j + 2), width / segments / wt * (j + 3), t);
               let y = curvePoint(map(decPairs[j], 0, 255, -height / ht, height / ht) * amp, map(decPairs[j + 1], 0, 255, -height / ht, height / ht) * amp, map(decPairs[j + 2], 0, 255, -height / ht, height / ht) * amp, map(decPairs[j + 3], 0, 255, -height / ht, height / ht) * amp, t);
               let hue = reverse ? 255 - (((color / spread) + startColor + index) % 255) : (((color / spread) + startColor) + index) % 255;

               if (fuzzy) {
                    noStroke();
                    fill(hue, 255, 255, 20);
                    let fuzzX = x + map(rnd(), 0, 1, 0, height / 10);
                    let fuzzY = y + map(rnd(), 0, 1, 0, height / 10);
                    if (dist(x, y, fuzzX, fuzzY) < height / 11.5) {
                         circle(fuzzX, fuzzY, map(rnd(), 0, 1, height / 160, height / 16));
                    }
               } else {
                    if (slinky && pipe) {
                         if (i == 0 || i == steps - 1) {
                              fill(0);
                         } else {
                              noFill();
                         }
                         stroke(0);
                         circle(x, y, (height / 7))
                    }

                    if (slinky) {
                         if (i == 0 || i == steps - 1) {
                              fill(hue, 255, 255);
                         } else {
                              noFill();
                         }
                         stroke(hue, 255, 255);
                    } else {
                         noStroke();
                         fill(hue, 255, 255);
                    }

                    circle(x, y, bold && !slinky ? height / 5 : height / 13);

                    if (segmented && !slinky && !bold) {
                         if (i % div === 0 || i == 0 || i == steps - 1) {
                              noStroke();
                              fill(decPairs[25]);
                              circle(x, y, height / 12);
                         }
                    }
               }
               color++;
          }
          seed = parseInt(tokenData.hash.slice(0, 16), 16);
     }


     loops === true ? index = index + speed : index = index;
     if (keyIsDown(UP_ARROW)) {
          if (keyIsDown(SHIFT)) {
               if (speed < 20) {
                    speed++;
               } else {
                    speed = 20;
               }
          } else {
               if (speed < 20) {
                    speed = speed + 0.1;
               } else {
                    speed = 20;
               }
          }
     } else if (keyIsDown(DOWN_ARROW)) {
          if (keyIsDown(SHIFT)) {
               if (speed > 1) {
                    speed--;
               } else {
                    speed = 0.1;
               }
          } else {
               if (speed > 0.1) {
                    speed = speed - 0.1;
               } else {
                    speed = 0.1;
               }
          }
     }

}

function keyPressed() {
     if (keyCode === 32) {
          if (backgroundIndex < backgroundArray.length - 1) {
               backgroundIndex++;
          } else {
               backgroundIndex = 0;
          }
     }
}

function mouseClicked() {
     if (loops === false) {
          loops = true;
     } else {
          loops = false;
     }
}

function rnd() {


     seed ^= seed << 13;

     seed ^= seed >> 17;

     seed ^= seed << 5;

     return (((seed < 0) ? ~seed + 1 : seed) % 1000) / 1000;
}

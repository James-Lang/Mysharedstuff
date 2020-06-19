let piece;
let allPieces = [];
let activePieces = [];
let totalPieces = 75;
let obstacles = [];
let waves = 0;
let cycles = 1;
let shows = true;
let highWave = 0;
let ashows = false;


function setup() {
  createCanvas(1000, 500);
  for (let i = totalPieces - 1; i >= 0; i--){
  piece = new Piece();
  activePieces[i] = piece
  allPieces[i] = piece
}
  obstacles.push(new Obstacle());
}

function resetGame() {
  nextGeneration();
  obstacles[0].r = 20
  obstacles[0].x = width
  waves = 0;
}

function keyPressed() {
  if (key == ' ') {
    piece.jump();
  }
  if (key == 'a') {
    if (ashows == true) {
      ashows = false
    }
    else { ashows = true}
  }
  if (key == 'd') {
    if (shows == true) {
      shows = false
    }
    else { shows = true}
  }
}



function nextWave() {
  waves++;
  for (let j = activePieces.length - 1; j >= 0; j--){
    activePieces[j].score++;
}
  obstacles[0].x = width;
  // obstacles[0].r++;
  if (random(10) > 5) {
    obstacles[0].y = height - 30;
    obstacles[0].rwidth = 90
  }
  else {
    obstacles[0].y = height - 30;
    obstacles[0].r = 50;
    obstacles[0].rwidth = 20;
  }
  if (waves > highWave){
    highWave = waves
  console.log(waves);
  if (waves >= 45) {
    //cycles = 1;
    //shows = true;
    waves = 0;
    highWave = 0;
    obstacles[0].xv += 0.05;
  }
}
}


function draw() {
  background(0);
  for (let n = 0; n < cycles; n++){
  if (activePieces.length < 5) {
    resetGame();
  }
for (let i = 0; i < obstacles.length; i++) {
  if (shows == true){
  obstacles[i].show();
}
  obstacles[i].move();
  if (obstacles[i].x < 0 - obstacles[i].r) {
    nextWave();
  }
}

  for (let j = activePieces.length - 1; j >= 0; j--){
    if (shows == true && ashows == false) {
    activePieces[j].show();
  }
  else if (shows == true && ashows == true) {
    activePieces[0].show();
  }
    activePieces[j].move();
    activePieces[j].think();
    for (let i = 0; i < obstacles.length; i++) {
  if (activePieces[j].hits(obstacles[i])) {
    activePieces.splice(j, 1);

  }
  // if (waves >= 2) {
  //   console.log(waves)
  //   noLoop();
  // }
  }
}
}
}

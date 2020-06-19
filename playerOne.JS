function mutate(x) {
  if (random(1) < 0.3) {
    let offset = randomGaussian() * 0.5;
    let newx = x + offset;
    return newx;
  }
  else {
    return x;
  }
}

class Piece {
constructor(brain) {
this.r = 20;
this.x = this.r + 50;
this.y = height - 20;
this.vy = 0;
this.gravity = 0.92;
this.score = 0;
this.ducking = false;

if (brain instanceof NeuralNetwork) {
  this.brain = brain.copy();
  this.brain.mutate(mutate);
} else {
  this.brain = new NeuralNetwork(8, 64, 4);
}

}
show() {
fill(255)
rect(this.x, this.y, this.r, this.r)
}
copy() {
  return new Piece(this.brain);
}
think() {
let inputs = [];
inputs[0] = obstacles[0].x;
inputs[1] = obstacles[0].r;
inputs[2] = this.gravity;
inputs[3] = this.x;
inputs[4] = this.x + this.r;
inputs[5] = obstacles[0].xv;
inputs[6] = obstacles[0].rwidth;
inputs[7] = obstacles[0].y;

let action = this.brain.predict(inputs);
if (action[0] > (action[1] + action[2] + action[3])) {
  this.jump();
}
if (action[1] > (action[2] + action[0] + action[3])) {
  this.duck();
}
if (action[2] > (action[0] + action[1] + action[3])) {
  this.noDuck();
}
if (action[3] > (action[1] + action[2] + action[0])) {

}


}

jump() {
if (this.y == height-20 && this.ducking == false){
this.vy = -10;
}
}

duck(v) {
if (this.ducking == false) {
  this.ducking = true;
  this.r *= 0.5
}
}

noDuck() {
  if (this.ducking == true) {
    this.ducking = false;
    this.r *= 2;
  }
}


move() {
  this.y += this.vy
  this.vy += this.gravity;
  this.y = constrain(this.y, 0, height - this.r)
}

hits(obs) {

  if (this.x < obs.x + obs.rwidth &&
     this.x + this.r > obs.x &&
     this.y < obs.y + obs.r &&
     this.y + this.r > obs.y) {
       return true;
     }

}

}

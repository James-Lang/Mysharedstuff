class Obstacle {
constructor() {
this.r = 20;
this.rwidth = 20
this.x = width + (20);
this.y = height - 20;
this.xv = -5;

}
show() {
fill('RED')
rect(this.x, this.y, this.rwidth, this.r)
}

update() {

}

move() {
  this.x += this.xv
}

}

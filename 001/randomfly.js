/*
author: mariana jó
title: random fly (#001)
*/

var bird;
var noiseScaleX = 0.01;
var noiseScaleY = 0.02;
var xoff = 0.0;
var yoff = 0.0;


// canvas setup
function setup() {
  createCanvas(680, 680);
  bird = new Walker();
}

function draw() {
  background(50);
  bird.display();
  bird.update();
}

// constructor for Walker class
function Walker() {

  // initial values
  this.pos = createVector(width/2, height/2);
  this.vel = createVector(0, 0);

  this.update = function() {

    // random sizes generation for quad
    this.rd1 = random(35);
    this.rd2 = random(35);
    this.rd3 = random(35);
    this.rd4 = random(35);

    // updating noise for x and y
    xoff += noiseScaleX;
    yoff += noiseScaleY;

    /*
     if mouse is pressed, the bird will fly around the pointer
     else, it will fly randomly with Perlin noise
    */
    if (mouseIsPressed) {
      // guided fly
      var mouse = createVector(mouseX, mouseY);
      this.acc = p5.Vector.sub(mouse, this.pos);
      this.acc.mult(0.001);
      this.vel.add(this.acc);
      this.pos.add(this.vel);
    }
    else {
      // random fly
      this.pos.x = noise(xoff) * width;
      this.pos.y = noise(yoff) * height;
    }
  }

  this.display = function() {
    // randomly fill quad to give a flickering effect
    fill(random(255), random(255), random(255));

    // draws a quad with random sizes
    quad(this.pos.x-this.rd1, this.pos.y-this.rd1,
         this.pos.x+this.rd2, this.pos.y-this.rd2,
         this.pos.x+this.rd3, this.pos.y+this.rd3,
         this.pos.x-this.rd4, this.pos.y+this.rd4);
  }
}

/// <reference types="p5/global"/>
// @ts-nocheck

let turtle, turtle2, system, grammar;

function setup() {
  createCanvas(500, 500);

  const names = systemValues.names;
  system = getSystem(names[4]);
  const [x, y] = [width / 2, height / 2];
  turtle = new Turtle(system.angle * (HALF_PI / 2), x, y);
  turtle2 = new Turtle(-system.angle * (HALF_PI/2), x, y);
  grammar = wrapper(system);
}

function draw() {
  background(127, 10);

  turtle.lMovement(grammar);
  turtle2.lMovement(grammar);

  frameRate(0);
}

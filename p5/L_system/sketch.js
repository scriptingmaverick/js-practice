/// <reference path="https://cdn.jsdelivr.net/npm/@types/p5/global.d.ts" />

let mover, sentence, system;

function setup() {
  createCanvas(400, 400);
  frameRate(200);

  system = randomizedLsystems[5];

  const x = width / 2;
  const y = height;
  const angle = system.angle;
  mover = new Turtle(x, y, system.step, angle);

  const Lsys = new Lsystem(system);
  sentence = Lsys.getNextElem();

  background(220);
}

function draw() {
  const next = sentence.next();

  if (next.done) noLoop();
  mover.commands[next.value]?.();
}

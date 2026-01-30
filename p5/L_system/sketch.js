/// <reference path="https://cdn.jsdelivr.net/npm/@types/p5/global.d.ts" />

let mover, sentence, system;

function setup() {
  createCanvas(400, 400);

  const x = width / 2;
  const y = height;
  system = lSystems[4];

  const angle = system.angle;

  mover = new Mover(x, y, angle);

  sentence = generateSentence(system);
}

function draw() {
  background(220);
  mover.lMovements(sentence);
  frameRate(0);
}

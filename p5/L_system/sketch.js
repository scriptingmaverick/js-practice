/// <reference path="https://cdn.jsdelivr.net/npm/@types/p5/global.d.ts" />

let mover, sentence, system;

function setup() {
  createCanvas(400, 400);

  const x = width / 2;
  const y = height;
  system = lSystems[0];

  const angle = system.angle;

  mover = new Mover(x, y, system.step, angle);

  sentence = generateSentence(system);
  sentence = getNextElem(sentence);
  background(220);
}

function draw() {
  const el = sentence.next().value;
  if (el === undefined) frameRate(0);
  mover.commands[el]?.();
  frameRate(200)
}

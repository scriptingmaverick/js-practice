/// <reference types="p5/global"/>

// @ts-nocheck

const createSystem = ({ axiom, angle, iteration, rule: fValue }) => {
  return {
    axiom,
    rule: {
      "F": fValue,
      "+": "+",
      "-": "-",
      "[": "[",
      "]": "]",
    },
    angle,
    iteration,
  };
};

const generateGrammar = ({ axiom, rule }) => {
  const generation = [];
  for (const el of axiom) {
    generation.push(rule[el]);
  }
  return generation.join("");
};

const iterateGeneration = ({ axiom, rule, iteration }) => {
  let grammar = axiom;
  for (let i = 0; i < iteration; i++) {
    grammar = generateGrammar({ axiom: grammar, rule });
  }
  return grammar;
};

const wrapper = (system) => {
  const pattern = createSystem(system);
  return iterateGeneration(pattern);
};

let turtle,turtle2, system, grammar;

function setup() {
  createCanvas(500, 500);
  turtle = new Turtle();
  turtle2 = new Turtle();

  system = getSystem(names[0]);
  grammar = wrapper(system);
}

function draw() {
  background(127, 10);

  for (const el of grammar) {
    lTurtle[el](turtle, system.angle);
    lTurtle[el](turtle2, -system.angle);
  }

  frameRate(1);
}

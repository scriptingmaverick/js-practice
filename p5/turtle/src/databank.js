const systemValues = {
  axioms: [
    "F",
    "F",
    "F",
    "F",
    "F",
    "F",
    "F",
    "F",
    "F",
    "F",
  ],

  rules: [
    "F",
    "FF",
    "F+F+F+F",
    "F+F+F",
    "F+F-F+F",
    "F+F--F+F",
    "F[+F][-F]",
    "F[+F]F[-F]",
    "F[+F]F[-F]F",
    "FF-[-F+F+F]+[+F-F-F]",
  ],

  angles: [
    0,
    0,
    90,
    120,
    90,
    60,
    30,
    25,
    22.5,
    22.5,
  ],

  iterations: [
    3,
    3,
    2,
    2,
    3,
    3,
    4,
    4,
    4,
    4,
  ],

  names: [
    "Straight Line",
    "Elongated Line",
    "Square Pattern",
    "Triangle Pattern",
    "Zig Zag Pattern",
    "Spiral Pattern",
    "Simple Branching Tree",
    "Bushy Plant",
    "Classic Tree",
    "Dense Tree Structure",
  ],
};


const names = [
  "Straight Line",
  "Elongated Line",
  "Square Pattern",
  "Triangle Pattern",
  "Zig Zag Pattern",
  "Spiral Pattern",
  "Simple Branching Tree",
  "Bushy Plant",
  "Classic Tree",
  "Dense Tree Structure",
];

const getSystem = (name) => {
  const index = names.indexOf(name);
  const props = ["axiom", "rule", "angle", "iteration", "name"];
  return props.reduce((system, el) => {
    system[el] = systemValues[el + "s"][index];
    return system;
  }, {});
};
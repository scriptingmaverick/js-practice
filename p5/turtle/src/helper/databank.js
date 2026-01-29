// const systemValues = {
//   axioms: ["F", "F", "F", "F", "F", "F", "F", "F", "F", "F"],

//   rules: [
//     { fValue: "F" },
//     { fValue: "FF" },
//     { fValue: "F+F+F+F" },
//     { fValue: "F+F+F" },
//     { fValue: "F+F-F+F" },
//     { fValue: "F+F--F+F" },
//     { fValue: "F[+F][-F]" },
//     { fValue: "F[+F]F[-F]" },
//     { fValue: "F[+F]F[-F]F" },
//     { fValue: "FF-[-F+F+F]+[+F-F-F]" },
//   ],

//   angles: [0, 0, 90, 120, 90, 60, 30, 25, 22.5, 22.5],

//   iterations: [5, 3, 2, 2, 3, 6, 6, 4, 4, 4],

//   names: [
//     "Straight Line",
//     "Elongated Line",
//     "Square Pattern",
//     "Triangle Pattern",
//     "Zig Zag Pattern",
//     "Spiral Pattern",
//     "Simple Branching Tree",
//     "Bushy Plant",
//     "Classic Tree",
//     "Dense Tree Structure",
//   ],
// };

// const systemValues = {
//   axioms: [
//     "X",
//     "X",
//     "FX",
//     "X",
//     "X",
//   ],

//   rules: [
//     {
//       fValue: "FF",
//       xValue: "F+[[X]-X]-F[-FX]+X",
//     },
//     {
//       fValue: "F",
//       xValue: "F[+X]F[-X]+X",
//     },
//     {
//       fValue: "FF",
//       xValue: "X+YF+",
//     },
//     {
//       fValue: "F",
//       xValue: "F-[[X]+X]+F[+FX]-X",
//     },
//     {
//       fValue: "FF",
//       xValue: "F[+X][-X]FX",
//     },
//   ],

//   angles: [
//     25,
//     20,
//     90,
//     22.5,
//     30,
//   ],

//   iterations: [
//     3,
//     2,
//     5,
//     5,
//     4,
//   ],

//   names: [
//     "Classic Plant FX",
//     "Simple Branch FX",
//     "Dragon Curve FX",
//     "Asymmetric Plant FX",
//     "Balanced Tree FX",
//   ],
// };

const systemValues = {
  axioms: [
    "X",
    "X",
    "FX",
    "X",
    "X",
    "FX",
  ],

  rules: [
    {
      fValue: "FF",
      xValue: "F[+X]F[-X]+X",
    },
    {
      fValue: "F",
      xValue: "F+[[X]-X]-F[-FX]+X",
    },
    {
      fValue: "FF",
      xValue: "F[+X][-X]FX",
    },
    {
      fValue: "F",
      xValue: "F-[[X]+X]+F[+FX]-X",
    },
    {
      fValue: "FF",
      xValue: "FF+[+X-F-X]-[-X+F+X]",
    },
    {
      fValue: "F",
      xValue: "F[+X]FX[-X]+X",
    },
  ],

  angles: [
    25,
    22.5,
    30,
    20,
    18,
    28,
  ],

  iterations: [
    5,
    5,
    4,
    5,
    4,
    4,
  ],

  names: [
    "Balanced X Tree",
    "Classic Plant X",
    "Forked Tree X",
    "Asymmetric Plant X",
    "Dense Bush X",
    "Growing Vine X",
  ],
};

const getSystem = (name) => {
  const index = systemValues.names.indexOf(name);
  const props = ["axiom", "rule", "angle", "iteration", "name"];
  return props.reduce((system, el) => {
    system[el] = systemValues[el + "s"][index];
    return system;
  }, {});
};

// const simpleFSystems = [
//   // 1️⃣ Minimal branching (hello world 🌱)
//   {
//     name: "Basic Branch",
//     axiom: "F",
//     rules: {
//       F: "F[+F][-F]",
//     },
//     angle: 25,
//     iterations: 4,
//     step: 4,
//   },

//   // 2️⃣ Fuller plant
//   {
//     name: "Full Plant",
//     axiom: "F",
//     rules: {
//       F: "F[+F]F[-F]F",
//     },
//     angle: 25,
//     iterations: 4,
//     step: 4,
//   },

//   // 3️⃣ Bushy tree (deep stack test)
//   {
//     name: "Bushy Tree",
//     axiom: "F",
//     rules: {
//       F: "FF-[-F+F+F]+[+F-F-F]",
//     },
//     angle: 22,
//     iterations: 4,
//     step: 3,
//   },

//   // 4️⃣ Dense fractal plant
//   {
//     name: "Dense Plant",
//     axiom: "F",
//     rules: {
//       F: "F[+F]F[-F][F]",
//     },
//     angle: 20,
//     iterations: 4,
//     step: 3,
//   },

//   // 5️⃣ Symmetric tree
//   {
//     name: "Symmetric Tree",
//     axiom: "F",
//     rules: {
//       F: "F[+F][−F]",
//     },
//     angle: 30,
//     iterations: 5,
//     step: 4,
//   },

//   // 6️⃣ Spiral branches
//   {
//     name: "Spiral Plant",
//     axiom: "F",
//     rules: {
//       F: "F+F[+F]-F[-F]",
//     },
//     angle: 20,
//     iterations: 4,
//     step: 4,
//   },

//   // 7️⃣ Compact shrub
//   {
//     name: "Compact Shrub",
//     axiom: "F",
//     rules: {
//       F: "F[F+F]F[-F]",
//     },
//     angle: 18,
//     iterations: 5,
//     step: 3,
//   },
// ];

const lSystems = [
  // 1️⃣ Classic branching plant (X as structure)
  {
    name: "Classic Plant (X)",
    axiom: "X",
    rules: {
      X: "F[+X][-X]FX",
      F: "FF",
    },
    angle: 25,
    iterations: 5,
    step: 4,
  },

  // 2️⃣ Recursive tree (A as non-terminal)
  {
    name: "Recursive Tree (A)",
    axiom: "A",
    rules: {
      A: "F[+A][-A]",
      F: "FF",
    },
    angle: 30,
    iterations: 6,
    step: 4,
  },

  // 3️⃣ Dense structured plant
  {
    name: "Dense Structured Plant",
    axiom: "X",
    rules: {
      X: "F[+X]F[-X]+X",
      F: "FF",
    },
    angle: 20,
    iterations: 5,
    step: 3,
  },

  // 4️⃣ Symmetric recursive plant
  {
    name: "Symmetric Recursive Plant",
    axiom: "A",
    rules: {
      A: "F[+A][-A]FA",
      F: "FF",
    },
    angle: 22,
    iterations: 4,
    step: 4,
  },

  // 5️⃣ Thin branching tree
  {
    name: "Thin Tree",
    axiom: "X",
    rules: {
      X: "F[-X][+X]",
      F: "F",
    },
    angle: 28,
    iterations: 6,
    step: 15,
  },

  // 6️⃣ Compact fractal bush
  {
    name: "Compact Fractal Bush",
    axiom: "A",
    rules: {
      A: "F[A+F][-F]",
      F: "FF",
    },
    angle: 18,
    iterations: 5,
    step: 3,
  },
];

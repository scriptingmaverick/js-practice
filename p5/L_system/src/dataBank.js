const lSystems = [
  // 1️⃣ Minimal branching (hello world 🌱)
  {
    name: "Basic Branch",
    axiom: "F",
    rules: {
      F: "F[+F][-F]",
    },
    angle: 25,
    iterations: 4,
    step: 4,
  },

  // 2️⃣ Fuller plant
  {
    name: "Full Plant",
    axiom: "F",
    rules: {
      F: "F[+F]F[-F]F",
    },
    angle: 25,
    iterations: 4,
    step: 4,
  },

  // 3️⃣ Bushy tree (deep stack test)
  {
    name: "Bushy Tree",
    axiom: "F",
    rules: {
      F: "FF-[-F+F+F]+[+F-F-F]",
    },
    angle: 22,
    iterations: 4,
    step: 3,
  },

  // 4️⃣ Dense fractal plant
  {
    name: "Dense Plant",
    axiom: "F",
    rules: {
      F: "F[+F]F[-F][F]",
    },
    angle: 20,
    iterations: 4,
    step: 3,
  },

  // 5️⃣ Symmetric tree
  {
    name: "Symmetric Tree",
    axiom: "F",
    rules: {
      F: "F[+F][−F]",
    },
    angle: 30,
    iterations: 5,
    step: 4,
  },

  // 6️⃣ Spiral branches
  {
    name: "Spiral Plant",
    axiom: "F",
    rules: {
      F: "F+F[+F]-F[-F]",
    },
    angle: 20,
    iterations: 4,
    step: 4,
  },

  // 7️⃣ Compact shrub
  {
    name: "Compact Shrub",
    axiom: "F",
    rules: {
      F: "F[F+F]F[-F]",
    },
    angle: 18,
    iterations: 5,
    step: 3,
  },
];

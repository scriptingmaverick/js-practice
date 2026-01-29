
const createSystem = ({ axiom, angle, iteration, rule: { fValue, xValue = '' } }) => {
  console.log({fValue, xValue});
  
  return {
    axiom,
    rule: {
      "F": fValue,
      "+": "+",
      "-": "-",
      "[": "[",
      "]": "]",
      "X": xValue ,
      "Y": 'Y' ,
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

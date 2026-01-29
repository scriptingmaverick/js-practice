const getNewSentence = (prevSentence, rules) => {
  let sentence = "";
  for (const ch of prevSentence) {
    sentence += rules[ch] || ch;
  }

  return sentence;
};

const generateSentence = ({ axiom, rules, iterations }) => {
  let sentence = axiom;
  for (let i = 0; i < iterations; i++) {
    sentence = getNewSentence(sentence, rules);
  }

  return sentence;
};

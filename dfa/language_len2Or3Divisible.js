const dfa = {
  q0: { 1: "q1", 0: "q1", isFinal: true },
  q1: { 1: "q2", 0: "q2", isFinal: false },
  q2: { 1: "q3", 0: "q3", isFinal: true },
  q3: { 1: "q4", 0: "q4", isFinal: true },
  q4: { 1: "q5", 0: "q5", isFinal: true },
  q5: { 1: "q0", 0: "q0", isFinal: false },
};

const executeCommand = (command) => {
  const initialState = "q0";
  const final = command
    .split("")
    .reduce((state, query) => dfa[state][query], initialState);
  return dfa[final].isFinal;
};

console.log(executeCommand("10001001"));

const dfa = {
  q0: { 1: "q2", 0: "q0", isFinal: false },
  q1: { 1: "q2", 0: "q0", isFinal: false },
  q2: { 1: "q0", 0: "q3", isFinal: false },
  q3: { 1: "q4", 0: "q0", isFinal: false },
  q4: { 1: "q4", 0: "q0", isFinal: true },
};

const executeCommand = (command) => {
  const initialState = "q1";
  const final = command
    .split("")
    .reduce(
      (state, currentElement) => dfa[state][currentElement],
      initialState
    );
  console.log(command);
  return dfa[final].isFinal;
};

console.log(executeCommand("10010100101"));

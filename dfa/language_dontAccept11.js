const dfa = {
  q0: { 1: "q1", 0: "q0", isFinal: true },
  q1: { 1: "q2", 0: "q0", isFinal: true },
  q2: { 1: "q2", 0: "q2", isFinal: false },
};

const executeCommand = (command) => {
  const initialState = "q0";
  const final = command
    .split("")
    .reduce(
      (state, currentElement) => dfa[state][currentElement],
      initialState
  );
  console.log(command)
  return dfa[final].isFinal;
};

console.log(executeCommand(""));

const dfa = {
  q0: { 1: "q0", 0: "q1", isFinal: false },
  q1: { 1: "q2", 0: "q1", isFinal: true },
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

console.log(executeCommand("1111100000000000000"));

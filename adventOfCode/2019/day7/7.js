import { sprint } from "../day5/5.js";

const amplify = (memory, signal, prevResult) => {
  for (let i = 0; i < signal.length; i++) {
    const mem = memory.slice();
    prevResult = sprint(mem, [signal[i], prevResult], []);
  }
  
  return prevResult;
};

const ampliyCircuit = (rawMemory) => {
  const signals = Deno.readTextFileSync("permutations.txt").split("\n")
    .map((x) => x.split(""));

  const thrusterOutputs = [];
  for (let i = 0; i < signals.length; i++) {
    thrusterOutputs.push(amplify(rawMemory, signals[i], 0));
  }

  console.log(thrusterOutputs, Math.max(...thrusterOutputs));
};

console.log(
  ampliyCircuit(
    "3,31,3,32,1002,32,10,32,1001,31,-2,31,1007,31,0,33,1002,33,7,33,1,33,31,31,1,32,31,31,4,31,99,0,0,0",
  ),
);

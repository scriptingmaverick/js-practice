import { add } from "./general_data.js";

function* running_reducer(data, func) {
  let reducedResult = typeof data[0] === "number" ? 0 : "";
  let i = 0;
  while (i < data.length) {
    reducedResult = func(reducedResult, data[i++]);
    yield reducedResult;
  }
}

const sumOfNums = running_reducer([1, 2, 3, 4, 5], add);

const charsIntoStr = running_reducer(["k", "h", "a", "s", "i", "m"], add);

console.log([...sumOfNums]);
console.log([...charsIntoStr]);

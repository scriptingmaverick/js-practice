import { isEven } from "./general_data.js";

function* fibonnacci() {
  let a = 0;
  let b = 1;
  while (true) {
    yield a;
    const c = a + b;
    a = b;
    b = c;
  }
}

const range = 5;

const startingSequence = fibonnacci();
const evensInStartingSequence = fibonnacci();
const startingSequenceOfEvens = fibonnacci();

console.log([...startingSequence.take(range)]);

console.log([...evensInStartingSequence.take(range).filter(isEven)]);

console.log([...startingSequenceOfEvens.filter(isEven).take(range)]);

import { infiniteNums, range } from "./generator_answers.js";

const isEven = (x) => !(x & 1);

const numbers = infiniteNums();
const predicate = isEven;

const originalNext = numbers.next.bind(numbers);
const result = [];
let i = 0;
let prev_state = true;

numbers.next = function () {
  const current_number = originalNext();
  const current_state = predicate(current_number);
  if (prev_state !== current_state) {
    i++;
    prev_state = current_state;
  }

  result[i] = result[i] || [];
  result[i].push(current_number);

  return result;
};
const execute = [...numbers.take(range)];
console.log("partitions -> ", [...numbers.take(range)]);

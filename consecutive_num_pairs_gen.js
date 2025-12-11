import { infiniteNums, range } from "./generator_answers.js";

const numbers = infiniteNums();
console.log("consecuive pairs -> ", [
  ...numbers.take(range).map((x) => [x, x + 1]),
]);

import { infiniteNums, range } from "./general_data.js";

const numbers = infiniteNums();
console.log("consecuive pairs -> ", [
  ...numbers.take(range).map((x) => [x, x + 1]),
]);

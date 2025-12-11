import { infiniteNums, range } from "./general_data.js";

const nums = infiniteNums();
console.log("pair permutations -> ", [
  ...nums.take(range).flatMap((x) => {
    const arr = [];
    for (let i = x + 1; i <= range; i++) {
      arr.push([x, i]);
    }
    return arr;
  }),
]);

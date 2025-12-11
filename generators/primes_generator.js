import { infiniteNums, range } from "./general_data.js";

const isPrime = (x) => {
  for (let i = 2; i <= Math.sqrt(x); i++) {
    if (x % i === 0) return false;
  }

  return true;
};

const nums = infiniteNums();
console.log("primes -> ", [...nums.filter(isPrime).take(range)]);

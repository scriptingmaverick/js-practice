// import { wordsForNumbers } from "./conversionData.js";

export const divisorEquivalents = {
  100: (prefix) => `${wordsForNumbers[parseInt(prefix)]} hundred`,
  10: (prefix) => `${wordsForNumbers[parseInt(prefix) * 10]}`,
};

export const parseNumber = (num, divisor = 100) =>
  (num / divisor).toFixed(2).split(".");

const getSuffix = (result, suffix) => {
  if (parseInt(suffix) in wordsForNumbers)
    return result.push(wordsForNumbers[parseInt(suffix)]);
  result.push(divisorEquivalents[10](suffix[0]));
  result.push(wordsForNumbers[parseInt(suffix[1])]);
};

export const getEquivalentword = (num, divisor = 100, result = []) => {
  if (num in wordsForNumbers) return wordsForNumbers[num];
  const [prefix, suffix] = parseNumber(num);
  console.log(prefix, suffix);
  if (parseInt(prefix) !== 0) result.push(divisorEquivalents[divisor](prefix));
  if (suffix !== "00") getSuffix(result, suffix);
  return result.join(" ").trim();
};

export const numberToWords = (num) => {
  // Your implementation here
  if (num <= 1000) {
    return num === 1000 ? "thousand" : getEquivalentword(num);
  }
  if (num <= 1000000) {
    return num === 1000000
      ? "million"
      : getEquivalentword(num / 100) +
          " thousand" +
          getEquivalentword(num % 1000);
  }
};

const min = (arr) => Math.min(...arr);
const max = (arr) => Math.max(...arr);

const randomElement = (upper, lower) =>
  lower + Math.floor(Math.random() * (upper - lower));

const randomData = (noOfElements) => {
  const data = [];
  for (let i = 0; i < noOfElements; i++) {
    data.push(randomElement(1, 100));
  }

  return data;
};

const divide = (divisor, dividend) => Math.ceil(divisor / dividend);

const stepsForNumbers = (numbers) => {
  const smallestNum = min(numbers);
  const maxNum = max(numbers);
  let stepValue = 5;

  for (let i = 2; i <= 10; i++) {
    if (divide((smallestNum - maxNum) / i) <= 5) {
      stepValue = i;
      break;
    }
  }

  return numbers.map((elem) => [
    elem,
    divide(elem, stepValue < 5 ? 5 : stepValue),
  ]);
};

console.log(stepsForNumbers(randomData(13)));

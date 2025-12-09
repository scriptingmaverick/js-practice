const sumOfMultiplesOf = (number, range) => {
  const countOfNumbers = Math.floor((range - 1) / number);
  return number * ((countOfNumbers * (countOfNumbers + 1)) / 2);
};

const numbersWithIn = (range) => {
  let sum = 0;
  sum += sumOfMultiplesOf(3, range);
  console.log(sum);
  sum += sumOfMultiplesOf(5, range);
  console.log(sum);
  sum -= sumOfMultiplesOf(15, range);
  return sum;
};

console.log(numbersWithIn(1000));

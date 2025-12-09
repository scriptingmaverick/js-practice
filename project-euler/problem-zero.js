const squareWithIn = (range) => {
  const i = (range + (range % 2)) / 2;
  const sum =
    4 * ((i * (i + 1) * (2 * i + 1)) / 6) - 4 * ((i * (i + 1)) / 2) + i;
  return sum;
};

console.log(squareWithIn(971000));

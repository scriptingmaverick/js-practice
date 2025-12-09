const generateFibonacciSeries = (range) => {
  let [firstTerm, secondTerm] = [0, 1];
  const series = [firstTerm];
  while (firstTerm < range) {
    const futureTerm = firstTerm + secondTerm;
    firstTerm = secondTerm;
    secondTerm = futureTerm;
    series.push(firstTerm);
  }

  let sum = 0;
  let i = 3;
  while (i < series.length) {
    sum += series[i];
    i += 3;
  }
  return sum;
};

console.log(generateFibonacciSeries(4000000));

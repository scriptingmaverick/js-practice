// f(x)=(x^2 + 1 ) mod n
// x = f(x)
// y = f(f(y))
// d= gcd(∣x−y∣,n)
// If d == 1: keep going
// If 1 < d < n: you found a factor
// If d == n: retry with different f or starting value

const getSquaredMod = (number, range) => (number * 2 + 1) % range;
function gcd(a, b) {
  while (b !== 0) {
    const temp = b;
    b = a % b;
    a = temp;
  }
  return a;
}

const getPrimeFactorsOf = (number) => {
  const primeFactors = [];
  let checker1 = 2;
  while (true) {
    const x = getSquaredMod(checker1, number);
    const y = getSquaredMod(x, number);
    const diff = gcd(Math.abs(x - y), number);
    if (1 < diff && diff < number) primeFactors.push(diff);
    if (diff === number) break;
    console.log(diff, x, y);
    checker1 = x;
  }

  return primeFactors;
};

console.log(getPrimeFactorsOf(8051));

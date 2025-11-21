const makeAdder = (x) => (y) => y.map((e) => e * x);

console.log([1, 2].flatMap((e) => makeAdder(e)([1, 2, 3])));

const interCaste = (f, x) => f(x);

const multiply = function (x) {
  return function (y) {
    return y.map((e) => e * x);
  };
};

console.log(multiply(10)([1,2,3,4]))
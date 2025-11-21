// const data = [1, 2, 3, 4, 5];

// function printData() {
//   return (z) => {
//     return console.log(z + this.a, z + this.b, z + this.c);
//   };
// }
// printData.call({ a: 10, b: 56, c: 90 })(6);
// printData.apply({ a: 12, b: 13, c: 1 })(8);

// const wakeByBind = printData.bind({ a: 12, b: 13, c: 1 });

// wakeByBind()(5);
// wakeByBind()(2);
// wakeByBind()(25);

// const numbers = "1236";
// console.log([].map.apply(numbers, [(x) => x * 2]));

// const maxNumber = Math.max.apply({}, [].map.apply(numbers,[(x) => x ** 2]));

// console.log("\n--- Math.max with apply() ---");
// console.log(`The maximum number is: ${maxNumber}\n`);

// const person = () => ({
//   name: "Charlie",
//   sayName: () => {
//     console.log(`My name is ${this.name}`);
//   },
// });
// const p1 = person();
// const p2 = person();
// p2.name = 'challo'
// console.log(p1.sayName === p2.sayName)
// // person.sayName();

// // const boundSayName = person.sayName.bind(person);

// // boundSayName();

// function multiply(b) {
//   return this * b;
// }

// const double = multiply.bind(2);

// const result = double(6);

// console.log(`\nResult of double(6): ${result}`);

// const increment = function () {
//   return ++this.i;
// };

// const mk = function () {
//   return {
//     i: 0,
//     "inc": increment,
//   };
// };

// const c1 = mk();
// const c2 = mk();

// console.log(c1.inc === c2.inc);

const add = function (a, b) {
  return this + a + b;
};

console.log(add.apply([2, 3, 4]));
const point1 = { a: 12, b: 11, c: 13 };

const ff = function (a, b) {
  return a > b;
};

const somefn = ff.bind({ a: 8, b: 7 }, 10);
console.log(somefn(12));

// console.log = console.log.bind(null);
// console.log('hello');

// console.log = console.log.bind({ a: 2 }, "abcd");
// console.log(this.a);

const colors = ["red", "green", "blue"];
colors.map = colors.map.bind([...colors].reverse());
console.log(...colors.map(function (x) {
  return x;
}));

// const ff = function (a, b)  {
//   this.a += b;
//   return this
// }

// const rf = ff.bind({ a: 2 })
// console.log([1, 2, 3].reduce(rf))

// const ff = function (a, b)  {
//   this[a] += b;
//   return this
// }

// const rf = ff.bind({ a: 2 })
// console.log([1, 2, 3].reduce(rf))

const adddddd = function (x) {
  if (x === 1) return 1;
  return 1 + this.call(this, x - 1);
};

const { b, ...anotherPoint } = point1;
console.log(anotherPoint);

const point2 = { a: 2, b: 1, c: 3 };
const boring = function () {
  return this;
};
const a = boring.bind(point1).bind(point2);
console.log(a.call(2));

const addScore = function ({ scores }) {
  scores.push(12);
};
const scores = [1, 2, 3, 4];
const interns = { name: "ravi", scores };
addScore(interns);
console.log(interns);
console.log(scores);

// const yay = function () {
//   console.log(this);
// };
// const b = yay.bind.bind(yay);
// console.log(b());

const adddd = function () {
  return this;
};
const bbbbb = adddd.bind(adddd);
console.log(bbbbb(5));

const ad = function (x = 0) {
  return this.ans += x;
};
const x = ad.bind({ ans: 0 });
const y = ad.bind({ ans: 10 });
console.log([x(), y()]);
console.log([1, 2].map(x));
console.log([1, 2].map(y));
console.log([x(), y()]);
console.log([3, 4].map(x));
console.log([3, 4].map(y));

const fun = function (...args) {
  if (args.length === 1) return args;
  const [x, ...y] = args;
  return [...fun(...y), x];
};

console.log(...fun("apple", "ban", "man"));

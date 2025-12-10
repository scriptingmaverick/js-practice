// iterator protocol -> symbol.iterator

const myOwnIterator = {
  i: 0,
  next() {
    if (this.i < 15) return { value: this.i++, done: false };
    return { value: undefined, done: true };
  },
  [Symbol.iterator]: function () {
    return this;
  },
};

console.log([...myOwnIterator]);

const otherWayOfCreatingIterator = {
  [Symbol.iterator]: function () {
    let i = 0;
    return {
      next() {
        if (i < 15) return { value: i++, done: false };
        return { value: undefined, done: true };
      },
    };
  },
};

console.log([...otherWayOfCreatingIterator]);

// iterator
const counter = function (max) {
  let i = 0;
  return {
    next() {
      if (i < max) return { value: i++, done: false };
      return { value: undefined, done: true };
    },
  };
};

const iterator = counter(3);
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());

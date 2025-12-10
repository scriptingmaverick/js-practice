const sk = Symbol("key");
const diffKey = Symbol("key");
const otherKey = Symbol("key");

console.log(sk === diffKey);
console.log(otherKey === diffKey);
console.log(sk === otherKey);

const newKey = Symbol.for("hi");
const newOtherKey = Symbol.for("hi");
const extraKey = Symbol.for("hi");

console.log(newKey === newOtherKey);
console.log(extraKey === newOtherKey);
console.log(newKey === extraKey);

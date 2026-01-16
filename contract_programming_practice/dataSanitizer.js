// The Data Sanitizer (Array Methods)
// Goal: Create a function cleanDatabase that processes an array of user objects.
// Preconditions:
// Input must be an Array of Objects.
// Postcondition: Returns a new array where:
// Users with an age less than 18 are filtered out (use .filter).
// Names are converted to uppercase (use .map).
// Any user missing a name or age property is ignored.

const cleanDatabase = (users) => {
  // PRECONDITION
  if (!Array.isArray(users)) return "Invalid Input";

  return users
    // 1. Filter: Must have name, must have age, and age must be >= 18
    .filter((user) => {
      return (
        user !== null &&
        typeof user === "object" &&
        typeof user.name === "string" &&
        typeof user.age === "number" &&
        user.age >= 18
      );
    })
    // 2. Map: Return a NEW object with uppercase name to avoid mutation
    .map((user) => {
      return {
        ...user,
        name: user.name.toUpperCase(),
      };
    });
};

// Test Cases:

console.log(
  cleanDatabase([{ name: "alice", age: 25 }, { name: "bob", age: 10 }]),
);
// -> [{name: "ALICE", age: 25}]

console.log(cleanDatabase([{ age: 20 }, { name: "charlie", age: 30 }]));
// -> [{name: "CHARLIE", age: 30}]

console.log(cleanDatabase("wrong"));
// -> "Invalid Input"

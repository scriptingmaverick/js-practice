// The Deep Searcher (Recursive)
// Goal: Create a recursive function findElement that searches for a specific string inside a nested array (an array that can contain other arrays).

// Preconditions: 1. The first argument must be an Array. 2. The second argument must be a String.

// Postcondition: Returns true if the string exists anywhere inside the nested structure, otherwise false.

//   Constraint: You must use recursion to handle the nesting.

const findElement = (arr, str) => {
  // PRECONDITIONS
  if (!Array.isArray(arr) || typeof str !== "string") {
    return "Invalid Input";
  }

  for (const item of arr) {
    if (Array.isArray(item)) {
      // RECURSIVE CALL: Search inside the nested array
      if (findElement(item, str) === true) {
        return true;
      }
    } else if (item === str) {
      // BASE CASE: Found the string
      return true;
    }
  }

  // BASE CASE: Checked everything and found nothing
  return false;
};

// Test Cases
console.log(findElement(["apple", ["orange", ["banana"]]], "banana")); // true
console.log(findElement([["a"], ["b", ["c"]]], "d"));                  // false
console.log(findElement("not an array", "apple"));                    // "Invalid Input"
const getSegment = (arr, st, end) => {
  // Preconditions
  if (!Array.isArray(arr)) {
    return "Invalid Input";
  }
  if (typeof st !== "number" || typeof end !== "number" || st >= end) {
    return "Invalid Input";
  }

  // Postcondition: st is inclusive, end is exclusive
  return arr.slice(st, end);
};

// Test Cases
console.log(getSegment([1, 2, 3, 4], 1, 3)); // Output: [2, 3]
console.log(getSegment("not an array", 0, 2)); // Output: "Invalid Input"
console.log(getSegment([1, 2], 5, 2)); // Output: "Invalid Input"

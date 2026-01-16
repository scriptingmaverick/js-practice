const countdown = (n) => {
  // PRECONDITIONS
  if (typeof n !== "number" || n < 0) {
    return "Invalid Input";
  }

  // BASE CASE (Ensuring the contract's final output is a string)
  if (n === 0) {
    return "0";
  }

  // RECURSIVE STEP
  return `${n}, ${countdown(n - 1)}`;
};

// Test Cases
console.log(countdown(3));    // Output: "3, 2, 1, 0"
console.log(countdown(-1));   // Output: "Invalid Input"
console.log(countdown("5"));  // Output: "Invalid Input"
// The Counter Factory (Closures)
// Goal: Create a function createVault that takes a "secret code" (string). It should return an object with two functions: checkCode and changeCode.
// Preconditions: The initial secret code must be a String.
// Contract: The actual secret code variable should not be accessible from outside the function (use a closure).
// Functions in Object:
// checkCode(attempt): Returns true if attempt matches the secret, else false.
// changeCode(oldCode, newCode): Changes the secret only if oldCode is correct.
const createVault = (secretCode) => {
  // PRECONDITION
  if (typeof secretCode !== "string") return "Invalid Input";

  // The variable 'secretCode' is trapped in this scope (Closure)
  return {
    checkCode(attempt) {
      return attempt === secretCode;
    },
    changeCode(oldCode, newCode) {
      if (oldCode !== secretCode || typeof newCode !== "string") {
        return false;
      }
      secretCode = newCode; // Updating the private variable
      return true; 
    }
  };
};

// Test Cases
const vault = createVault("1234");
console.log(vault.checkCode("1234"));         // true
console.log(vault.changeCode("0000", "5678")); // false
console.log(vault.changeCode("1234", "5678")); // true
console.log(vault.checkCode("5678"));         // true
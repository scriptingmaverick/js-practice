const updateProfile = (user, newName, newAge) => {
  // PRECONDITIONS
  if (typeof user !== "object" || user === null || Array.isArray(user)) {
    return "Invalid Input";
  }
  if (typeof newName !== "string" || newName.length <= 2) {
    return "Invalid Input";
  }
  if (typeof newAge !== "number" || newAge < 0 || newAge > 120) {
    return "Invalid Input";
  }

  // Implementation
  user.name = newName;
  user.age = newAge;

  // POSTCONDITION: Returns the updated object
  return user;
};

// Test Cases
console.log(updateProfile({name: "Ali", age: 20}, "Alex", 21)); 
// Output: {name: "Alex", age: 21}

console.log(updateProfile({name: "Ali"}, "A", 21)); 
// Output: "Invalid Input"

console.log(updateProfile({name: "Ali"}, "Alex", "21")); 
// Output: "Invalid Input"
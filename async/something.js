console.log("1: Script Start"); // Synchronous

new Promise((r) => {
  console.log("In promise");
});

console.log("4: Script End"); // Synchronous

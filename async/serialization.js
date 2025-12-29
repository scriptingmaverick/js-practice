// const p = new Promise((resolve, reject) => {
//   console.log("1 sec");
//   setTimeout(() => {
//     console.log("after 2 sec");
//     setTimeout(() => {
//       console.log("after 3 sec");
//       setTimeout(() => {
//         console.log("after 4 sec");
//       }, 4000);
//     }, 3000);
//   }, 2000);
//   resolve(3000);
// });

// p.then((x) => console.log(x));

function task1() {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Task 1 done");
      resolve("Result 1");
    }, 1000);
  });
}

function task2() {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Task 2 done");
      resolve("Result 2");
    }, 1000);
  });
}

function task3() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(200)
      console.log("Task 3 done");
    }, 3000);
  });
}

// Run sequentially`
// task1()
//   .then(() => task2())
//   .then(() => task3())
//   .then(() => console.log("All tasks done in sequence"));

// // Run in parallel
Promise.any([task1(), task2(), task3()]).then((results) => {
  console.log("All tasks done in parallel");
  console.log(results); // ["Result 1", "Result 2", "Result 3"]
});

// Promise.all([1, 2, 3]).then((values) => console.log(values));

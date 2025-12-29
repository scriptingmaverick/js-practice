const p = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log("after 2 sec");
  }, 2000);
  resolve(3000);
});

console.log(p);

p.then((x) => {
  setTimeout(() => {
    console.log("after 3 sec");
  }, x);
})
  .then(() => {
    setTimeout(() => {
      console.log("after 4 sec");
    }, 4000);
  })
  .then(() => {
    setTimeout(() => {
      console.log("after 2 sec of 2nd");
    }, 2000);
  });

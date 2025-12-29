const newF = () => {
  const fun = () => {
    console.log("hiii");
    setTimeout(() => console.log("jaiii"), 2000);
    console.log("byeee");
  };

  console.log("bhimmmaaa");
  setTimeout(() => console.log("khaa"), 100);
  console.log("laaaassssst");
  fun();
};

newF();
console.log("afterrr");

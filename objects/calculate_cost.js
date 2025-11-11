const prices = {
  apple: 100,
  banana: 20,
  orange: 50,
  mango: 40,
  pineapple: 60,
  sapota: 10,
  lime: 5,
};
const items = [
  "apple",
  "mango",
  "orange",
  "banana",
  "lime",
  "sapota",
  "pineapple",
];

function randomElement(lower, upper) {
  return lower + Math.floor(Math.random() * (upper - lower));
}

function randomData(array, noOfElements) {
  const data = [];
  for (let i = 0; i < noOfElements; i++) {
    data.push(array[randomElement(0, array.length)]);
  }

  return data;
}

const addCost = (previousCost, element) => previousCost + prices[element];

const calculateCost = (shoppingList) => {
  console.log(
    "Total cost for the items : [" + shoppingList + "] is : " +
      shoppingList.reduce(addCost, 0)+'$'
  );
};

const createList = (noOfItems) => randomData(items, noOfItems);

calculateCost(createList(10));

function randomElement(lower, upper) {
  return lower + Math.floor(Math.random() * (upper - lower));
}

function randomData(noOfElements) {
  const data = [];
  for (let i = 0; i < noOfElements; i++) {
    data.push(randomElement(-5, 5));
  }

  return data;
}

const categorize = (data) => {
  const groups = {};

  for (const element of data) {
    if (!groups[element]) groups[element] = [];
    groups[element].push(element);
  }

  return Object.keys(groups)
    .sort((a, b) => a - b)
    .map((x) => groups[x]);
};

console.log(categorize(randomData(10)));

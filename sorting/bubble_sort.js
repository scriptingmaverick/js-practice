function sort(data) {
  const sortedData = data.slice();
  for (let i = 0; i < data.length; i++) {
    for (let j = i + 1; j < data.length; j++) {
      if (sortedData[j] < sortedData[i]) {
        const temp = sortedData[i];
        sortedData[i] = sortedData[j];
        sortedData[j] = temp;
      }
    }
  }

  return sortedData;
}

function randomElement(upper, lower) {
  return lower + Math.floor(Math.random() * (upper - lower));
}

function randomData(noOfElements) {
  const data = [];
  for (let i = 0; i < noOfElements; i++) {
    data.push(randomElement(1, 100));
  }

  return data;
}

function print(message, data) {
  console.log(`\n${message} : ${data}`);
}

function heading(text) {
  console.log(`\n\t\t${text}\n\t\t${'-'.repeat(text.length)}`);
}

function testSort(noOfElements) {
  const data = randomData(noOfElements);
  const sortedData = sort(data);
  heading('bubble sort');
  print('og data', data);
  print('sorted data', sortedData);
}

testSort(5);
testSort(15);

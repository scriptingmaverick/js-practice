function sort(data) {
  const sortedData = data.slice();
  for (let i = 0; i < data.length; i++) {
    if (sortedData[i] > sortedData[i + 1]) {
      const temp = sortedData[i];
      sortedData[i] = sortedData[i + 1];
      sortedData[i + 1] = temp;
      let prev_index = i;
      while (prev_index > 0 && sortedData[prev_index] < sortedData[prev_index - 1]) {
        const temp = sortedData[prev_index];
        sortedData[prev_index] = sortedData[prev_index - 1];
        sortedData[prev_index - 1] = temp;
        prev_index--;
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

function heading(text){
  console.log(`\n\t\t${text}\n\t\t${'-'.repeat(text.length)}`);
}

function testSort(noOfElements) {
  const data = randomData(noOfElements);
  const sortedData = sort(data);
  heading('insertion sort');
  print('og data', data);
  print('sorted data', sortedData);
}

console.clear();
testSort(5);
testSort(15);

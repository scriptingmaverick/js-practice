const insertionSort = (array) => {
  const sortedData = array;
  for (let i = 0; i < sortedData.length; i++) {
    if (sortedData[i] < sortedData[i + 1]) {
      let prev_index = i+1;
      while (prev_index > 0 && sortedData[prev_index] < sortedData[prev_index - 1]) {
        const temp = sortedData[prev_index];
        sortedData[prev_index] = sortedData[prev_index - 1];
        sortedData[prev_index - 1] = temp;
        prev_index--;
      }
    }
  }
};
const arr = [1, 5, 3, 8, 2, 7, 2];
insertionSort(arr);

console.log(arr);
const timSort = (array) => {
  if (array.length < 32) {
    insertionSort(array);
  }
};

const run = (text) => console.log(text);

const removeDups = (distincts, currentElem) => {
  if (!distincts.includes(currentElem)) {
    distincts.push(currentElem);
  }
  return distincts;
}

const sumOfArr = (sum, currentElem) => {
  sum += parseInt(currentElem);
  return sum;
}

const reversingdata = (data, currentElem) => {
  data.unshift(currentElem);
  return data;
}


const convertToList = (array) => {
  return array.flat();
}

const countingOccurance = (array, specimen) => {
  return array.filter(elem => elem.includes(specimen)).length;
}

const reduceArray = (array, reducer, initialValue) => {
  return array.flat().reduce(reducer, initialValue);
}


const isSomethingPresent = (array, criteria) => {
  return array.flat().some(criteria);
}

const isEveryThingSatisfies = (array, criteria) => {
  return array.flat().every(criteria);
}

const frequencyInData = (array) => {
  const frequency = array.map((elem) => {
    return [elem, array.reduce((count, currentElem) => {
      count = currentElem === elem ? count + 1 : count;
      return count;
    }, 0)]
  })

  const formatFrequency = (formattedData, currentElem) => {
    if (!isSomethingPresent(formattedData, elem => elem === currentElem[0])) {
      formattedData.push(currentElem);
    }
    return formattedData;
  }

  const formattedFrequency = frequency.reduce(formatFrequency, []);
  return formattedFrequency;
}


run(convertToList([["Orion", "Leo"], ["Taurus"], ["Orion", "Gemini"]]));

run(reduceArray(["sparrow", "crow", "sparrow", "eagle", "crow"], removeDups, []));
run(reduceArray([["Asha", "Ravi", "Neel"], ["Ravi"], ["Asha", "Meera"]], removeDups, []));
run(reduceArray([["blue", "yellow"], ["yellow", "green"], ["blue"]], removeDups, []));

run(reduceArray([[5, 3], [2], [4, 1]], sumOfArr, 0));
run(reduceArray([[2, 3, 2], [4], [1, 1]], sumOfArr, 0));

run(reduceArray([[2, 3, 2], [4], [1, 1]], reversingdata, []));

run(countingOccurance(["red", "blue", "red", "green", "red", "blue"], 'blue'));
run(countingOccurance(['dune', 'seetimaar', 'dune', 'megalodon', 'dune', 'seetimaar'], 'dune'));

run(isSomethingPresent([["mi", "fa", "so"], ["do", "mi"], ["fa"]], elem => elem === 'do'));

run(isEveryThingSatisfies([[22, 23], [25, 24, 22], [29]], (elem) => { elem < 32 }));

run(frequencyInData(['the', 'er', 'the', 'yu', 'er']));
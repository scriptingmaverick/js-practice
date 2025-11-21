function iterateOverAndDoTaskOnCondition(array, condition, task = function (element) { return element }) {
  const criteriaPassedElements = [];
  for (let i = 0; i < array.length; i++) {
    if (condition(array[i])) {
      criteriaPassedElements.push(task(array[i]));
      break;
    }
  }
  console.log('ct ',criteriaPassedElements)

  return criteriaPassedElements;
}

const iterateOverAndDoTask = function (array, task) {
  const criteriaPassedElements = [];
  for (let i = 0; i < array.length; i++) {
    console.log('ar',array[i],'task ',task(array[i]))
    // criteriaPassedElements.push(task(array[i]));
  }

  return criteriaPassedElements;
}


const st = 'l';
// console.log('lasst ',iterateOverAndDoTask(st, (element) => { iterateOverAndDoTaskOnCondition(CASED_LETTERS, (elem) => { return elem.includes(element) }, (elem) => { return elem[1] }) }))
// console.log('lasst ',iterateOverAndDoTaskOnCondition(CASED_LETTERS, (elem) => { return elem.includes(st) }, (elem) => { return elem[1] }))
console.log('lasst ',((element) => { iterateOverAndDoTaskOnCondition(CASED_LETTERS, (elem) => { return elem.includes(element) }, (elem) => { return elem[1] }) })(sl))
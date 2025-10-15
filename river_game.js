const MAX_RIVER_PATH = 80;
const EMOJIS = ['🐺', '🐑', '🌳'];

let leftSide_animals = '';
let rightSide_animals = '';
let user_choices = '__';

function delay(x = 2) {
  for (let i = 0; i < 500000000 * x; i++);
}

function pad(length, end, text = '') {
  const maxLen = length > MAX_RIVER_PATH ? MAX_RIVER_PATH : length;
  return text.padStart(end + text.length).padEnd(maxLen);
}

function generateSequence(length, char = ' ', begin = '', end = '') {
  return begin + char.repeat(length - begin.length - end.length) + end;
}

function changeToEmojis(array) {
  let emojis = '';
  for (let index = 0; index < array.length; index++) {
    switch (array[index]) {
      case '1':
        emojis += EMOJIS[0];
        break;
      case '2':
        emojis += EMOJIS[1];
        break;
      case '3':
        emojis += EMOJIS[2];
        break;
      default:
        emojis += ' ';
        break;
    }
  }
  return emojis;
}

function getBoat(boatPosition) {
  const choices = changeToEmojis(user_choices);
  let firstPart = `________🕺___`;
  const secondPart = `\\___${generateSequence(choices.length + 2, '_')}____/`;
  if (choices !== '  ') {
    firstPart = `___${choices}___🕺___`;
  }

  const boat = [firstPart, secondPart];
  boat[0] = `|${pad(80, boatPosition, boat[0])}|`;
  boat[1] = `|${pad(80, boatPosition, boat[1])}|`;
  return boat;
}

function getLine3Elem1() {
  const leftSide = changeToEmojis(leftSide_animals);
  return pad(25, 24 - leftSide.length, leftSide);
}

function checkAndReplace(emojis) {
  // console.log('in chkAndReplace : ', array, emojis);
  let replacedArray = leftSide_animals.split('');
  for (let emojiIndex = 0; emojiIndex < emojis.length; emojiIndex++) {
    // console.log('before replacing : ',replacedArray,emojis)
    // replacedArray = replacedArray.replace(emojis[emojiIndex], ' ');
    for (let index = 0; index < replacedArray.length; index++) {
      if (replacedArray[index] === emojis[emojiIndex]) {
        replacedArray[index] = ' ';
        break;
      }
    }
    // console.log('after replacing : ',replacedArray)
  }

  leftSide_animals = replacedArray.reverse().join('')
  return changeToEmojis(leftSide_animals);
}

function getline2And3(boatPosition, scene = 0) {
  let boat = getBoat(boatPosition);
  // console.log(boat.join('\n'))
  // console.log(changeToEmojis(leftSide), changeToEmojis(rightSide), boatPosition, changeToEmojis(user_choices), scene);
  const line2 = [generateSequence(25), generateSequence(40), generateSequence(25)];
  const line3 = [getLine3Elem1(), boat[0], pad(25, 1, changeToEmojis(rightSide_animals))];
  if (scene === 0) {
    return [line2, line3];
  }
  // console.log('before : ')
  // console.log(line2.join('\n'));
  // console.log(line3.join('\n'));
  boat = getBoat(boatPosition);
  line3[1] = boat[0];

  if (scene === 1) {
    return [line2, line3];
  }

  switch (scene) {
    case 2:
      line2[0] = generateSequence(25 - user_choices.length) + changeToEmojis(user_choices);
      break;
    case 3:
      line2[1] = generateSequence(6 - user_choices.length) + changeToEmojis(user_choices) + generateSequence(40 - 6 - user_choices.length);
      break;
    case 4:
      boat = getBoat(boatPosition, changeToEmojis(user_choices));
      line3[1] = boat[0];
      break;
    case 5:
      const firstPart = 40 - boat[0].length + 4;
      line2[1] = generateSequence(firstPart) + changeToEmojis(user_choices) + generateSequence(40 - firstPart - user_choices.length);
      break;
    case 6:
      line2[2] = changeToEmojis(user_choices) + generateSequence(25 - user_choices.length);
      break;
    case 7:
      rightSide += changeToEmojis(user_choices);
      line3[2] = pad(25, 1, changeToEmojis(rightSide_animals));
      break;
  }
  leftSide_animals = checkAndReplace(user_choices);
  // console.log('after replace : ',leftSide_animals)
  line3[0] = getLine3Elem1();

  // console.log('')
  return [line2, line3];
}
// console.clear();
// console.log(getline2And3('123', '23', 3, '12', 1).join('\n'))
// delay()
// console.log(getline2And3('123', '23', 3, '12', 2).join('\n'))
// delay()
// console.log(getline2And3('123', '23', 3, '12', 3).join('\n'))

function generateGround(boatPosition = 3, scene = 0) {
  const boat = getBoat(boatPosition);
  const waterGround = generateSequence(40, '☵');
  const lines = getline2And3(boatPosition, scene);
  const line2 = lines[0];
  const line3 = lines[1];
  const ground = [
    [generateSequence(25), generateSequence(40), generateSequence(25)],
    [line2[0], line2[1], line2[2]],
    [line3[0], line3[1], line3[2]],
    [generateSequence(25, '-'), boat[1], generateSequence(25, '-')],
    [generateSequence(26, ' ', '', '|'), generateSequence(40, '🌊'), generateSequence(25, ' ', '|')],
    [generateSequence(26, ' ', '', '|'), generateSequence(40, '🌊'), generateSequence(25, ' ', '|')],
    [generateSequence(26, ' ', '', '|'), waterGround, generateSequence(25, ' ', '|')],
    [generateSequence(26, ' ', '', '|'), waterGround, generateSequence(25, ' ', '|')],
    [generateSequence(26, ' ', '', '|'), waterGround, generateSequence(25, ' ', '|')]
  ]
  const newGround = [];
  for (let index = 0; index < ground.length; index++) {
    newGround[index] = ground[index].join('');
  }
  return newGround.join('\n');
}

function generateScene(leftSide, rightSide, choices) {
  leftSide_animals = leftSide;
  rightSide_animals = rightSide;
  let ground = generateGround(3, 1);
  // console.log(ground)
  if (user_choices !== '__') {
    for (let i = 2; i <= 3; i++) {
      console.log(ground);
      delay();
      ground = generateGround(3, i);
      console.clear();
    }
  }
  //   console.log(ground);
    // delay();
    // user_choices = choices;
    // ground = generateGround(3, 4);
    // console.clear();
    // delay();
    // console.log(ground);
  

  // console.clear();
  // for (let index = 8; index < MAX_RIVER_PATH; index += 5) {
  //   console.log(ground);
  //   delay();
  //   vars = generateGround(leftSide, rightSide, index, user_choices);
  //   ground = vars[0];
  //   console.clear();
  // }
  // console.log(ground);
  // leftSide = vars[1];

  // console.log(leftSide);
}

// generateScene('123', '12');
console.clear()
// leftSide_animals = '13'
// rightSide_animals = '23'
// console.log(generateGround())
// user_choices = '12'
// console.log(generateGround());
// user_choices = '1'
// console.log(generateGround(45));
// console.log(generateGround(65));
// console.log(generateGround(66));
generateScene('123', '12', '23'); 

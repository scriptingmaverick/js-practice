const MAX_RIVER_PATH = 82;
const MAX_CROSS_PATH = 68;
const EMOJIS = ['🐺', '🐑', '🌳'];

const easyStrips = [
  '123', '223', '112', '133'
]

const mediumStrips = [
  '1231', '1123'
]

const hardStrips = [
  '22133', '12132', '11231'
]

let leftSide_animals = '';
let rightSide_animals = '';
let user_choices = '';


let canIncludeAnimals = false;
let atEnd = false;
let deathMsg = '';

let choice_limit = 2;

function delay(x = 2) {
  for (let i = 0; i < 100000000 * x; i++);
}

function pad(length, end, text = '') {
  const maxLen = end + text.length > MAX_RIVER_PATH ? MAX_RIVER_PATH : length;
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
  let firstPart = `________🕺___`;
  let secondPart = `\\___${generateSequence(4, '_')}____/`;
  if (canIncludeAnimals) {
    const choices = changeToEmojis(user_choices);
    firstPart = `___${choices}___🕺___`;
    secondPart = `\\___${generateSequence(choices.length + 2, '_')}____/`;
  }
  if (atEnd) {
    boatPosition += 2;
  }
  const boat = [firstPart, secondPart];
  boat[0] = `${pad(82, boatPosition, boat[0])}`;
  boat[1] = `${pad(82, boatPosition, boat[1])}`;
  return boat;
}

function getLine3Elem1() {
  const leftSide = changeToEmojis(leftSide_animals);
  return pad(25, 24 - leftSide.length, leftSide);
}

function checkAndReplace(side = 'left') {
  let arrayToBeChecked = side === 'left' ? leftSide_animals : rightSide_animals;
  for (let emojiIndex = 0; emojiIndex < user_choices.length; emojiIndex++) {
    if (arrayToBeChecked.includes(user_choices[emojiIndex])) {
      arrayToBeChecked = arrayToBeChecked.replace(user_choices[emojiIndex], ' ')
    }
  }

  if (side === 'left') {
    leftSide_animals = arrayToBeChecked.split('').sort().join('');
    return;
  }

  rightSide_animals = arrayToBeChecked.split('').sort().join('');
}

function getMidLines(boatPosition, scene = 0) {
  let boat = getBoat(boatPosition);
  const line2 = [generateSequence(25), generateSequence(40), generateSequence(25)];
  const line3 = [getLine3Elem1(), boat[0], pad(25, 1, changeToEmojis(rightSide_animals))];
  const line4 = [generateSequence(25, '-'), boat[1], generateSequence(25, '-')];

  if (scene === 0 || scene === 1) {
    return [line2, line3, line4];
  }
  delay()
  line2[1] = generateSequence(83);
  switch (scene) {
    case 2:
      line2[0] = generateSequence(25 - user_choices.length * 2 - 1) + changeToEmojis(user_choices);
      break;
    case 3:
      line2[1] = generateSequence(6) + changeToEmojis(user_choices) + generateSequence(40 - 6 - user_choices.length);
      break;
    case 4:
      canIncludeAnimals = true;
      boat = getBoat(boatPosition);
      line3[1] = boat[0];
      line4[1] = boat[1];
      break;
    case 5:
      line3[1] = boat[0];
      line4[1] = boat[1];
      canIncludeAnimals = false;
      atEnd = true;
      break;
    case 6:
      const firstPart = 40 - boat[0].trim().length - 1;
      line2[1] = generateSequence(firstPart + 42 + user_choices.length * 2) + changeToEmojis(user_choices) + generateSequence(8);
      break;
    case 7:
      line2[2] = changeToEmojis(user_choices) + generateSequence(25 - user_choices.length * 2);
      break;
    case 8:
      rightSide_animals += user_choices;
      line3[2] = pad(25, 1, changeToEmojis(rightSide_animals));
      break;
    case 9:
      line3[2] = pad(25, 1, changeToEmojis(rightSide_animals));
      break;
    case 10:
      line2[2] = changeToEmojis(user_choices) + generateSequence(25 - user_choices.length * 2 - 1);
      break;
    case 11:
      const spacePart = 40 - boat[0].trim().length;
      line2[1] = generateSequence(spacePart + 40 + user_choices.length) + changeToEmojis(user_choices) + generateSequence(8);
      canIncludeAnimals = true;
      atEnd = false;
      break;
    case 12:
      boat = getBoat(boatPosition);
      line3[1] = boat[0];
      line4[1] = boat[1];
      break;
    case 13:
      line2[1] = generateSequence(6) + changeToEmojis(user_choices) + generateSequence(40 - 6 - user_choices.length);
      break;
    case 14:
      line2[0] = generateSequence(25 - user_choices.length * 2 - 1) + changeToEmojis(user_choices);
      break;
    case 15:
      leftSide_animals += user_choices;
      user_choices = '';
      break;
  }
  line3[0] = getLine3Elem1();
  return [line2, line3, line4];
}

// user_choices = '12'
// console.log(getMidLines(3, 13).join('\n'))
// console.log(getMidLines(3, 14).join('\n'))
// console.log(getMidLines(3, 15).join('\n'))
// user_choices = rightSide_animals;
// rightSide_animals = ''
// user_choices = '23';
// rightSide_animals = '23'
// console.log(getMidLines(66, 9).join('\n'))

// checkAndReplace('right')
// console.log(getMidLines(66, 10).join('\n'))
// console.log(getMidLines(66, 11).join('\n'))
// console.log(getMidLines(66, 12).join('\n'))

function checkingRight(lf, rf, uc) {
  leftSide_animals = lf;
  rightSide_animals = rf;
  user_choices = uc;
  let ground = generateGround(66, 9);
  checkAndReplace('right')
  for (let index = 10; index < 13; index += 1) {
    // console.log(ground, '\n i v-> ', index);
    delay();
    ground = generateGround(66, index);
    console.clear();
  }
  console.log(ground);
}

// checkingRight('12', '23', '2');

function generateGround(boatPosition = 3, scene = 0) {
  const waterGround = generateSequence(40, '☵');
  const lines = getMidLines(boatPosition, scene);
  // console.log(lines)
  const line2 = lines[0];
  const line3 = lines[1];
  const line4 = lines[2];
  const ground = [
    [generateSequence(25), generateSequence(40), generateSequence(25)],
    [line2[0], line2[1], line2[2]],
    [line3[0], line3[1], line3[2]],
    [line4[0], line4[1], line4[2]],
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

function formatAnimals(animals, emoji, side = 'left') {
  if (side === 'left') {
    return leftSide_animals = animals.replaceAll(emoji, ' ').split('').sort().join('');
  }
  return rightSide_animals = animals.replaceAll(emoji, ' ').split('').sort().join('');
}

function checkAnimalPair(animals, predator, prey, side = 'left') {
  if (animals.includes(predator) && animals.includes(prey)) {
    formatAnimals(animals, prey, side);
    deathMsg = changeToEmojis(predator) + ' has eaten the ' + changeToEmojis(prey);
    return false;
  }

  return true;
}

function canContinue(side = 'left') {
  const animals = side === 'left' ? leftSide_animals : rightSide_animals;
  return checkAnimalPair(animals, '1', '2', side) && checkAnimalPair(animals, '2', '3', side);
}

function changeAnimals(isLeftSide = true) {
  const boatPosition = isLeftSide ? 3 : 66;
  const startScene = isLeftSide ? 1 : 9;
  const endScene = isLeftSide ? 4 : 12;
  let ground = generateGround(boatPosition, startScene);
  checkAndReplace(isLeftSide ? 'left' : 'right');
  console.clear();
  for (let i = startScene + 1; i < endScene + 1; i++) {
    console.log(ground);
    delay();
    ground = generateGround(boatPosition, i);
    console.clear();
  }
  return ground;
}

function generateScene(leftSide, rightSide, choices) {
  leftSide_animals = leftSide;
  rightSide_animals = rightSide;
  user_choices = choices;

  let ground = changeAnimals();

  // start crossing
  for (let index = 8; index < 18; index += 5) {
    console.log(ground);
    delay();
    ground = generateGround(index, 4);
    console.clear();
  }
  console.log(ground);


  // check for logic
  if (!canContinue()) {
    delay();
    ground = generateGround(18, 4);
    console.clear();
    console.log(ground);
    console.log(deathMsg);
    return;
  }

  // resume crossing
  const maxCrossingPath = user_choices.length * 2 < 5 ? MAX_CROSS_PATH - 5 : MAX_CROSS_PATH - 10;
  console.clear();
  for (let index = 18; index <= maxCrossingPath; index += 5) {
    console.log(ground);
    delay();
    ground = generateGround(index, 4);
    console.clear();
  }
  console.log(ground);

  const endingPath = 68 - user_choices.length * 2 + (user_choices.length === 2 ? 2 : -1);
  delay();
  ground = generateGround(endingPath, 5);
  console.clear();

  // changing right-side animals
  for (let i = 6; i <= 8; i++) {
    console.log(ground);
    delay();
    ground = generateGround(endingPath, i);
    console.clear();
  }
  console.log(ground);
}
// generateScene('122', '', '12')

function randomStrip(level = 'easy') {
  switch (level) {
    case 'easy':
      const index = Math.floor(Math.random() * easyStrips.length + 1) - 1;
      return easyStrips[index];
    case 'medium':
      return mediumStrips[Math.round(Math.random() * mediumStrips.length)];
    default:
      return hardStrips[Math.round(Math.random() * hardStrips.length)];
  }
}

function isValidChoice() {
  if (user_choices.length > choice_limit) {

  }
}

function getChoices(animalSet, ground, isLeftSide = true) {
  while (true) {
    console.clear();
    console.log(ground, '\n')
    delay();
    console.log('1. 🐺  \n2. 🐑  \n3. 🌳')
    user_choices = prompt("enter your combination of animal indices (separated by a comma): ").replaceAll(',', '');
    // isValidChoice();
    ground = changeAnimals(isLeftSide);
    console.log(ground, '\n');

    if (!confirm('want to change animals')) {
      return ground;
    }

    user_choices = '';
    canIncludeAnimals = false;
    if (isLeftSide) {
      leftSide_animals = animalSet;
      ground = generateGround()
      continue;
    }

    rightSide_animals = animalSet;
    atEnd = true;
    ground = generateGround(66, 9)
  }
}

function gameOnSides() {
  let ground = generateGround();
  getChoices(ground);
  return ground;
}

function crossRiver(ground, direction = 'l-r', start = 8, checkingPosition = 18, checkingScene = 4) {
  // start crossing
  console.clear();
  const side = direction === 'l-r' ? 'left' : 'right';
  if (direction === 'l-r') {
    for (let index = start; index < checkingPosition; index += 5) {
      console.log(ground);
      delay();
      ground = generateGround(index, checkingScene);
      console.clear();
    }
  } else {
    for (let index = start; index > checkingPosition; index -= 5) {
      console.log(ground);
      delay();
      ground = generateGround(index, checkingScene);
      console.clear();
    }
  }
  console.log(ground);


  // check for logic
  if (!canContinue(side)) {
    delay();
    ground = generateGround(checkingPosition, checkingScene);
    console.clear();
    console.log(ground);
    console.log(deathMsg);
    return '';
  }

  // resume crossing

  console.clear();
  if (direction === 'l-r') {
    const maxCrossingPath = user_choices.length * 2 < 5 ? MAX_CROSS_PATH - 5 : MAX_CROSS_PATH - 10;
    for (let index = checkingPosition; index <= maxCrossingPath; index += 5) {
      console.log(ground);
      delay();
      ground = generateGround(index, checkingScene);
      console.clear();
    }
    console.log(ground);

    const endingPath = 68 - user_choices.length * 2 + (user_choices.length === 2 ? 2 : -1);
    delay();
    ground = generateGround(endingPath, checkingScene);
    console.clear();

    for (let currentScene = checkingScene + 1; currentScene < 9; currentScene++) {
      console.log(ground);
      delay();
      ground = generateGround(endingPath, currentScene);
      console.clear();
    }
    return ground;
  }

  for (let index = checkingPosition; index > 6; index -= 5) {
    console.log(ground);
    delay();
    ground = generateGround(index, checkingScene);
    console.clear();
  }

  console.log(ground);
  delay();
  ground = generateGround(3, checkingScene);
  canIncludeAnimals = false;
  console.clear()

  for (let currentScene = 13; currentScene < 16; currentScene++) {
    console.log(ground);
    delay();
    ground = generateGround(3, currentScene);
    console.clear();
  }
  return ground;
}

// user_choices = '21';
// rightSide_animals = '331';
// console.log(changeAnimals())

// user_choices = '13';
// console.log(changeAnimals(false))


// user_choices = '';
// canIncludeAnimals = false;
// ground = generateGround(66, 9);
// console.clear()
// getChoices('122', ground, false)

// let ground = generateGround(3, 4);
// console.log(crossRiver(ground));
// ground = generateGround(66, 4);
// console.clear();
// console.log(crossRiver(ground, 'r-l', 61, 56));
// console.log(crossRiver(ground))

function startGame() {
  const animalSet = randomStrip();
  leftSide_animals = animalSet;

  while (true) {
    let ground = generateGround();
    ground = getChoices(animalSet, ground);
    ground = crossRiver(ground);
    if (leftSide_animals.trim() === '') {
      console.log(ground);
      console.log('\n you won.')
      return;
    }
    ground = getChoices(rightSide_animals, ground, false);
    ground = crossRiver(ground, 'r-l', 61, 56);
    console.log(ground);
  }
}

startGame();

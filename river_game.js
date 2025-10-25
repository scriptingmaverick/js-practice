const MAX_RIVER_PATH = 80;
const MAX_CROSS_PATH = 68;
const EMOJIS = ['🐺', '🐑', '🌳'];
const MAX_CHARS_IN_CMD_LINE = 132;

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
let deathMsg = '';
let choice_limit = 2;

let backup_leftSide_animals = '';
let backup_rightSide_animals = '';

const splCharIdentifier = '\x1B[3';

function turnGreen(text) {
  return "\x1B[32m" + text + "\x1B[0m";
}

function turnYellow(text) {
  return "\x1B[33m" + text + "\x1B[0m";
}

function turnMagenta(text) {
  return "\x1B[35m" + text + "\x1B[0m";
}

function turnRed(text) {
  return "\x1B[31m" + text + "\x1B[0m";
}

function turnBlue(text) {
  return "\x1B[34m" + text + "\x1B[0m";
}

function turnCyan(text) {
  return "\x1B[36m" + text + "\x1B[0m";
}

function getNormalRules() {
  return [
    '-> Choose a combination of atleast ' + 1 + ' animal or atmost ' + choice_limit + ' animals.',
    '-> ' + turnRed('wolf will eat the sheep') + ", If sheep's are less than wolf's.",
    '-> ' + turnRed('sheep will eat the plant') + ", If plant's are less than sheep's."
  ];
}

function findPreviousSpace(line, maxChars) {
  for (let index = maxChars; index > 0; index--) {
    if (line[index] === ' ') {
      return index;
    }
  }
}

function formatLine(line, maxChars = MAX_CHARS_IN_MODE_LINE, arr = []) {
  if (line.length < maxChars) {
    arr.push(line.padEnd(maxChars));
    return arr;
  }

  const formattedLines = arr;
  const slicingInd = findPreviousSpace(line, maxChars);
  const newMax = slicingInd > maxChars ? slicingInd : maxChars;
  formattedLines.push(line.slice(0, slicingInd).padEnd(newMax));
  return formatLine('  ' + line.slice(slicingInd), newMax, formattedLines);
}

function formatLinesInArray(array, maxChars = MAX_CHARS_IN_MODE_LINE) {
  const formattedArray = [];
  const splLines = [false, true, true];
  for (let index = 0; index < array.length; index++) {
    formattedArray[index] = formatLine(array[index], maxChars);
  }

  return formattedArray;
}

function createSequence(length, endsChar = '', char = '_',) {
  return endsChar + char.repeat(length) + endsChar;
}

function underLinedText(text, arr) {
  arr.push(createNewLineInSection(text));
  arr.push(createNewLineInSection(createSequence(text.length)));
  return arr;
}

function createNewLineInSection(text = '', length = MAX_CHARS_IN_CMD_LINE) {
  const textLen = text.length;
  const remaining = length - textLen;
  const paddingAtStart = remaining / 2 + textLen;
  const excess = text.includes(splCharIdentifier) ? 9 : 0;
  return '|' + text.padStart(paddingAtStart).padEnd(textLen + remaining + excess) + '|';
}

function addRulesInSection(lines, rules, maxChars) {
  const formattedLines = lines;
  for (let index = 0; index < rules.length; index++) {
    for (let innerIndex = 0; innerIndex < rules[index].length; innerIndex++) {
      formattedLines.push(createNewLineInSection(rules[index][innerIndex], maxChars));
    }
    formattedLines.push(createNewLineInSection('', maxChars));
  }

  return formattedLines;
}

function addHeading(lines, heading, maxChars) {
  let formattedLines = lines;
  formattedLines.push(createNewLineInSection('', maxChars));
  formattedLines = underLinedText(heading, formattedLines);
  formattedLines.push(createNewLineInSection('', maxChars));
  return lines;
}

function formatNormalSection(normalRules, maxChars = MAX_CHARS_IN_CMD_LINE) {
  let formattedLines = [];
  formattedLines.push(createSequence(maxChars, ' '));
  formattedLines = addHeading(formattedLines, 'Rules To Play', maxChars);
  formattedLines = addRulesInSection(formattedLines, normalRules, maxChars);
  return formattedLines;
}

function printRules(maxChars = MAX_CHARS_IN_CMD_LINE) {
  let rulesSection = formatNormalSection(formatLinesInArray(getNormalRules(), 60));
  rulesSection.push(createSequence(maxChars, ' ', '¯'));
  rulesSection = rulesSection.join('\n');
  console.log(rulesSection);
}

function printRulesAndGround(ground) {
  printRules();
  console.log(ground);
}

function delay(x = 1) {
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

function padForBoat(end, text) {
  end = end + text.length > MAX_RIVER_PATH ? MAX_RIVER_PATH - text.length : end;
  return text.padStart(end + text.length).padEnd(MAX_RIVER_PATH) + '  ';
}

function getBoat(boatPosition) {
  let firstPart = `________🕺___`;
  let secondPart = `\\___${generateSequence(4, '_')}____/`;
  if (canIncludeAnimals) {
    const choices = changeToEmojis(user_choices);
    firstPart = `___${choices}___🕺___`;
    secondPart = `\\___${generateSequence(choices.length + 2, '_')}____/`;
  }

  const boat = [firstPart, secondPart];
  boat[0] = `${padForBoat(boatPosition, boat[0])}`;
  boat[1] = `${padForBoat(boatPosition, boat[1])}`;
  return boat;
}

function getLine3Elem1() {
  const leftSide = changeToEmojis(leftSide_animals);
  return pad(25, 24 - leftSide.length, leftSide);
}

function checkAndReplace(action = 'replace', side = 'left') {
  let arrayToBeChecked = side === 'left' ? leftSide_animals : rightSide_animals;
  const og = arrayToBeChecked;
  for (let emojiIndex = 0; emojiIndex < user_choices.length; emojiIndex++) {
    if (arrayToBeChecked.includes(user_choices[emojiIndex])) {
      arrayToBeChecked = arrayToBeChecked.replace(user_choices[emojiIndex], ' ')
    }
  }

  if (action !== 'replace') {
    return og.trim().length - arrayToBeChecked.replaceAll(' ', '').length === user_choices.length;
  }

  if (side === 'left') {
    leftSide_animals = arrayToBeChecked.split('').sort().join('');
    return;
  }

  rightSide_animals = arrayToBeChecked.split('').sort().join('');
}

function getMidLines(boatPosition, scene = 0) {
  let boat = getBoat(boatPosition);
  const line2 = [generateSequence(25), generateSequence(82), generateSequence(25)];
  const line3 = [getLine3Elem1(), boat[0], pad(25, 1, changeToEmojis(rightSide_animals))];
  const line4 = [generateSequence(25, '-'), boat[1], generateSequence(25, '-')];

  if (scene === 0 || scene === 1) {
    return [line2, line3, line4];
  }
  delay()
  line2[1] = generateSequence(82);
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
      break;
    case 6:
      const firstPart = 40 - boat[0].trim().length - 1;
      line2[1] = generateSequence(firstPart + 42 + user_choices.length * 2) + changeToEmojis(user_choices);
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
      line2[1] = pad(82, 82 - user_choices.length * 2 - 8, changeToEmojis(user_choices));
      canIncludeAnimals = true;
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

function generateGround(boatPosition = 3, scene = 0) {
  const waterGround = generateSequence(40, '☵');
  const lines = getMidLines(boatPosition, scene);
  const line2 = lines[0];
  const line3 = lines[1];
  const line4 = lines[2];
  const ground = [
    [generateSequence(25), generateSequence(40), generateSequence(25)],
    [generateSequence(25), generateSequence(40), generateSequence(25)],
    [line2[0], line2[1], line2[2]],
    [line3[0], line3[1], line3[2]],
    [line4[0], line4[1], line4[2]],
    [generateSequence(26, ' ', '', '|'), generateSequence(40, '🌊'), generateSequence(25, ' ', '|')],
    [generateSequence(26, ' ', '', '|'), generateSequence(40, '🌊'), generateSequence(25, ' ', '|')],
    [generateSequence(26, ' ', '', '|'), waterGround, generateSequence(25, ' ', '|')],
    [generateSequence(26, ' ', '', '|'), waterGround, generateSequence(25, ' ', '|')]
  ]
  const newGround = [];
  for (let index = 0; index < ground.length; index++) {
    newGround[index] = ground[index].join('');
  }
  return newGround.join('\n');
}

function occurrences(string, substring) {
  // Implementation here.
  const subStrLength = substring.length;
  const strLength = string.length;
  if (subStrLength === 0) {
    return 0;
  }

  if (subStrLength > strLength) {
    return 0;
  }
  
  let occurrenceCount = 0;
  const lastIndex = strLength - subStrLength;
  for (let index = 0; index <= lastIndex; index++) {
    if (isSubstringFrom(string, substring, index)) {
      occurrenceCount++;
    }
  }
  
  return occurrenceCount;
}

function isSubstringFrom(string, substring, startIndex) {
  for (let index = 0; index < substring.length; index++) {
    if (string[startIndex + index] !== substring[index]) {
      return false;
    }
  }
  return true;
}

function formatAnimals(animals, emoji, side = 'left') {
  if (side === 'left') {
    leftSide_animals = animals.replaceAll(emoji, ' ').split('').sort().join('');
    return;
  }
  rightSide_animals = animals.replaceAll(emoji, ' ').split('').sort().join('');
}

function checkAnimalPair(animals, predator, prey, side) {
  if(animals.includes(prey) && animals.includes(predator)){
    if (occurrences(animals, predator) >= occurrences(animals, prey)) {
      formatAnimals(animals, prey, side);
      deathMsg = changeToEmojis(predator) + ' has eaten the ' + changeToEmojis(prey);
    }
  }

  return !deathMsg;
}

function canContinue(side = 'left') {
  const animals = (side === 'left' ? leftSide_animals : rightSide_animals).replaceAll(' ', '');
  return checkAnimalPair(animals, '1', '2', side) && checkAnimalPair(animals, '2', '3', side);
}

function changeAnimals(isLeftSide = true) {
  const boatPosition = isLeftSide ? 3 : 66;
  const startScene = isLeftSide ? 1 : 9;
  const endScene = isLeftSide ? 4 : 12;
  let ground = generateGround(boatPosition, startScene);
  checkAndReplace('replace', isLeftSide ? 'left' : 'right');
  console.clear();
  for (let i = startScene + 1; i < endScene + 1; i++) {
    printRulesAndGround(ground);
    delay();
    ground = generateGround(boatPosition, i);
    console.clear();
  }
  return ground;
}

function randomStrip(level = 1) {
  switch (level) {
    case 1:
      return easyStrips[Math.floor(Math.random() * easyStrips.length + 1) - 1];
    case 2:
      return mediumStrips[Math.floor(Math.random() * mediumStrips.length + 1) - 1];
    default:
      choice_limit = 3;
      return hardStrips[Math.floor(Math.random() * hardStrips.length + 1) - 1];
  }
}

function isValidChoice(animalSet, side) {
  if (user_choices.length > choice_limit || user_choices.length < 1) {
    console.log('\n');
    console.log("  Your combination size must be atleast ", 1, " and atmost ", choice_limit);
    return false;
  }

  if (!checkAndReplace('check', side)) {
    console.log('\n');
    console.log("  Your combination must be within this animal range : ", changeToEmojis(animalSet));
    return false;
  }

  return true;
}

function getChoices(animalSet, ground, isLeftSide = true) {
  while (true) {
    console.clear();
    printRulesAndGround(ground);
    console.log('\n');
    delay();
    console.log('1. 🐺  \n2. 🐑  \n3. 🌳');
    const question = "\nenter your combination of animal indices (" + turnYellow("ex: 1,2 or 231") + ") :";
    user_choices = prompt(question).replaceAll(',', '');
    if (!isValidChoice(animalSet, isLeftSide ? 'left' : 'right')) {
      delay(15);
      console.log('\n  Please re-enter your choice');
      delay(30);
      continue;
    }

    if (isLeftSide) {
      backup_leftSide_animals = leftSide_animals;
    } else {
      backup_rightSide_animals = rightSide_animals;
    }

    ground = changeAnimals(isLeftSide);
    printRulesAndGround(ground);
    console.log('\n');

    if (!confirm('want to change animals')) {
      return ground;
    }

    user_choices = '';
    canIncludeAnimals = false;
    if (isLeftSide) {
      leftSide_animals = animalSet;
      ground = generateGround();
      console.clear();
      printRulesAndGround(ground);
      continue;
    }

    rightSide_animals = animalSet;
    ground = generateGround(66, 9)
    console.clear();
    printRulesAndGround(ground);
  }
}

function crossRiver(ground, direction = 'l-r', start = 8, checkingPosition = 18, checkingScene = 4) {
  // start crossing
  console.clear();
  const side = direction === 'l-r' ? 'left' : 'right';
  if (direction === 'l-r') {
    for (let index = start; index < checkingPosition; index += 5) {
      printRulesAndGround(ground);
      delay();
      ground = generateGround(index, checkingScene);
      console.clear();
    }
  } else {
    for (let index = start; index > checkingPosition; index -= 5) {
      printRulesAndGround(ground);
      delay();
      ground = generateGround(index, checkingScene);
      console.clear();
    }
  }
  printRulesAndGround(ground);


  // check for logic
  if (!canContinue(side)) {
    delay();
    ground = generateGround(checkingPosition, checkingScene);
    console.clear();
    printRulesAndGround(ground);
    console.log(deathMsg);
    return '';
  }

  // resume crossing

  console.clear();
  if (direction === 'l-r') {
    const maxCrossingPath = user_choices.length * 2 < 5 ? MAX_CROSS_PATH - 5 : MAX_CROSS_PATH - 10;
    for (let index = checkingPosition; index <= maxCrossingPath; index += 5) {
      printRulesAndGround(ground);
      delay();
      ground = generateGround(index, checkingScene);
      console.clear();
    }
    printRulesAndGround(ground);

    const endingPath = 68;
    delay();
    ground = generateGround(endingPath, checkingScene);
    console.clear();

    for (let currentScene = checkingScene + 1; currentScene < 9; currentScene++) {
      printRulesAndGround(ground);
      delay();
      ground = generateGround(endingPath, currentScene);
      console.clear();
    }
    return ground;
  }

  for (let index = checkingPosition; index > 6; index -= 5) {
    printRulesAndGround(ground);
    delay();
    ground = generateGround(index, checkingScene);
    console.clear();
  }

  printRulesAndGround(ground);
  delay();
  ground = generateGround(3, checkingScene);
  canIncludeAnimals = false;
  console.clear()

  for (let currentScene = 13; currentScene < 16; currentScene++) {
    printRulesAndGround(ground);
    delay();
    ground = generateGround(3, currentScene);
    console.clear();
  }
  return ground;
}

function levelSelection() {
  while (true) {
    console.clear();
    console.log('1. Easy Level \n2. Medium Level \n3. Hard Level')
    const level = parseInt(prompt('\nPlease select a level :'));
    if (level > 0 && level < 4) {
      return level;
    }
    console.log('\n  please select a level within given range.\n');
    delay(20);
  }
}

function handleDeath(isLeftSide = true) {
  delay(15);
  console.log('\nSelect combination wisely.');
  delay(30);
  leftSide_animals = isLeftSide ? backup_leftSide_animals : leftSide_animals;
  rightSide_animals = isLeftSide ? rightSide_animals : backup_rightSide_animals;
  backup_leftSide_animals = isLeftSide ? '' : backup_leftSide_animals;
  backup_rightSide_animals = isLeftSide ? backup_rightSide_animals : '';
  user_choices = '';
  canIncludeAnimals = false;
  let ground = '';
  if (!isLeftSide) {
    ground = generateGround(66, 9);
    ground = getChoices(rightSide_animals, ground, false);
  }
  deathMsg = '';
  console.clear();
  return ground;
}

function won(ground) {
  for (let i = 0; i < 16; i++) {
    printRulesAndGround(ground);
    console.log(`\n${pad(134, 45, turnYellow('congratualtions') + '..' + '🥳'.repeat(i % 4))}`);
    console.log(`\n${pad(134, 55, '....' + turnGreen('Youuu '))}\n${pad(154, 55, '     ....' + turnGreen('Woooooonnn'))}`);
    delay(5);
    console.clear();
  }

  if (confirm('Do you want to play again?')) {
    leftSide_animals = '';
    backup_leftSide_animals = ''
    rightSide_animals = ''
    backup_rightSide_animals = ''
    startGame();
  }

  console.log(`\n${pad(154, 55, turnMagenta('Have a nice day😊😊'))}`)
}

function startGame() {
  const level = levelSelection();
  const animalSet = randomStrip(level);
  leftSide_animals = animalSet;

  while (true) {
    let ground = generateGround();
    ground = getChoices(leftSide_animals, ground);
    ground = crossRiver(ground);
    if (deathMsg) {
      handleDeath();
      continue;
    }

    if (leftSide_animals.trim() === '') {
      won(ground);
      return;
    }

    ground = getChoices(rightSide_animals, ground, false);
    ground = crossRiver(ground, 'r-l', 61, 56);
    while (deathMsg) {
      ground = handleDeath(false);
      if (canContinue('right')) {
        ground = crossRiver(ground, 'r-l', 61, 56);
        continue;
      }
    }
    printRulesAndGround(ground);
  }
}

startGame();

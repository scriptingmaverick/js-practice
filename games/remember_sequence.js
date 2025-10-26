const MAX_CHARS_IN_CMD_LINE = 132;
const alphabets = 'abcdefghijklmnopqrstuvwxyz';
const wishes = [
  'Good guess😊', 'Woohh🥳 great', 'Keep it up😎', 'hoorayy 🥳🥳'
]

const colors = ['red', 'green', 'blue', 'yellow', 'cyan', 'magenta']

let letters_array = [];
let points = 0;

function randomChoice(length = 26) {
  return Math.floor(Math.random() * length);
}

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
    '-> You must remember the letters and enter them in the same order as they are.',
    '-> You can enter letters as follows : ' + turnYellow('a,f,e') + ' or ' + turnYellow('afe'),
    '-> Sequence is not ' + turnRed('case-sensitive') + ' so, You can enter in any case',
    `-> For each correct guess you'll score 5 points.`
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

function delay(x = 1) {
  for (let i = 0; i < 100000000 * x; i++);
}

function changeColor(color, text) {
  switch (color) {
    case 'red':
      return turnRed(text);
    case 'blue':
      return turnBlue(text);
    case 'green':
      return turnGreen(text);
    case 'yellow':
      return turnYellow(text);
    case 'cyan':
      return turnCyan(text);
    default:
      return turnMagenta(text);
  }
}

function showLetters() {
  const newArr = [];
  const color = colors[randomChoice(6)];
  for (let elem = 0; elem < letters_array.length; elem++) {
    newArr.push(changeColor(color, letters_array[elem].toUpperCase()));
  }
  return newArr.join(' -> ')
}

function lose() {
  console.log('\n ☠️ Oh, sorry you lost.🤧');
  delay(15);
  if (points > 20) {
    console.log('\n But dont worry😊, we have a plan 🤡');
    delay(15);
    console.log('\n If you give off 20 points this round will be conducted again.\n')
    delay(15);
    if (confirm(' Do you give off 20 points :')) {
      points -= 20;
      return false;
    }
    delay(15);
  }
  console.log('\n Hope you enjoyed the game.');
  console.log('\n Have a nice day😊.');
  delay(20);
  return true;
}

function addNewLetterInSequence() {
  letters_array.push(alphabets[randomChoice()]);
}

function startGame() {
  addNewLetterInSequence()
  let canPlay = true;
  console.clear();
  while (canPlay) {
    console.log(' Sequence is : ', showLetters());
    delay(25);
    console.clear();
    printRules();
    console.log(' Your score is : ', points);
    const userChoice = prompt('\n Enter sequence : ').replaceAll(',', '');
    delay(10);
    if (userChoice.toLowerCase() === letters_array.join('')) {
      console.log('\n Correct 👍');
      delay(15);
      console.log('\n ' + wishes[randomChoice(4)])
      delay(25);
      addNewLetterInSequence();
      points += 5;
      console.clear();
      continue;
    }
    if (lose()) {
      canPlay = false;
    }
    console.clear();
  }
}

startGame();

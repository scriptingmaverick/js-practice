const MAX_RIVER_PATH = 65;
const EMOJI1 = '🐺';
const EMOJI2 = '🐑';
const EMOJI3 = '🌳';

function delay(x = 2) {
  for (let i = 0; i < 500000000 * x; i++);
}

function pad(length, end, text = '') {
  return text.padStart(end + text.length).padEnd(length);
}

function generateSequence(length, char = ' ', begin = '', end = '') {
  return begin + char.repeat(length - begin.length - end.length) + end;
}

function leftSidePart(animals = '🐺🐑🌳') {
  const leftSide = [animals];
  return leftSide;
}

function rightSidePart(animals = '') {
  const rightSide = [animals];
  return rightSide;
}

// function createTransportingScene(choices, boat) {
//   delay(1);
// }

function getBoat(boatPosition, choices = '__') {
  let firstPart = `_____${choices}___👨‍🦯___`;
  const secondPart = `\\___${generateSequence(choices.length * 2, '_')}______/`;
  let excessive = '  ';

  if (choices !== '__') {
    firstPart = `___${choices}___👨‍🦯___`;
    excessive = '';
  }

  const boat = [
    firstPart,
    secondPart];

  // for (let index = 0; index < boat.length; index++) {
  boat[0] = `${pad(78 + choices.length, boatPosition, boat[0])}${excessive}`;
  boat[1] = `${pad(78 + choices.length, boatPosition, boat[1])}`;
  // }
  return boat;
}

function getLine3Elem1(leftSide) {
  return pad(25, 24 - leftSide.length, leftSide);
}

function changeToEmojis(array) {
  let emojis = '';
  for (let index = 0; index < array.length; index++) {
    switch (array[index]) {
      case '1':
        emojis += EMOJI1;
        break;
      case '2':
        emojis += EMOJI2;
        break;
      case '3':
        emojis += EMOJI3;
        break;
      default:
        emojis += '_';
        break;
    }
  }
  return emojis;
}

function checkAndReplace(array, emojis) {
  // console.log('in chkAndReplace : ', array, emojis);
  let replacedArray = array;
  for (let emojiIndex = 0; emojiIndex < emojis.length; emojiIndex++) {
    // console.log('before replacing : ',replacedArray)
    replacedArray = replacedArray.replace(emojis[emojiIndex], '');
    // console.log('after replacing : ',replacedArray)
  }
  return changeToEmojis(replacedArray);
}

function getline2And3(leftSide, rightSide, boatPosition, emojis, scene = 0) {
  let boat = getBoat(boatPosition, changeToEmojis(emojis));
  // console.log(boat.join('\n'))
  // console.log(changeToEmojis(leftSide), changeToEmojis(rightSide), boatPosition, changeToEmojis(emojis), scene);
  const excessive = boatPosition < 60 ? ' ' : '';
  const line2 = [generateSequence(25), generateSequence(40), generateSequence(25)];
  const line3 = [getLine3Elem1(changeToEmojis(leftSide)), boat[0] + excessive, pad(25, 3, changeToEmojis(rightSide))];
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
      line2[0] = generateSequence(25 - emojis.length) + changeToEmojis(emojis);
      break;
    case 3:
      line2[1] = generateSequence(6 - emojis.length) + changeToEmojis(emojis) + generateSequence(40 - 6 - emojis.length);
      break;
    case 4:
      boat = getBoat(boatPosition, changeToEmojis(emojis));
      line3[1] = boat[0];
      break;
    case 5:
      const firstPart = 40 - boat[0].length + 4;
      line2[1] = generateSequence(firstPart) + changeToEmojis(emojis) + generateSequence(40 - firstPart - emojis.length);
      break;
    case 6:
      line2[2] = changeToEmojis(emojis) + generateSequence(25 - emojis.length);
      break;
    case 7:
      rightSide += changeToEmojis(emojis);
      line3[2] = pad(25, 1, changeToEmojis(rightSide));
      break;
  }
  leftSide = checkAndReplace(leftSide, emojis);
  // console.log('after replace : ',leftSide)
  line3[0] = getLine3Elem1(leftSide);

  // console.log('')
  return [line2, line3, leftSide];
}
// console.clear();
// console.log(getline2And3('123', '23', 3, '12', 1).join('\n'))
// delay()
// console.log(getline2And3('123', '23', 3, '12', 2).join('\n'))
// delay()
// console.log(getline2And3('123', '23', 3, '12', 3).join('\n'))

function generateGround(leftSide, rightSide, boatPosition = 3, choices = '__', scene = 0) {
  const boat = getBoat(boatPosition);
  const waterGround = generateSequence(40, '☵');
  const lines = getline2And3(leftSide, rightSide, boatPosition, choices, scene);
  const line2 = lines[0];
  const line3 = lines[1];
  const ground = [
    [generateSequence(25), generateSequence(40), generateSequence(25)],
    [line2[0], line2[1], line2[2]],
    [line3[0], line3[1], line3[2]],
    [generateSequence(25, '-'), boat[1], generateSequence(25, '-')],
    [generateSequence(26, ' ', '', '|'), generateSequence(39, '🌊'), generateSequence(25, ' ', '|')],
    [generateSequence(26, ' ', '', '|'), generateSequence(39, '🌊'), generateSequence(25, ' ', '|')],
    [generateSequence(26, ' ', '', '|'), waterGround, generateSequence(25, ' ', '|')],
    [generateSequence(26, ' ', '', '|'), waterGround, generateSequence(25, ' ', '|')],
    [generateSequence(26, ' ', '', '|'), waterGround, generateSequence(25, ' ', '|')]
  ]
  const newGround = [];
  for (let index = 0; index < ground.length; index++) {
    newGround[index] = ground[index].join('');
  }
  return [newGround.join('\n'), lines[2]];
}

function generateScene(leftSide, rightSide, choices = '__') {
  let vars = generateGround(leftSide, rightSide, 3, choices, 1);
  let ground = vars[0];
  if (choices !== '__') {
    for (let i = 2; i <= 4; i++) {
      console.log(ground);
      delay();
      vars = generateGround(leftSide, rightSide, 3, choices, i);
      ground = vars[0];
      console.clear();
    }
    console.log(ground);
    leftSide = vars[1];
    console.log(leftSide)
  }

  console.clear();
  for (let index = 8; index < MAX_RIVER_PATH; index += 5) {
    console.log(ground);
    delay();
    vars = generateGround(leftSide, rightSide, index, choices);
    ground = vars[0];
    console.clear();
  }
  console.log(ground);
  leftSide = vars[1];

  console.log(leftSide);
}

// console.log(generateGround('123', '12'));
// generateScene('123', '12');
console.clear()
generateScene('123', '12', '23');

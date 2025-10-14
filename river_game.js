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

function generateSequence(length, begin = ' ', char = ' ', end = '') {
  const charsLength = char.length + begin.length;
  return begin + char.repeat(Math.abs(length - charsLength)) + end;
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
  const boat = [`_____${choices}___👨‍🦯____`,
     ` \\___${generateSequence(choices.length, '_', '_')}________/`];
  for (let index = 0; index < boat.length; index++) {
    boat[index] = pad(77 + choices.length + 1, boatPosition, boat[index]);
  }

  return boat;
}

function getLine3Elem1(leftSide) {
  return pad(26, 25 - leftSide.length, leftSide);
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
        emojis += '';
        break;
    }
  }
  return emojis;
}

function checkAndReplace(leftSide, emojis) {
  console.log('in chkAndReplace : ', leftSide, emojis);
  let replacedArray = leftSide;
  for (let emojiIndex = 0; emojiIndex < emojis.length; emojiIndex++) {
    for (let index = 0; index < leftSide.length; index++) {
      console.log(leftSide[index],emojis[emojiIndex])
      if (emojis[emojiIndex] === leftSide[index]) {
        replacedArray = replacedArray.replace(leftSide[index],'');
        break;
      }
    }
  }
  return changeToEmojis(leftSide);
}

function getline2And3(leftSide, rightSide, boatPosition, emojis, scene = 0) {
  let boat = getBoat(boatPosition, changeToEmojis(emojis));
  console.log(changeToEmojis(leftSide), changeToEmojis(rightSide), boatPosition, changeToEmojis(emojis), scene)
  const line2 = [generateSequence(25), generateSequence(40), generateSequence(25)];
  const line3 = [getLine3Elem1(changeToEmojis(leftSide)), boat[0], `|${pad(25, 1, changeToEmojis(rightSide))}|`];
  if (scene === 0) {
    return [line2, line3];
  }

  switch (scene) {
    case 1:
      line2[0] = generateSequence(25 - emojis.length) + emojis;
      break;
    case 2:
      line2[1] = generateSequence(6 - emojis.length) + emojis + generateSequence(40 - 6 - emojis.length);
      break;
    case 3:
      boat = getBoat(boatPosition, emojis);
      line3[1] = boat[0];
      break;
    case 4:
      const firstPart = 40 - boat[0].length + 4;
      line2[1] = generateSequence(firstPart) + emojis + generateSequence(40 - firstPart - emojis.length);
      break;
    case 5:
      line2[2] = emojis + generateSequence(25 - emojis.length);
      break;
    case 6:
      rightSide += emojis;
      line3[2] = pad(26, 4, changeToEmojis(rightSide));
      break;
  }

  leftSide = checkAndReplace(leftSide, emojis);
  line3[0] = getLine3Elem1(leftSide);
  return [line2, line3];
}

function generateGround(leftSide, rightSide, boatPosition = 3, choices = '__', scene = 0) {
  const boat = getBoat(boatPosition, choices);
  const water = generateSequence(40, '', '☵', '');
  const lines = getline2And3(leftSide, rightSide, boatPosition, choices, scene);
  const line2 = lines[0];
  const line3 = lines[1];

  const ground = [
    [generateSequence(25), generateSequence(40), generateSequence(25)],
    [line2[0], line2[1], line2[2]],
    [line3[0], line3[1], line3[2]],
    [generateSequence(26, '-', '-'), boat[1], generateSequence(25, '-', '-', '-')],
    [generateSequence(26, ' ', ' ', '|'), generateSequence(41, '', '🌊', ''), generateSequence(25, '|')],
    [generateSequence(26, ' ', ' ', '|'), generateSequence(41, '', '🌊', ''), generateSequence(25, '|')],
    [generateSequence(26, ' ', ' ', '|'), water, generateSequence(25, '|')],
    [generateSequence(26, ' ', ' ', '|'), water, generateSequence(25, '|')],
    [generateSequence(26, ' ', ' ', '|'), water, generateSequence(25, '|')],
  ]
  const newGround = [];
  for (let index = 0; index < ground.length; index++) {
    newGround[index] = ground[index].join('');
  }
  return newGround.join('\n');
}

function generateScene(leftSide, rightSide, choices = '__') {
  // if (choices !== '__') {
  //   let ground = generateGround(leftSide, rightSide, 3, choices, 1);
  //   for (let i = 2; i <= 3; i++) {
  //     console.log(ground);
  //     delay();
  //     ground = generateGround(leftSide, rightSide, 3, choices, i);
  //     console.clear();
  //   }
  // }

  // console.log(generateGround(leftSide, rightSide, 50));

  let newG = generateGround('123', '12');
  console.clear();
  for (let index = 8; index < MAX_RIVER_PATH; index += 5) {
    console.log(newG);
    delay();
    newG = generateGround('123', '12',index);
    console.clear();
  }
  console.log(newG);
}

// console.clear();
// console.log(getline2And3('🐺🐑🌳', '🐺🐑',3,'🐺🐑',1).join('\n'))
// console.log(generateGround('123', '12',63));
generateScene('123', '12');
// generateScene('123', '12', '23');

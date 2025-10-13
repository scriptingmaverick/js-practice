const MAX_RIVER_PATH = 60;

function delay(x = 2) {
  for (let i = 0; i < 500000000 * x; i++) {
  }
}

function pad(length, end, text = '') {
  return text.padStart(end + text.length).padEnd(length);
}

function generateSequence(length, begin = ' ', char = ' ', end = '') {
  const charsLength = char.length + begin.length ;
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

function createTransportingScene(choices, boat) {
  delay(1);

}

function getBoat(boatPosition, choices = '__') {
  const boat = [`____${choices}__👨‍🦯____`, ` \\___${generateSequence(choices.length, '_', '_',)}________/`];
  createTransportingScene(choices, boat);
  for (let index = 0; index < boat.length; index++) {
    boat[index] = pad(77, boatPosition, boat[index]);
  }

  return boat;
}

function getLine3Elem1(leftSide) {
  return pad(26, 25 - leftSide.length, leftSide);
}


function getline2And3(leftSide, rightSide, boatPosition, emojis, scene = 0) {
  let boat = getBoat(boatPosition, emojis);
  console.log(leftSide,rightSide,boatPosition,emojis,scene)
  const line2 = [generateSequence(25), generateSequence(40), generateSequence(25)];
  const line3 = [getLine3Elem1(leftSide), boat[0], pad(25, 1, rightSide)];
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
      line3[2] = pad(25, 1, rightSide);
      break;
  }

  for (let index = 0; index < emojis.length; index++) {
    leftSide = leftSide.replace(emojis[index], '');
  }

  line3[0] = getLine3Elem1(leftSide);


  return [line2, line3];
}

function generateGround(leftSide, rightSide, boatPosition = 3, choices = '__', scene = 0) {
  const boat = getBoat(boatPosition, choices);
  const water = generateSequence(40, ' ', '☵ ', ' ');
  const lines = getline2And3(leftSide, rightSide, boatPosition, choices, scene);
  const line2 = lines[0];
  const line3 = lines[1];

  const ground = [
    [generateSequence(25), generateSequence(40), generateSequence(25)],
    [line2[0], line2[1], line2[2]],
    [line3[0], line3[1], line3[3]],
    [generateSequence(26, '-', '-'), boat[1], generateSequence(25, '-', '-', '-')],
    [generateSequence(26, ' ', ' ', '|'), generateSequence(40, '', '🌊',''), generateSequence(25, '|')],
    [generateSequence(26, ' ', ' ', '|'), generateSequence(40, '', '🌊',''), generateSequence(25, '|')],
    [generateSequence(26, ' ', ' ', '|'), water, generateSequence(25, '|')],
    [generateSequence(26, ' ', ' ', '|'), water, generateSequence(25, '|')],
    [generateSequence(26, ' ', ' ', '|'), water, generateSequence(25, '|')],
    [generateSequence(26, ' ', ' ', '|'), water, generateSequence(25, '|')],
    [generateSequence(26, ' ', ' ', '|'), water, generateSequence(25, '|')],
  ]
  const newGround = [];
  for (let index = 0; index < ground.length; index++) {
    newGround[index] = ground[index].join('');
  }
  console.log(newGround.join('\n'))
}

function generateScene(leftSide, rightSide, choices = '__') {
  if (choices !== '__') {
    for (let i = 1; i <= 3; i++) {
      delay();
      console.clear();
      generateGround(leftSide, rightSide, 3, choices, i);
    }
  }

  // generateGround(leftSide, 3, rightSide)
  // for (let index = 3; index < MAX_RIVER_PATH; index += 5) {
  //   delay();
  //   console.clear();
  //   generateGround('🐺🐑🌳', index, '🐺🐑');
  // }
}

// console.log('hiii');

// generateGround('🐺🐑🌳', '🐺🐑',3);
// generateScene('🐺🐑🌳', '🐺🐑',3);
// generateScene('🐺🐑🌳', '🐺🐑',3,'🐑🌳');

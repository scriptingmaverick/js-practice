const MAX_RIVER_PATH = 60;

function delay(x=2) {
  for (let i = 0; i < 500000000 * x; i++) {
  }
}

function pad(length, start, string) {
  return string.padStart(start + string.length).padEnd(length);
}

function generateSequence(length, begin = ' ', char = ' ', end = ' ') {
  const charsLength = char.length + begin.length + end.length;
  return begin + char.repeat(length - charsLength) + end;
}

function leftSidePart(animals = '🐺🐑🌳') {
  const leftSide = [animals];
  return leftSide;
}

function rightSidePart(animals = '') {
  const rightSide = [animals];
  return leftSide;
}

function createTransportingScene(choices,boat){
  delay(1);
  
}

function getBoat(boatPosition,choices){
  const boat = [`________👨‍🦯_____`, " \\_____________/"];
  createTransportingScene(choices,boat);
  for (let index = 0; index < boat.length; index++) {
    boat[index] = pad(77, boatPosition, boat[index]);
  }

  return boat;
}

function generateGround(leftSide, boatPosition = 3,choices='',canEdit, rightSide) {
  const boat = getBoat(boatPosition);
  const water = generateSequence(40, ' ', '☵', ' ');
  if(!canEdit){
    const ground = [
      [generateSequence(25), generateSequence(40), generateSequence(25)],
      [generateSequence(25), generateSequence(40), generateSequence(25)],
      [pad(26, 25 - leftSide.length, leftSide), boat[0], pad(25, 1, rightSide)],
      [generateSequence(26, '-', '-'), boat[1], generateSequence(25, '-', '-', '-')],
      [generateSequence(26, ' ', ' ', '|'), generateSequence(42,'🌊','🌊','🌊'), generateSequence(25, '|')],
      [generateSequence(26, ' ', ' ', '|'), water, generateSequence(25, '|')],
      [generateSequence(26, ' ', ' ', '|'), water, generateSequence(25, '|')],
      [generateSequence(26, ' ', ' ', '|'), water, generateSequence(25, '|')],
      [generateSequence(26, ' ', ' ', '|'), water, generateSequence(25, '|')],
      [generateSequence(26, ' ', ' ', '|'), water, generateSequence(25, '|')],
      [generateSequence(26, ' ', ' ', '|'), water, generateSequence(25, '|')],
    ]
    const newGround = [];
    for (let index = 0; index < 1; index++) {
      for (let innerIndex = 0; innerIndex < 2; innerIndex++) {
        newGround[index] = ground[index].join('');
      }
    }
    console.log(newGround.join('\n'))
  }
  
}

function generateScene(){
  for (let index = 3; index < MAX_RIVER_PATH; index += 5) {
    delay();
    console.clear();
    generateGround('🐺', index,[2,3], '🐺🐑');
  }
}

const LENGTHOFSCREEN = 90;

const padOnXAxis = (array) =>
  array.map((line) => {
    line.text = line.text.padEnd(LENGTHOFSCREEN + line.text.length);
    return line;
  });

const padOnYAxis = (array, reference) =>
  array.map((line) => {
    line.text = line.text.padEnd(line.text.length + reference.length);
    return line;
  });

const toRight = (text) => text.unshift(text.pop());
const toLeft = (text) => text.push(text.shift());

const changeOnXAxis = (direction) => (text) => {
  const splitted = text.split("");
  if (direction === "left") {
    toLeft(splitted);
  } else {
    toRight(splitted);
  }

  return splitted.join("");
};

const changeOnYAxix = (direction) => (line, ground) => {
  const splitted = line.text.split("");
  if (direction === "down") {
    toRight(splitted);
  } else {
    toLeft(splitted);
  }

  let i = 0;
  while (i < ground.length) {
    if (i === line.glitchPos) {
      const glitchLength = 3;
      for (let j = 0; j < glitchLength; j++) {
        const text = ground[i + j].split("");
        text[line.position + 1] = splitted[i + j];
        text[line.position] = " ";
        ground[i + j] = text.join("");
      }
      i += 3;
      continue;
    }

    const originalText = ground[i].split("");
    originalText[line.position] = splitted[i];
    ground[i++] = originalText.join("");
  }

  return splitted.join("");
};

const xAxisData = [
  {
    text: " ",
    operation: changeOnXAxis("right"),
  },
  { text: " ", operation: changeOnXAxis("left") },
  {
    text: "What are you upto ?",
    operation: changeOnXAxis("left"),
    glitchPos: 20,
  },
  { text: " ", operation: changeOnXAxis("left") },
  {
    text: " ",
    operation: changeOnXAxis("right"),
  },
  {
    text: "Are you seeing anything ?",
    operation: changeOnXAxis("right"),
    glitchPos: 60,
  },
  {
    text: " ",
    operation: changeOnXAxis("right"),
  },
  { text: " ", operation: changeOnXAxis("left") },
  {
    text: "What are you upto ?",
    operation: changeOnXAxis("left"),
    glitchPos: 40,
  },
  {
    text: " ",
    operation: changeOnXAxis("right"),
  },
  { text: " ", operation: changeOnXAxis("left") },
  {
    text: "What are you upto ?",
    operation: changeOnXAxis("right"),
    glitchPos: 20,
  },
  { text: " ", operation: changeOnXAxis("left") },
  {
    text: " ",
    operation: changeOnXAxis("right"),
  },
  {
    text: "Are you seeing anything ?",
    operation: changeOnXAxis("left"),
    glitchPos: 70,
  },
  {
    text: " ",
    operation: changeOnXAxis("right"),
  },
  { text: " ", operation: changeOnXAxis("left") },
  {
    text: "What are you upto ?",
    operation: changeOnXAxis("right"),
    glitchPos: 40,
  },
];

const yAxisData = [
  { text: "god", operation: changeOnYAxix("up"), position: 5, glitchPos: 6 },
  { text: "of", operation: changeOnYAxix("up"), position: 20, glitchPos: 0 },
  {
    text: "mischeif",
    operation: changeOnYAxix("up"),
    position: 35,
    glitchPos: 4,
  },
  {
    text: "loki",
    operation: changeOnYAxix("down"),
    position: 50,
    glitchPos: 6,
  },
  {
    text: "god of",
    operation: changeOnYAxix("up"),
    position: 65,
    glitchPos: 0,
  },
  {
    text: "multiverse",
    operation: changeOnYAxix("down"),
    position: 80,
    glitchPos: 6,
  },
];

const printGround = (ground) => {
  for (const text of ground) {
    console.log(text);
  }
};

const addGlitchOnXAxis = (screen, position) => {
  const glitchLength = 5;
  const firstLine = screen.at(-2).split("");
  const lastLine = screen.at(-1).split("");
  const text = lastLine.slice(position, position + glitchLength);
  for (let i = 0; i < glitchLength; i++) {
    firstLine[position + i] = text[i];
    lastLine[position + i] = " ";
  }
  screen[screen.length - 2] = firstLine.join("");
  screen[screen.length - 1] = lastLine.join("");
};

const clearGround = () => console.clear();
const ground = padOnXAxis(xAxisData);
const paddedYAxis = padOnYAxis(yAxisData, ground);
 setInterval(() => {
  const screen = [];
  let lineNum = 1;
  for (const line of ground) {
    line.text = line.operation(line.text);
    screen.push(line.text);
    if (lineNum % 3 === 0 && lineNum > 1) {
      addGlitchOnXAxis(screen, line.glitchPos);
    }
    lineNum++;
  }

  for (const line of paddedYAxis) {
    line.text = line.operation(line, screen);
  }

  const mirrorScreen = [];
  for (const line of screen) {
    mirrorScreen.push(
      line.slice(0, 93) +
        " " +
        line.slice(0, 93).split("").toReversed().join("")
    );
  }

  const quadScreen = mirrorScreen.toReversed();

  clearGround();
  printGround(mirrorScreen.concat(" ", " ", " ", " ", quadScreen));
}, 100);

const compass = {
  N: { R: "E", L: "W", offset: [0, 1] },
  E: { R: "S", L: "N", offset: [1, 0] },
  S: { R: "W", L: "E", offset: [0, -1] },
  W: { R: "N", L: "S", offset: [-1, 0] },
};

const headRover = (rover) => ({
  L: () => (rover.direction = compass[rover.direction]["L"]),
  R: () => (rover.direction = compass[rover.direction]["R"]),
  M: () => {
    const offset = compass[rover.direction]["offset"];
    rover.position.x += offset[0];
    rover.position.y += offset[1];
  },
});

const parsePosition = (stateOfRover) => {
  const [x, y, direction] = stateOfRover.split(" ");
  return {
    position: { x: parseInt(x), y: parseInt(y) },
    direction,
  };
};

const executeInstructions = (initialPosition, instructions) => {
  const rover = parsePosition(initialPosition);
  let i = 0;
  while (i < instructions.length) {
    headRover(rover)[instructions[i++]]();
  }
  return rover;
};

console.log(executeInstructions("0 0 E", "LMRMMMR"));

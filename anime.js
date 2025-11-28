const LENGTHOFSCREEN = 90;

const pad = (array) =>
  array.map((line) => {
    if (line.direction === "top" || line.direction === "down") {
      line.text = line.text.padEnd(line.text.length * 2);
    } else {
      line.text = line.text.padEnd(
        LENGTHOFSCREEN + line.text.length,
      );
    }

    return line;
  });

const toRight = (text) => text.unshift(text.pop());
const toLeft = (text) => text.push(text.shift());

const changeText = (direction) => (line, array = []) => {
  let splitted = line.text.split("");
  switch (direction) {
    case "left":
      splitted = toLeft(splitted);
      break;
    case "right":
      splitted = toRight(splitted);
      break;
    case "down": {
      splitted = toRight(splitted);
      for (let i = 0; i < array.length; i++) {
        array[i].text.split("")[line.position] = splitted[i];
      }
    }
  }

  return splitted.join("");
};

const clearGround = () => console.clear();
const data = [
  {
    text: " ",
    operation: changeText("right"),
    direction: "right",
    position: 0,
  },  
  { text: " ", operation: changeText("left"), direction: "left", position: 0 },
  {
    text: "What are you upto ?",
    operation: changeText("left"),
    direction: "left",
    position: 0,
  },
  { text: " ", operation: changeText("left"), direction: "left", position: 0 },
  {
    text: " ",
    operation: changeText("right"),
    direction: "right",
    position: 0,
  },
  {
    text: "Are you seeing anything ?",
    operation: changeText("right"),
    direction: "right",
    position: 0,
  },
  {
    text: "hello",
    operation: changeText("top"),
    direction: "top",
    position: 54,
  },
  { text: " ", operation: changeText("left"), direction: "left", position: 0 },
];

const ground = pad(data);
// console.log(ground);
setInterval(() => {
  clearGround();
  for (const line of ground) {
    line.text = line.operation(line, ground);
  }

  for (const line of ground) {
    console.log(line.text.slice(0, 95));
  }
}, 50);

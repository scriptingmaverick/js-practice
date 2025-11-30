const pad = (line) =>
  (line.text = line.text.padEnd(60 + line.text.length)) && line;
const data = [
  { text: "hello", direction: "left" },
  { text: "", direction: "right" },
  { text: "byeeee", direction: "right" },
  { text: "", direction: "left" },
];

const changeText = (line, ground) => {
  const splittedText = line.text.split("");
  if (line.direction === "left") {
    splittedText.unshift(splittedText.pop());
  } else {
    splittedText.push(splittedText.shift());
  }
  return splittedText.join("");
};

const ground = data.map(pad);
setInterval(() => {
  const screen = [];
  for (let i = 0; i < ground.length; i++) {
    ground[i].text = changeText(ground[i], ground);
    screen.push(ground[i].text);
  }
  console.clear();
  screen.map((line) => console.log(line.slice(0, 60)));
}, 100);

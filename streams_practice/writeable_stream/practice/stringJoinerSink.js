const strings = [];

const stream = new WritableStream({
  write(data) {
    strings.push(data.toUpperCase());
  },

  close() {
    console.log("Result :", strings.join(""));
  },
});

const writer = stream.getWriter();

while (true) {
  const str = prompt("Enter a string [`stop` to close writer] :");
  if (str === "stop") {
    writer.close();
    break;
  }
  
  writer.write(str);
}

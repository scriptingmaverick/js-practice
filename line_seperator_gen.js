function* generateEachLine(text) {
  let i = 0;
  let data = text.slice(i);
  let newLineIndex = data.indexOf("\n");
  while (newLineIndex !== -1) {
    data = text.slice(i);
    newLineIndex = data.indexOf("\n");
    const line = text.slice(i, i + newLineIndex);
    yield line;
    i += newLineIndex + 1;
  }
  yield data;
}

const lines = generateEachLine("this\nis\nfor\ntesting.");
console.log([...lines]);

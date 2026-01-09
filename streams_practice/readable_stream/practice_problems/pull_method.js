const createBufferedStream = (data) => {
  const stream = new ReadableStream({
    pull(controller) {
      if (data.length > 0) {
        controller.enqueue(data.shift());
      } else {
        controller.close();
      }
    },
  });

  return stream;
};

const main = async () => {
  const data = ["mango", "apple", "banana"];
  const stream = createBufferedStream(data);
  const reader = stream.getReader();
  let result = await reader.read();
  while (!result.done && confirm()) {
    console.log(result.value);
    result = await reader.read();
  }
};

main();

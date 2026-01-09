const streamFromArray = (array) => {
  const stream = new ReadableStream({
    start(controller) {
      for (const element of array) {
        controller.enqueue(element);
      }
      controller.close();
    },
  });

  return stream;
};

const stream = streamFromArray("hello\nhii\nbyee".split('\n')).getReader();

// const chunk = await stream.read()
// console.log(chunk)
for await (const chunk of stream) {
  console.log(chunk.read());
}

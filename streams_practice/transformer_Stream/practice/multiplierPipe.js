const multiplier = new TransformStream({
  transform(chunk, controller) {
    const result = chunk.map((x) => x * 10);
    controller.enqueue(result);
  },
});

const readable = new ReadableStream({
  async pull(controller) {
    console.log("--- New Batch --- \n");
    console.log(
      'enter array values line by line ["" to process this batch , "exit" to stop]',
    );
    const arr = [];
    while (true) {
      const data = prompt("enter value :");
      if (data === "exit") {
        controller.close();
        break;
      }
      if (data === "") {
        controller.enqueue(arr);
        break;
      }
      arr.push(data);
    }
  },
});

await readable.pipeThrough(multiplier)
  .pipeTo(
    new WritableStream({
      async write(chunk) {
        console.log("Transformed array", chunk);
      },
    }),
  );

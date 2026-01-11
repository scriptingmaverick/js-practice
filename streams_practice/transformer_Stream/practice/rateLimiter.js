const limitRateOfDataExchange = new TransformStream({
  async transform(chunk, controller) {
    await new Promise((res) => setTimeout(res, 1000));

    controller.enqueue(chunk + "\n");
  },
});

const array = ["mango", "apple", "banana", "pineapple", "papaya"];

const readable = new ReadableStream({
  async pull(controller) {
    if (array.length > 0) {
      await controller.enqueue(array.shift());
    } else {
      controller.close();
    }
  },
});

await readable
  .pipeThrough(limitRateOfDataExchange)
  .pipeThrough(new TextEncoderStream())
  .pipeTo(Deno.stdout.writable);

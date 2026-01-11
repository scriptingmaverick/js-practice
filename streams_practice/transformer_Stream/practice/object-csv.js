const convert = new TransformStream({
  start(controller) {
    controller.enqueue("Id, Name \n");
  },
  async transform(chunk, controller) {
    const values = Object.values(JSON.parse(chunk));
    await new Promise((res) => setTimeout(res, 500));
    controller.enqueue(values.join(", ") + "\n");
  },
});

const data = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Charlie" },
];

const readable = new ReadableStream({
  pull(controller) {
    if (data.length > 0) {
      const element = JSON.stringify(data.shift());
      // console.log(element);
      controller.enqueue(element);
    } else {
      controller.close();
    }
  },
});

await readable
  .pipeThrough(convert)
  .pipeThrough(new TextEncoderStream())
  .pipeTo(Deno.stdout.writable);

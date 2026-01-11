const opFile = await Deno.open("user.json", { write: true, create: true });
const inpFile = await Deno.open("customers.csv");
const encoder = new TextEncoder();

const convert = new TransformStream({
  start(controller) {
    this.isFirstLine = true;
    controller.enqueue(encoder.encode("[\n"));
  },
  transform(chunk, controller) {
    const lines = new TextDecoder().decode(chunk).split("\n");
    const chunks = lines.splice(1, lines.length);

    while (chunks.length > 0) {
      const [id, name, email] = chunks.shift().split(",");
      const object = JSON.stringify({ id, name, email }) + ",\n";
      controller.enqueue(encoder.encode(object));
    }
  },
  flush(controller) {
    controller.enqueue(encoder.encode("]"));
  },
});

await inpFile.readable.pipeThrough(convert).pipeTo(
  new WritableStream({
    write(chunk) {
      opFile.write(chunk);
    },
  })
);

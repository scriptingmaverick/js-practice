const file = await Deno.open("word_cloud.txt", { write: true, create: true });

const aggreagate = new TransformStream({
  start() {
    this.map = {};
  },

  transform(chunk) {
    chunk = chunk.trim();
    this.map[chunk] = (this.map[chunk] || 0) + 1;
  },

  flush(controller) {
    const data = [];
    for (const key in this.map) {
      const count = this.map[key];

      data.push(`${key} : ${count}`);
    }

    controller.enqueue(data.join(", "));
  },
});

const writable = new WritableStream({
  async write(chunk) {
    await file.write(chunk);
  },
});

await Deno.stdin.readable
  .pipeThrough(new TextDecoderStream())
  .pipeThrough(aggreagate)
  .pipeThrough(new TextEncoderStream())
  .pipeTo(writable);

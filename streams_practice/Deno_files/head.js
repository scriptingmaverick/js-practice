const limit = 5;

const process = new TransformStream({
  start() {
    this.count = 0;
  },
  transform(chunk, controller) {
    this.count++;
    if (this.count < limit) controller.enqueue(chunk);
    else if (this.count === limit) {
      controller.enqueue(chunk);
      Deno.exit(0);
    }
  },
});

const file = await Deno.open("./projects/", { read: true });

await file.readable
  .pipeThrough(chunker)
  .pipeThrough(new TextDecoderStream())
  .pipeThrough(process)
  .pipeThrough(new TextEncoderStream())
  .pipeTo(Deno.stdout.writable);

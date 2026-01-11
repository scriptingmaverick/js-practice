const logger = new TransformStream({
  start() {
    this.buffer = [];
  },

  transform(chunk, controller) {
    this.buffer.push(chunk.trim());
    if (this.buffer.length === 3) {
      controller.enqueue(`[ ${this.buffer.join(', ')} ]\n`);
      this.buffer = [];
    }
  },

  flush(controller) {
    controller.enqueue(`[ ${this.buffer.join(', ')} ]\n`);
  },
});

await Deno.stdin.readable
  .pipeThrough(new TextDecoderStream())
  .pipeThrough(logger)
  .pipeThrough(new TextEncoderStream())
  .pipeTo(Deno.stdout.writable);

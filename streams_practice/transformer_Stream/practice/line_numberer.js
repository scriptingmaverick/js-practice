const putLineNumber = new TransformStream({
  count: 1,
  transform(chunk, controller) {
    controller.enqueue(`${this.count++}: ${chunk}`);
  },
});

await Deno.stdin.readable
  .pipeThrough(new TextDecoderStream())
  .pipeThrough(putLineNumber)
  .pipeThrough(new TextEncoderStream())
  .pipeTo(Deno.stdout.writable);

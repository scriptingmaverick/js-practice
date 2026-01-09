const loudStream = new TransformStream({
  transform(chunk, controller) {
    // 1. Process the data
    const result = chunk.trim().toUpperCase() + "!!!";
    // 2. Push it to the readable side
    controller.enqueue(result);
  },
});

// Using it in a pipe:
// Source -> Decoder -> Transformer -> Console

await Deno.stdin.readable
  .pipeThrough(new TextDecoderStream())
  .pipeThrough(loudStream)
  .pipeTo(
    new WritableStream({
      write(chunk) {
        console.log(chunk);
      },
    }),
  );

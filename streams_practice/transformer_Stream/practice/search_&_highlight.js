const searchTerm = prompt("Give any search-Term :");

const highlighter = new TransformStream({
  transform(chunk, controller) {
    controller.enqueue(chunk.replaceAll(searchTerm, `[${searchTerm}]`));
  },
});

await Deno.stdin.readable
  .pipeThrough(new TextDecoderStream())
  .pipeThrough(highlighter)
  .pipeThrough(new TextEncoderStream())
  .pipeTo(Deno.stdout.writable);

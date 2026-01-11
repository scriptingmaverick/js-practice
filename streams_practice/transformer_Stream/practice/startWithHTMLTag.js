const includeInTags = new TransformStream({
  start() {
    this.html = "<article>\n";
  },

  transform(chunk) {
    this.html += `  <p>${chunk.trim()}</p>\n`;
  },

  flush(controller) {
    this.html += "</article>";
    controller.enqueue(this.html);
  },
});

await Deno.stdin.readable
  .pipeThrough(new TextDecoderStream())
  .pipeThrough(includeInTags)
  .pipeThrough(new TextEncoderStream())
  .pipeTo(Deno.stdout.writable);

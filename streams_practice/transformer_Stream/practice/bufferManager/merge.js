import { WriteStream } from "node:fs";

const file = await Deno.open("data.txt", { create: true, write: true });

const processBuffer = new TransformStream({
  start() {
    this.buffer = "";
  },
  transform(chunk, controller) {
    this.buffer += chunk.trim() + " ";
    if (this.buffer.length >= 20) {
      controller.enqueue(this.buffer + "\n");
      console.log("buffer written");
      this.buffer = "";
      return;
    }

    console.log("stored buffer");
  },

  flush(controller) {
    controller.enqueue(this.buffer + "\n");
  },
});

const writable = new WritableStream({
  async write(chunk) {
    await file.write(chunk);
  },
});

await Deno.stdin.readable
  .pipeThrough(new TextDecoderStream())
  .pipeThrough(processBuffer)
  .pipeThrough(new TextEncoderStream())
  .pipeTo(writable);

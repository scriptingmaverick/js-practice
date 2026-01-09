const countWords = new TransformStream({
  totalCount: 0,
  transform(chunk, controller) {
    // console.log(chunk);
    if (chunk === "exit\n") {
      this.flush(controller);
    }

    const count = chunk.split(" ").length;
    this.totalCount += count;

    controller.enqueue({ type: "batch", count });
  },
  flush(controller) {
    controller.enqueue({ type: "end", count: this.totalCount });
    controller.close();
  },
});

await Deno.stdin.readable.pipeThrough(new TextDecoderStream()).pipeThrough(
  countWords,
).pipeTo(
  new WritableStream({
    async write(chunk) {
      if (chunk.type === "batch") {
        console.log("this batch length is :", chunk.count);
      } else {
        console.log("overall count of words is", chunk.count);
      }
    },
  }),
);

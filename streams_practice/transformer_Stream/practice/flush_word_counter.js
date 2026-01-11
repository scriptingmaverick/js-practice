const countWords = new TransformStream({
  totalCount: 0,
  
  transform(chunk, controller) {
    const text = chunk.trim();
    
    if (text === "exit") {
      // 1. Manually trigger the "Final Report" logic before killing the stream
      controller.enqueue({ type: "end", count: this.totalCount });
      // 2. Kill the stream
      controller.terminate();
      return;
    }

    const count = text.split(/\s+/).filter((x) => x !== "").length;
    this.totalCount += count;
    controller.enqueue({ type: "batch", count });
  },

  flush(controller) {
    // This will now only run if you press Ctrl+D (EOF)
    controller.enqueue({ type: "end", count: this.totalCount });
  },
});

// The rest of your pipe code remains the same

try {
  await Deno.stdin.readable
    .pipeThrough(new TextDecoderStream())
    .pipeThrough(countWords)
    .pipeTo(
      new WritableStream({
        async write(chunk) {
          if (chunk.type === "batch") {
            console.log("Words in this line :", chunk.count);
          } else {
            console.log("\n--- Final Report ---");
            console.log("overall count of words is", chunk.count);
          }
        },
      })
    );
} catch (e) {
  // controller.terminate() throws an error to break the pipe, which is normal
  if (!(e instanceof Error && e.message.includes("terminate"))) {
    console.error(e);
  }
}
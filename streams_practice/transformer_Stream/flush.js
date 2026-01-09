// 1. Multiplier (Same as before)
const multiplier = new TransformStream({
  transform(chunk, controller) {
    const result = chunk.map((x) => Number(x) * 10);
    controller.enqueue(result);
  },
});

// 2. Sum Tracker (New)
const sumTracker = new TransformStream({
  // This variable is initialized when the stream starts
  runningTotal: 0,

  transform(chunk, controller) {
    // chunk is the array from the multiplier: [10, 20]
    const batchSum = chunk.reduce((acc, curr) => acc + curr, 0);
    
    // Update the persistent variable
    this.runningTotal += batchSum;

    // We still pass the batch to the next stream
    controller.enqueue({ type: "BATCH", data: chunk });
  },

  flush(controller) {
    // This runs ONLY when you type "exit" (controller.close() is called)
    controller.enqueue({ type: "SUMMARY", data: this.runningTotal });
  }
});

// 3. Readable (Input logic)
const readable = new ReadableStream({
  async pull(controller) {
    const arr = [];
    const data = prompt("Enter value ('exit' to stop, '' to process):");
    
    if (data === "exit") {
      controller.close();
    } else if (data === "") {
      controller.enqueue(arr); // Enqueue whatever we have
    } else {
      arr.push(data);
      // For simplicity in this example, we send one-item arrays
      controller.enqueue(arr); 
    }
  },
});

// 4. Sink (Output logic)
const sink = new WritableStream({
  write(chunk) {
    if (chunk.type === "BATCH") {
      console.log("Processed Batch:", chunk.data);
    } else if (chunk.type === "SUMMARY") {
      console.log("\n==========================");
      console.log("GRAND TOTAL:", chunk.data);
      console.log("==========================");
    }
  }
});

await readable
  .pipeThrough(multiplier)
  .pipeThrough(sumTracker)
  .pipeTo(sink);
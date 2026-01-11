const encoder = new TextEncoder();

const trafficMonitor = new TransformStream({
  totalBytes: 0,
  threshold: 50,

  transform(chunk, controller) {
    // 1. Update the byte count (chunk is a Uint8Array from stdin)
    this.totalBytes += chunk.byteLength;

    // 2. Always pass the original data through
    controller.enqueue(chunk);

    // 3. Check if we crossed the 50-byte mark
    if (this.totalBytes >= this.threshold) {
      const message = `\n[TRAFFIC REPORT: ${this.totalBytes} bytes reached]\n`;
      
      // We must encode the string message into bytes to match the chunk type!
      controller.enqueue(encoder.encode(message));
      
      // Increase threshold for the next alert
      this.threshold += 50;
    }
  }
});

console.log("Type something! I will report every 50 bytes of data...");

await Deno.stdin.readable
  .pipeThrough(trafficMonitor)
  .pipeTo(Deno.stdout.writable);
  
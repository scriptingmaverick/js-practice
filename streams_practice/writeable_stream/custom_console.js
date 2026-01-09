const timestampLogger = new WritableStream({
  // The 'write' module handles each chunk
  write(chunk) {
    const time = new Date().toLocaleTimeString();
    console.log(`[${time}] Writing: ${chunk}`);
  },
  close() {
    console.log("Stream closed. No more data.");
  },
});

// To use it:
const writer = timestampLogger.getWriter();

await writer.write("First message");
await writer.write("Second message");

await writer.close();

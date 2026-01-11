const logFile = await Deno.open("finalArchive.txt", { read: true });
const errorFile = await Deno.open("errors.json", {
  write: true,
  create: true,
  truncate: true,
});

const logParser = new TransformStream({
  start(controller) {
    this.firstEntry = true;
    controller.enqueue(new TextEncoder().encode("[\n"));
  },

  transform(chunk, controller) {
    // const chunkData = new TextDecoder().decode(chunk).split("\n");
    const chunkData = chunk.split("\r\n");
    while (chunkData.length > 0) {
      const line = chunkData.shift();
      // 1. Filter: Only keep lines with "Error"
      if (!line.includes("ERROR")) continue;

      // 2. Parsing: [12:00:00] My error message
      const closingBracket = line.indexOf("]");
      if (closingBracket === -1) continue; // Skip malformed lines

      const time = line.slice(1, closingBracket); // "12:00:00"
      const message = line.slice(closingBracket + 2).trim(); // "My error message"

      const logObj = { time, message, level: "ERROR" };

      console.log("err obj -> ", logObj);
      // 3. JSON Formatting (with comma logic)
      const encoder = new TextEncoder();
      if (!this.firstEntry) {
        controller.enqueue(encoder.encode(",\n"));
      }

      controller.enqueue(encoder.encode(JSON.stringify(logObj, null, 2)));
      this.firstEntry = false;
    }
  },

  flush(controller) {
    controller.enqueue(new TextEncoder().encode("\n]"));
  },
});

await logFile.readable
  .pipeThrough(new TextDecoderStream())
  .pipeThrough(logParser)
  .pipeTo(errorFile.writable);

console.log("📂 Error log API generated!");

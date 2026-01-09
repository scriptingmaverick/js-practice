const encoder = new TextEncoder();

// We create the WritableStream
const terminalWriter = Deno.stdout.writable.getWriter();

const myStream = new WritableStream({
  async write(chunk) {
    if (chunk === "clear" || chunk === "cls") {
      console.clear();
      return;
    }

    // We get a writer for the SYSTEM's stdout stream

    // We add a "\n" so the output appears on a new line
    await terminalWriter.write(encoder.encode(chunk + "\n"));

    // IMPORTANT: We must release the lock so the NEXT chunk can use it
  },

  close() {
    terminalWriter.releaseLock();
    console.log("Stream sink closed.");
  },
});

const writer = myStream.getWriter();

while (true) {
  const data = prompt("Enter prompt:");

  // Exit condition
  if (data === "" || data === null) {
    await writer.close();
    break;
  }

  // Length logic
  if (data.length <= 3) {
    console.log("(Ignored: Too short)");
    continue;
  }

  await writer.write(data);
}

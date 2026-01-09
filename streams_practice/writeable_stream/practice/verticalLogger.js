const encoder = new TextEncoder();
// Get the terminal writer OUTSIDE the stream definition
const terminalWriter = Deno.stdout.writable.getWriter();

const verticalStream = new WritableStream({
  async write(chunk) {
    // chunk is the string passed from writer.write(data)
    const letters = chunk.split(""); 
    
    for (const char of letters) {
      // Write each character + a newline to the terminal writer
      await terminalWriter.write(encoder.encode(char + "\n"));
    }
  },

  close() {
    terminalWriter.releaseLock(); // Important: Unlock the terminal
    console.log("\nStream finished.");
  },
});

const writer = verticalStream.getWriter();

while (true) {
  const data = prompt("Enter text (Empty to stop):");
  if (!data) {
    await writer.close();
    break;
  }

  await writer.write(data);
}
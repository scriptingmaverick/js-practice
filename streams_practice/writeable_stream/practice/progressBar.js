// 1. Get the system's writable stream for the terminal
const terminalStream = Deno.stdout.writable;
const writer = terminalStream.getWriter();
const encoder = new TextEncoder();

async function startLoading() {
  console.log("Starting Download:");

  for (let i = 0; i < 10; i++) {
    // 2. Encode the character '#' into bytes
    const chunk = encoder.encode("#");

    // 3. Write directly to the terminal sink
    await writer.write(chunk);

    // Add a small delay so we can see it happening
    await new Promise((r) => setTimeout(r, 200));
  }

  // 4. Always release the lock when done!
  writer.releaseLock();
  console.log("\nDone!");
}

await startLoading();

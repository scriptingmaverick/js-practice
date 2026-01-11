// A simple way to create a "signal"
let resolveWrite;
let writeFinished = Promise.resolve();

const file = await Deno.open("example.txt", {
  write: true,
  create: true,
  append: true,
});

const readable = new ReadableStream({
  async pull(controller) {
    // 1. WAIT for the previous write to be totally finished
    await writeFinished;
    
    const data = prompt("Enter log (empty to quit):");
    if (!data) return controller.close();

    // 2. Prepare a new promise for the NEXT pull to wait on
    writeFinished = new Promise((res) => {
      resolveWrite = res;
    });
    
    controller.enqueue(data + "\n");
  },
});

const writable = new WritableStream({
  async write(chunk) {
    const beforeSize = (await file.stat()).size;
    await file.write(new TextEncoder().encode(chunk));
    
    const afterSize = (await file.stat()).size;
    console.log(`✅ Success: File grew by ${afterSize - beforeSize} bytes.`);
    
    // 3. TELL the pull it can now show the next prompt
    resolveWrite();
  },
  close() {
    file.close();
  },
});

await readable.pipeTo(writable);

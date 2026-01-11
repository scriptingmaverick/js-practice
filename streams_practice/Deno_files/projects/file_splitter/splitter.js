const inputFile = await Deno.open("../readme.md", { read: true });

const reader = new ReadableStream({
  async pull(controller) {
    const buffer = new Uint8Array(500);
    const bytesRead = await inputFile.read(buffer);

    // Deno returns null when the file is finished
    if (bytesRead === null) {
      inputFile.close();
      controller.close();
      return;
    }

    controller.enqueue(buffer.subarray(0, bytesRead));
  },
});

await Deno.mkdir("splitted_files", { recursive: true });

const writer = new WritableStream({
  fileIndex: 1,
  async write(chunk) {
    const filePath = `splitted_files/file${this.fileIndex++}.txt`;

    // Using Deno.writeFile is a handy shortcut for:
    // open -> write -> close in one line!
    await Deno.writeFile(filePath, chunk);

    console.log(`✅ Created ${filePath} (${chunk.byteLength} bytes)`);
  },
});

await reader.pipeTo(writer);
console.log("🚀 Splitting complete!");

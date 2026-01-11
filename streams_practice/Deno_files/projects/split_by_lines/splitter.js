const inputFile = await Deno.open("../readme.md", { read: true });
const splitter = new TransformStream({
  start() {
    this.linesBuffer = [];
  },
  transform(chunk, controller) {
    const text = new TextDecoder().decode(chunk);
    const allLines = (this.fragment + text).split("\n");
    this.fragment = allLines.pop() || ""; 

    this.linesBuffer.push(...allLines);

    while (this.linesBuffer.length >= 10) {
      const batch = this.linesBuffer.splice(0, 10);
      controller.enqueue(new TextEncoder().encode(batch.join("\n") + "\n"));
    }
  },
  flush(controller) {
    const finalData = [...this.linesBuffer];
    if (this.fragment) finalData.push(this.fragment);
    
    if (finalData.length > 0) {
      controller.enqueue(new TextEncoder().encode(finalData.join("\n")));
    }
  },
});

await Deno.mkdir("splitted_files", { recursive: true });

const writer = new WritableStream({
  fileIndex: 1,
  async write(chunk) {
    const filePath = `splitted_files/file${this.fileIndex++}.txt`;
    await Deno.writeFile(filePath, chunk);

    console.log(`✅ Created ${filePath} (${chunk.byteLength} bytes)`);
  },
});

await inputFile.readable.pipeThrough(splitter).pipeTo(writer);
console.log("🚀 Splitting complete!");

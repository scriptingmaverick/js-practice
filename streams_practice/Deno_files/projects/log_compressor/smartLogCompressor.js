console.clear();
console.log('enter any of this ["exit", "quit", ""] to exit.');
console.log('enter "ignore" in the log to ignore that particular log.');
let isWriterOpen = Promise.resolve(true);
let isResolved;

const readInput = new ReadableStream({
  async pull(controller) {
    await isWriterOpen;

    isWriterOpen = new Promise((res) => {
      isResolved = res;
    });

    const data = prompt("Enter log :");
    if (!data || data === "exit" || data === "quit") {
      return controller.close();
    }

    await controller.enqueue(data);
  },
});

const filter = new TransformStream({
  transform(chunk, controller) {
    if (chunk.includes("ignore")) {
      isResolved();
      return;
    }

    const timeStamp = new Date().toLocaleTimeString();
    const data = `[${timeStamp}] logs ${chunk}`;

    controller.enqueue(data);
  },
});

const batcher = new TransformStream({
  start() {
    this.batchSize = 0;
    this.data = [];
  },
  transform(chunk, controller) {
    this.batchSize++;
    this.data.push(chunk);
    if (this.batchSize >= 3) {
      controller.enqueue(this.data.join("\n") + "\n");
      this.batchSize = 0;
      this.data = [];
      return;
    }

    isResolved();
  },
  flush(controller) {
    controller.enqueue(this.data.join("\n"));
  },
});

const outputFile = await Deno.open("finalArchieve.txt", {
  write: true,
  create: true,
});

const writer = new WritableStream({
  async write(chunk) {
    const bsize = (await outputFile.stat()).size;
    outputFile.write(new TextEncoder().encode(chunk));
    const fsize = (await outputFile.stat()).size;
    console.log("--- Batch arrived (file size :", fsize - bsize, ")");

    isResolved();
  },
});

await readInput.pipeThrough(filter).pipeThrough(batcher).pipeTo(writer);

// await Deno.chmod("finalArchieve.txt", 0o400);

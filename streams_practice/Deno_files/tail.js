const file = await Deno.open("example.txt", { read: true });

const process = new TransformStream({
  transform(chunk, controller) {
    const data = new TextDecoder()
      .decode(chunk)
      .split("\n")
      .filter((x) => x !== "")
      .slice(-3);

    controller.enqueue(new TextEncoder().encode(data.join("\n")));
  },
});

const readable = new ReadableStream({
  async start(controller) {
    const fileInfo = await file.stat();
    const fileSize = fileInfo.size;

    const chunkSize = Math.min(500, fileSize);
    const buffer = new Uint8Array(chunkSize);

    await file.seek(fileSize - chunkSize, Deno.SeekMode.Start);
    
    const bytesRead = await file.read(buffer);
    if (bytesRead) {
      // Use subarray to only send the bytes that were actually read from disk
      controller.enqueue(buffer.subarray(0, bytesRead));
    }

    controller.close();
  },
});

await readable.pipeThrough(process).pipeTo(Deno.stdout.writable);

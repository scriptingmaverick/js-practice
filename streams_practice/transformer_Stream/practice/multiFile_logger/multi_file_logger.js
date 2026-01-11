const infoFile = await Deno.open("info_file.txt", {
  create: true,
  write: true,
});
const errorFile = await Deno.open("error_file.txt", {
  create: true,
  write: true,
});

const date = new Date();
const encoder = new TextEncoder();

const sendToStream = new TransformStream({
  transform(chunk, controller) {
    const data = `[${date.toLocaleTimeString()}] ${chunk.type.toUpperCase()}: ${
      chunk.msg
    }.\n`;

    controller.enqueue({ type: chunk.type, data });
  },
});

const getPacket = () => {
  const type = confirm("is an error") ? "error" : "info";
  const msg = prompt("Enter msg :");
  if (!msg) return null;
  return { type, msg };
};

const readable = new ReadableStream({
  async pull(controller) {
    const packet = getPacket();
    packet ? controller.enqueue(packet) : controller.close();
  },
});

const writable = new WritableStream({
  async write(chunk) {
    const msg = encoder.encode(chunk.data);
    
    if (chunk.type === "error") {
      await errorFile.write(msg);
    } else {
      await infoFile.write(msg);
    }

    console.log("write successful.");
  },
});

await readable.pipeThrough(sendToStream).pipeTo(writable);

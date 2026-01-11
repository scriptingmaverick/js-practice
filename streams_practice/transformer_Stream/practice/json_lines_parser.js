const parser = new TransformStream({
  transform(chunk, controller) {
    controller.enqueue(JSON.parse(chunk));
  },
});

const applyDiscount = new TransformStream({
  transform(chunk, controller) {
    if (chunk.price > 20) {
      chunk.price -= (chunk.price * 0.10); // 10% discount
    }
    controller.enqueue(chunk);
  },
});

const encoder = new TextEncoder();

const format = new TransformStream({
  transform(chunk, controller) {
    const data = `Product: ${chunk.name}, Price: $${chunk.price.toFixed(2)}\n`;
    controller.enqueue(encoder.encode(data));
  },
});

const getItemDetails = () => {
  const item = prompt("Enter item name (or leave empty to stop):");
  if (!item) return null;
  const price = prompt(`Enter ${item} price :`);
  return JSON.stringify({ name: item, price: Number(price) });
};

const readable = new ReadableStream({
  async pull(controller) {
    const data = getItemDetails();
    if (data) {
      controller.enqueue(data);
    } else {
      controller.close(); // This tells the pipe we are done!
    }
  },
});

console.log("--- Shopping Cart Processor ---");

await readable
  .pipeThrough(parser)
  .pipeThrough(applyDiscount)
  .pipeThrough(format)
  .pipeTo(Deno.stdout.writable);

console.log("Processing finished.");
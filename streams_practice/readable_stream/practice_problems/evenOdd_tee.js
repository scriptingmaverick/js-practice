const isOdd = (num) => +num & 1;

const odds = new TransformStream({
  transform(chunk, controller) {
    if (isOdd(chunk)) controller.enqueue(chunk);
  },
});

const evens = new TransformStream({
  transform(chunk, controller) {
    if (!isOdd(chunk)) controller.enqueue(chunk);
  },
});

const readable = new ReadableStream({
  pull(controller) {
    for (let i = 0; i < 10; i++) {
      controller.enqueue(i);
    }

    controller.close();
  },
});

const evenNumbers = [];
const oddNumbers = [];

const evenStorage = new WritableStream({
  write(chunk) {
    evenNumbers.push(chunk);
  },
});

const oddStorage = new WritableStream({
  write(chunk) {
    oddNumbers.push(chunk);
  },
});

const [stream1, stream2] = readable.tee();

const evenNums = stream1.pipeThrough(evens).pipeTo(evenStorage);
const oddNums = stream2.pipeThrough(odds).pipeTo(oddStorage);

await Promise.all([evenNums, oddNums]).then((x) =>
  console.log(evenNumbers, oddNumbers)
);

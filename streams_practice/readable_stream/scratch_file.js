const myReadableStream = new ReadableStream({
  // This starts as soon as the stream is created
  start(controller) {
    controller.enqueue("First chunk of data");
    controller.enqueue("Second chunk of data");
    controller.close(); // No more data 
    // controller.error('data ends')
  },
});

// close must be used at the end of controller
// error also must be used at end and it executes immediately without even giving the enqueued dat to stream caller

// Using the Reader to consume the data
const reader = myReadableStream.getReader();

// Read the first chunk
const chunk1 = await reader.read();
console.log(chunk1.value); // "First chunk of data"
console.log(chunk1.done); // false

// Read the second chunk
const chunk2 = await reader.read();
console.log(chunk2.value); // "Second chunk of data"
console.log(chunk2);

// Read the final state
const chunk3 = await reader.read();
console.log(chunk3.done); // true (because we called controller.close())

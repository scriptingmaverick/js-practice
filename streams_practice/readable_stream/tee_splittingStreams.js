const myReadableStream = new ReadableStream({
  start(controller) {
    controller.enqueue("First chunk of data");
    controller.enqueue("Second chunk of data");
    controller.close(); // No more data
  },
});

// Splitting the  ain stream into 2 individual streams
const splittedReaders = myReadableStream.tee();

// Using the Reader to consume the data
const readers = splittedReaders.map((x) => x.getReader());

// Read the first chunk of 1st reader
const chunk1Of1 = await readers[0].read();
console.log(chunk1Of1);

// Read the first chunk of 2nd reader
const chunk1Of2 = await readers[1].read();
console.log(chunk1Of2);

// Read the 2nd chunk of 1st reader
const chunk2Of1 = await readers[0].read();
console.log(chunk2Of1);

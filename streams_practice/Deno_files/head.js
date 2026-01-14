const limit = 5;

const file = await Deno.open("directory_maker.js");
const file1 = await Deno.open("chunkReading.js");

const files = [file, file1];

files.forEach(async (file) => {
  console.log((await file.stat()).size);

  const process = new TransformStream({
    count: 0,
    transform(chunk, controller) {
      this.count++;
      if (this.count < limit) controller.enqueue(chunk);
      else if (this.count === limit) {
        controller.enqueue(chunk);
      }
    },
  });
  await file.readable
    .pipeThrough(new TextDecoderStream())
    .pipeThrough(process)
    // .pipeThrough(new TextEncoderStream())
    .pipeTo(
      new WritableStream({
        write(chunk) {
          console.log(chunk);
        },
      }),
    );
});

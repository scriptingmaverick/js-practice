const myFile = await Deno.open("newFile.txt", { write: true, create: true });

const myFileWriter = myFile.writable.getWriter();
const encoder = new TextEncoder();

const stream = new WritableStream({
  async write(chunk) {
    await myFileWriter.write(encoder.encode(chunk));
  },

  close() {
    myFile.close();
    console.log("stream and file were closed");
  },
});

const writer = stream.getWriter();

while (true) {
  let data = prompt("Enter data :");

  if (data === "") {
    await writer.close();
    break;
  }

  if (isNaN(+data)) {
    data = data.toUpperCase();
  }

  await writer.write(data);
}

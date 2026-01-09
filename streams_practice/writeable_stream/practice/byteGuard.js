const stream = new WritableStream({
  write(data, controller) {
    if (data.byteLength > 10) {
      controller.error("data length is more than threshold");
    }

    console.log("Given data :", new TextDecoder().decode(data));
  },

  close() {
    console.log("stream closed.");
  },
});

const writer = stream.getWriter();
const encoder = new TextEncoder();

while (true) {
  const data = prompt('enter data ["stop" to exit] :');
  if (data === "stop" || data === '') {
    writer.close();
    break;
  }

  const encodedData = encoder.encode(data);

  try {
    await writer.write(encodedData);
  } catch (error) {
    console.log(error);
    break;
  }
}

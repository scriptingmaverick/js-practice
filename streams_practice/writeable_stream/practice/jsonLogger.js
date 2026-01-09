using file = await Deno.open("result.txt", { write: true, create: true });
// const encoder = new TextEncoder();
let id = 0;

// const writer = new WritableStream({
//   async write(chunk) {
//     await file.write(encoder.encode(chunk + "\n"));
//   },
//   close() {
//     console.log("stream and file closed.");
//   },
// }).getWriter();

const getData = () => {
  const task = prompt("Enter task :");
  return { id: ++id, task: task + "\n" };
};

const systemWriter = file.writable.getWriter();

while (true) {
  const data = getData();

  if (data.task === "") {
    systemWriter.close();
    break;
  }

  // await writer.write(JSON.stringify(data));
  await systemWriter.write(
    new TextEncoder().encode(JSON.stringify(data) + "\n"),
  );
}

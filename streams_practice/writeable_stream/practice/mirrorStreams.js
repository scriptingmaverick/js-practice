const file = await Deno.open("mirrorfile.txt", { create: true, write: true });
const terminalWriter = await Deno.stdout.writable.getWriter();

const myWriter = new WritableStream({
  async write(chunk) {
    chunk = new TextEncoder().encode(chunk + "\n");
    await file.write(chunk);
    await terminalWriter.write(chunk);
  },

  close() {
    console.log("streams closed.");
  },
}).getWriter();

while (true) {
  const data = prompt("enter prompt :");

  if (data === "") {
    myWriter.close();
    break;
  }

  await myWriter.write(data);
}

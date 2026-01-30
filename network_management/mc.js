const encoder = new TextEncoder();
const conn = await Deno.connect({
  hostname: "127.0.0.1",
  port: 8080,
  transport: "tcp",
});

// while (true) {
await conn.write(new TextEncoder().encode("hello"));
const buffer = new Uint8Array(1024);
const bytesread = await conn.read(buffer);

const response = buffer.slice(0, bytesread);

console.log(new TextDecoder().decode(response), response);
// }

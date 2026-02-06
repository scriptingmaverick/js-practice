import { decode, encode } from "./helper.js";

const createConnection = async () => {
  return await Deno.connect({
    port: 8000,
    transport: "tcp",
    hostname: "127.0.0.1",
  });
};

const read = async (conn) => {
  const buffer = new Uint8Array(1024);
  let bytesRead = await conn.read(buffer);
  const msg = decode(buffer.subarray(0, bytesRead));

  await Deno.stdout.write(encode(msg));
  bytesRead = await Deno.stdin.read(buffer);
  return decode(buffer.subarray(0, bytesRead)).trim();
};

const main = async () => {
  const conn = await createConnection();
  const data = await read(conn);
  await conn.write(encode(data));
  while (true) {
    await read(conn);
  }
};

main();

import { decode, encode } from "./helper.js";

const createConnection = async () => {
  return await Deno.connect({
    port: 8000,
    transport: "tcp",
    hostname: "127.0.0.1",
  });
};

const main = async () => {
  const conn = await createConnection();

  await conn.write(encode(JSON.stringify(Deno.consoleSize())));

  await Promise.all([
    conn.readable.pipeTo(Deno.stdout.writable),
    Deno.stdin.readable.pipeTo(conn.writable),
  ]);
};

main();

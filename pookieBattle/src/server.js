import { startGame } from "./game_logics.js";
import { clearAgentScreen, decode, encode } from "./helper.js";

const createListener = () => {
  return Deno.listen({
    port: 8000,
    transport: "tcp",
  });
};
const players = [];

const read = async (conn, buffer) => {
  await conn.write(encode("Enter UserName :"));
  const bytesRead = await conn.read(buffer);
  return decode(buffer.subarray(0, bytesRead)).trim();
};

const handleConn = async (conn) => {
  const buffer = new Uint8Array(1024);
  const name = await read(conn, buffer);
  players.push({ name, conn });
  console.log(players);
  if (players.length < 2) {
    await conn.write(encode("Waiting for opponent to join"));
  } else {
    startGame(players);
  }
};

const main = async () => {
  const listener = createListener();
  for await (const conn of listener) {
    if (players.length === 2) {
      await conn.write(encode("Room fulled try after "));
      await conn.close();
    } else {
      handleConn(conn);
    }
  }
};

main();

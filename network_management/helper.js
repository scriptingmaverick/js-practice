const decoder = new TextDecoder();
const encoder = new TextEncoder();

export const decode = (text) => decoder.decode(text);

export const encode = (text) => encoder.encode(text);

export const initializeInterval = () => {
  let i = 1;
  const intervalId = setInterval(() => {
    console.clear();

    Deno.stdout.write(encode(`searching ${".".repeat(i)}`));
    i = (i + 1) % 4;
  }, 400);

  return intervalId;
};

export const clear = (intervalId) => clearInterval(intervalId);

export const format = (packet) => encode(JSON.stringify(packet));

export const parse = (response) => JSON.parse(decode(response));

export const handleSendFromStream = async (conn) => {
  await printToConsole("Enter your msg : ");

  const data = handleRead();
  const isClosed = decode(data) === "bye" ? true : false;
  const packet = format({ data, isClosed });

  await conn.write(packet);
};

export const handleReply = async (conn) => {
  const response = new Uint8Array(1024);
  const bytesRead = await conn.read(response);

  return parse(response.slice(0, bytesRead));
};

export const printToConsole = async (text) => {
  await Deno.stdout.write(encode(text));
};

export const handleClose = async (conn) => {
  await printToConsole("Connection closed");
  conn.close();
};

export const instantiateSession = async () => {
  console.clear();
  await printToConsole("Connection established\n");
};

export const initiateListener = () =>
  Deno.listen({
    port: 8000,
    transport: "tcp",
  });

export const initiateConnector = () =>
  Deno.connect({
    port: 8000,
    transport: "tcp",
  });

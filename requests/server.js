const parseHeaders = (data) => {
  const headers = {};
  for (const line of data) {
    const [key, value] = line.split(":");
    headers[key] = value;
  }

  return headers;
};

const parse = (data) => {
  const lines = data.split("\r\n");
  const requestLine = lines[0];
  const bodyStartIndex = lines.indexOf("");
  const headers = lines.slice(1, bodyStartIndex);
  const body = lines.slice(bodyStartIndex + 1);

  return [requestLine, parseHeaders(headers), body];
};

const establishServer = (port = 8000) =>
  Deno.listen({ port: 8000, transport: "tcp" });

const encoder = new TextEncoder();
const decoder = new TextDecoder();

const encode = (text) => encoder.encode(text);
const decode = (text) => decoder.decode(text);

const handleRequest = async (conn) => {
  const buffer = new Uint8Array(1024);
  const n = await conn.read(buffer);
  const data = decode(buffer.subarray(0, n));

  const [requestLine, headers, body] = parse(data);
  console.log({ requestLine, headers, body });
  await conn.close();
};

const main = async () => {
  const server = establishServer();
  for await (const conn of server) {
    handleRequest(conn);
  }
};

main();

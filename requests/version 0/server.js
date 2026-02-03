const parseHeaders = (data) => {
  const headers = {};
  for (const line of data) {
    const [key, value] = line.split(":");
    headers[key] = value;
  }

  return headers;
};

const formatHeaders = (headers) => {
  const data = [];
  for (const key in headers) {
    data.push(`${key}: ${headers[key]}`);
  }

  return data.join("\r\n");
};

const parse = (data) => {
  const lines = data.split("\r\n");
  const requestLine = lines[0];
  const bodyStartIndex = lines.indexOf("");
  const headers = lines.slice(1, bodyStartIndex);
  const body = lines.slice(bodyStartIndex + 1);

  return [requestLine, parseHeaders(headers), body];
};

const format = (responseLine, headers, body) =>
  [responseLine, headers, "", body].join("\r\n");

const establishServer = (port = 8000) =>
  Deno.listen({ port: 8000, transport: "tcp" });

const encoder = new TextEncoder();
const decoder = new TextDecoder();

const encode = (text) => encoder.encode(text);
const decode = (text) => decoder.decode(text);

const successResponse = (body) => {
  const responseLine = ["http/1.1", "200", "OK"].join(" ");
  const headers = {
    "content-type": "text/html",
    "content-length": body.length,
    "time": new Date(),
  };

  return [responseLine, formatHeaders(headers), body];
};

const failedResponse = () => {
  const responseLine = ["http/1.1", "404", "Not Found"].join(" ");
  const headers = {
    "content-type": "text/html",
    "time": new Date(),
  };

  return [
    responseLine,
    formatHeaders(headers),
    Deno.readTextFileSync("./error.html"),
  ];
};

const parseReqLine = (reqLine) => reqLine.split(" ");

const pages = {
  "/news": "../news.html",
  "/fruits": "../fruits.html",
};

const handleRequest = (requestLine, headers, body) => {
  const [method, request_path, protocol] = parseReqLine(requestLine);

  if (request_path === "/") {
    const data = Deno.readTextFileSync("welcome.html");
    return format(...successResponse(data));
  } else if (request_path in pages) {
    const data = Deno.readTextFileSync(pages[request_path]);
    return format(...successResponse(data));
  } else {
    return format(...failedResponse(), "");
  }
};

const handleConn = async (conn) => {
  const buffer = new Uint8Array(1024);
  const n = await conn.read(buffer);
  const data = decode(buffer.subarray(0, n));

  const [requestLine, headers, body] = parse(data);
  const response = handleRequest(requestLine, headers, body);

  await conn.write(encode(response));
  await conn.close();
};

const main = async () => {
  const server = establishServer();
  for await (const conn of server) {
    await handleConn(conn);
  }
};

main();

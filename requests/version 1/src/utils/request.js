import { decode } from "./helper.js";

const parseHeaders = (rawHeaders) => {
  const headers = {};
  for (const header of rawHeaders) {
    const index = header.indexOf(":");
    const key = header.slice(0, index);
    const value = header.slice(index + 1);

    headers[key] = value.trim();
  }

  return headers;
};

const parseRequest = (request) => {
  const data = request.split("\r\n");
  const [method, path, protocol] = data[0].split(" ");

  const bodyStartIndex = data.indexOf("");

  const headers = data.slice(1, bodyStartIndex);
  const body = data.slice(bodyStartIndex + 1);

  return { method, path, protocol, headers: parseHeaders(headers), body };
};

const readRequestFrom = async (conn) => {
  const buffer = new Uint8Array(1024);
  const n = await conn.read(buffer);

  const data = decode(buffer.subarray(0, n));

  return parseRequest(data);
};

export const handleRequest = async (conn) => {
  const request = await readRequestFrom(conn);
  console.log(request);

  await conn.close()
};

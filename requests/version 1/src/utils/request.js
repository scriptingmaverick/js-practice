import { decode, encode } from "./helper.js";
import { Response } from "./response.js";

const PAGES = {
  "/": "./pages/welcome.html",
  "/fruits": "./pages/fruits.html",
  "/news": "./pages/news.html",
  "/error": "./pages/error.html",
  "/user": "./pages/user.json",
};

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

const createResponse = async (request) => {
  const { path } = request;
  const response = new Response();
  const convert = {
    "html": (data) => response.setHTML(data),
    "json": (data) => response.setJSON(data),
  };

  if (path in PAGES) {
    const data = await Deno.readTextFile(PAGES[path]);
    const type = PAGES[path].slice(-4);

    convert[type]();
    return response.success(request, data, 200);
  }

  response.setHTML(await Deno.readTextFile(PAGES["/error"]));
  return response.failure(request, data, 404);
};

const write = async (response, conn) => {
  await conn.write(encode(response));
  await conn.close();
};

export const handleRequest = async (conn) => {
  const request = await readRequestFrom(conn);

  const response = await createResponse(request);

  await write(response, conn);
};

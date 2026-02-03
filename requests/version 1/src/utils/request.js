import { decode, encode } from "./helper.js";
import { Response } from "./response.js";

const PAGES = {
  "/": "./pages/welcome.html",
  "/fruits": "./pages/fruits.html",
  "/news": "./pages/news.html",
  "/error": "./pages/error.html",
  "/user": "./pages/user.json",
};

export class Request {
  method;
  protocol;
  headers;
  path;
  body;

  constructor(request) {
    const data = request.split("\r\n");
    [this.method, this.path, this.protocol] = data[0].split(" ");

    const bodyStartIndex = data.indexOf("");

    this.#parseHeaders(data.slice(1, bodyStartIndex));
    this.body = data.slice(bodyStartIndex + 1);
  }

  #parseHeaders(rawHeaders) {
    this.headers = {};

    for (const header of rawHeaders) {
      const index = header.indexOf(":");
      const key = header.slice(0, index);
      const value = header.slice(index + 1);

      headers[key] = value.trim();
    }
  }

  async createResponse() {
    const response = new Response();
    const convert = {
      "html": (data) => response.setHTML(data),
      "json": (data) => response.setJSON(data),
    };

    if (this.path in PAGES) {
      const data = await Deno.readTextFile(PAGES[this.path]);
      const type = PAGES[this.path].slice(-4);

      convert[type]();
      return response.success({ protocol: this.protocol }, data, 200);
    }

    response.setHTML(await Deno.readTextFile(PAGES["/error"]));
    return response.failure({ protocol: this.protocol }, data, 404);
  }
}

const readRequestFrom = async (conn) => {
  const buffer = new Uint8Array(1024);
  const n = await conn.read(buffer);

  const data = decode(buffer.subarray(0, n));
  return parseRequest(data);
};

const write = async (response, conn) => {
  await conn.write(encode(response));
  await conn.close();
};

export const handleRequest = async (conn) => {
  const requestData = await readRequestFrom(conn);
  const request = new Request(requestData);

  const response = await request.createResponse();

  await write(response, conn);
};

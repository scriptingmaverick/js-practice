export class Response {
  #msg;
  #code;
  #headers;
  #body;
  #protocol;
  constructor() {
    this.#msg = "";
    this.#code = 0;
    this.#headers = {};
    this.#body = "";
    this.#protocol = "";
  }

  setHTML() {
    this.#headers["content-type"] = "text/html";
  }

  setJSON() {
    this.#headers["content-type"] = "application/json";
  }

  formatHeaders() {
    const data = [];
    for (const key in this.#headers) {
      data.push(`${key}: ${this.#headers[key]}`);
    }

    return data.join("\r\n");
  }

  createResponse() {
    const responseLine = [this.#protocol, this.#code, this.#msg].join(" ");
    const headers = this.formatHeaders();
    return [responseLine, headers, "", this.#body].join("\r\n");
  }

  success({ protocol }, data, code) {
    this.#protocol = protocol;

    this.#headers["content-length"] = this.#body.length;
    this.#headers.date = new Date();

    this.#code = code;
    this.#msg = "OK";

    this.#body = data;

    return this.createResponse();
  }

  failure({ protocol }, data, code) {
    this.#protocol = protocol;

    this.#headers.date = new Date();
    this.#headers["content-length"] = this.#body.length;

    this.#code = code;
    this.#msg = "Not Found";

    this.#body = data;

    return this.createResponse();
  }
}

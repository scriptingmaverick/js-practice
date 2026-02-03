export class Response {
  #msg;
  #code;
  #type;
  #headers;
  #body;
  constructor() {
    this.#msg = "";
    this.#code = 0;
    this.#type = "";
    this.#headers = {};
    this.#body = "";
  }

  setHTML(data) {
    this.#type = "text/html";
    this.#body = data;
  }

  setJSON(data) {
    this.#type = "application/json";
    this.#body = JSON.stringify(data);
  }

  formatHeaders() {
    const data = [];
    for (const key in this.#headers) {
      data.push(`${key}: ${this.#headers[key]}`);
    }

    return data.join("\r\n");
  }

  success({ protocol }, code) {
    this.#headers.type = this.#type;
    this.#headers.time = new Date();
    this.#code = code;
    this.#msg = "OK";

    const responseLine = [protocol, this.#code, this.#msg].join(" ");
    const headers = this.formatHeaders();
    return [responseLine, headers, "", this.#body].join("\r\n");
  }

  failure({ protocol }, code) {
    this.#code = code;
    this.#headers.time = new Date();
    this.#msg = "Not Found";

    const responseLine = [protocol, code, this.#msg].join(" ");
    const headers = this.formatHeaders();
    return [responseLine, headers, "", this.#body].join("\r\n");
  }
}

const encryptor = new TransformStream({
  start() {
    this.data = "--- ENCRYPTED LOG START ---\n";
  },
  transform(chunk) {
    for (let i = 0; i < chunk.length; i++) {
      const charCode = chunk[i].charCodeAt();
      const encryptedChar = String.fromCharCode(charCode + 1);
      this.data += encryptedChar;
    }
  },
  flush(controller) {
    this.data += "\n--- ENCRYPTED LOG END ---";
    controller.enqueue(this.data.trim());
  },
});

await Deno.stdin.readable
  .pipeThrough(new TextDecoderStream())
  .pipeThrough(encryptor)
  .pipeThrough(new TextEncoderStream())
  .pipeTo(Deno.stdout.writable);

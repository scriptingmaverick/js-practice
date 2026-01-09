let bytesRead = 0;

for await (const chunk of Deno.stdin.readable) {
  console.log("current chunk length :", chunk.byteLength);
  console.log("overall bytes read :", bytesRead += chunk.byteLength);
}

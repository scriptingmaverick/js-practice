const secret = "javascript";
const decoder = new TextDecoder();
for await (const chunk of Deno.stdin.readable) {
  const text = decoder.decode(chunk);
  if (text.split(" ").includes(secret)) {
    console.log("Match found in chunk");
  }

  if (text === "exit\n") {
    console.log("exiting....");
    break;
  }
}

const directory = await Deno.mkdir("files", { recursive: true });

await Deno.writeTextFile("files/file1.txt", "hello this is file 1");
await Deno.writeTextFile("files/file2.txt", "hello this is file 2");
await Deno.writeTextFile("files/logo.png", "hello this is file 3");

for await (const entry of Deno.readDir("files")) {
  if (entry.isFile && entry.name.endsWith(".txt")) {
    console.log(await Deno.readTextFile(`files/${entry.name}`));
  }
}

await Deno.remove("files", { recursive: true });

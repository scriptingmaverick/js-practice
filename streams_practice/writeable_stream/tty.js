const tty0 = await Deno.open("/dev/ttys000", { read: true, write: true });

for await (const chunk of tty0.readable) {
  Deno.stdout.write(chunk)
}


const main = () => {
  const input = Deno.readTextFileSync("input.txt").split("\r\n");
  return input;
};

console.log(main());

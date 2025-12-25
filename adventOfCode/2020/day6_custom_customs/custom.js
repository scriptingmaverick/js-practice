const main = () => {
  const input = Deno.readTextFileSync('input.txt').split('\n');
  return input
}

console.log(main())
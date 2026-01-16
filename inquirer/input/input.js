import { input } from "@inquirer/prompts";
// Or
// import input from '@inquirer/input';

const answer = await input({
  message: "Enter your name",
  default: "watcher",
  required: true,
  transformer: (value) => value.toUpperCase(),
});

console.log(answer);

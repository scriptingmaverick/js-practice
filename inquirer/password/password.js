import { password } from "@inquirer/prompts";
// Or
// import password from '@inquirer/password';

const answer = await password({
  message: "Enter your password",
});

console.log(answer);

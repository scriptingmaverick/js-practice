import { rawlist } from '@inquirer/prompts';
// Or
// import rawlist from '@inquirer/rawlist';

const answer = await rawlist({
  message: 'Select a package manager',
  choices: [
    { name: 'npm', value: 'npm' },
    { name: 'yarn', value: 'yarn' },
    { name: 'pnpm', value: 'pnpm' },
  ],
});

console.log(answer)
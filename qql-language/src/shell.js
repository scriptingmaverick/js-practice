import { commandsSpecifics, printCommands } from "./help_data.js";
import { executeDbCommands, multipLineInput } from "./commands.js";
import { red } from "jsr:@std/internal@^1.0.12/styles";
export const executeShell = (input) => {
  const [mainCmd, cmdToUse = "--all", ...rest] = input.split(" ");
  switch (mainCmd) {
    case "exit":
      return 'exit';
    case "help": {
      let result;
      if (cmdToUse === "--all") {
        result = printCommands();
        result.map(x =>console.log(x))
        result = ''
      } else if (commandsSpecifics[cmdToUse.replace("--", "")]) {
        result =
          "\n" +
          Object.values(commandsSpecifics[cmdToUse.replace("--", "")]).join(
            "\n"
          ) +
          "\n";
      } else {
        result = red(cmdToUse) + " is not found\n";
      }
      return result;
    }
    default: {
      if (Object.keys(commandsSpecifics).includes(mainCmd)) {
        return executeDbCommands(input);
      }

      return input;
    }
  }
};

export const runShell = () => {
  while (true) {
    let input = prompt("OQL />");
    if (input.slice(0, 6) === "create") {
      input = multipLineInput(input);
    }

    const result = executeShell(input);
    if (result === 'exit') {
      return;
    }
    if (!result) {
      continue;
    }
    console.log(result);
  }
};

runShell();

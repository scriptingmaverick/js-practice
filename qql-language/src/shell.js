function red(text) {
  return "\x1B[31m" + text + "\x1B[0m";
}
function green(text) {
  return "\x1B[32m" + text + "\x1B[0m";
}
function yellow(text) {
  return "\x1B[33m" + text + "\x1B[0m";
}
function blue(text) {
  return "\x1B[34m" + text + "\x1B[0m";
}
function magenta(text) {
  return "\x1B[35m" + text + "\x1B[0m";
}
function cyan(text) {
  return "\x1B[36m" + text + "\x1B[0m";
}

const commandsSpecifics = {
  "select": yellow("select") + " is used for getting records in the database",
  "where": yellow("where") + " is used for selcting specific records",
  "count": yellow("count") + " is used for getting no.of records",
};

const executeShell = () => {
  while (true) {
    const input = prompt("OQL />");
    const [mainCmd, cmdToUse = "all", ...rest] = input.split(" ");

    switch (mainCmd) {
      case "exit":
        return;
      case "help": {
        let result;
        if (cmdToUse === "all") {
          result = Object.values(commandsSpecifics).join("\n");
        } else {
          result = commandsSpecifics[cmdToUse];
        }
        console.log(result);
      }
    }
  }
};


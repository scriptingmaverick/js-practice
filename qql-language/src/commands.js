import { buildMessage } from "jsr:@std/internal@^1.0.12/build-message";
import { commandsSpecifics } from "./help_data.js";
import {
  createNewTable,
  filterData,
  insertNewRecord,
  showData,
} from "./executableCommands.js";

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

export const error = [];
const og_dataTypes = ["int", "varchar", "char"];

export const createCommandLineValidation = (input) => {
  const cmd = input[0];
  const syntax = commandsSpecifics[cmd].syntax
    .slice(13, 36)
    .replace("table_name", input.at(-1))
    .split(" ");

  for (let i = 0; i < input.length; i++) {
    if (input[i] !== syntax[i]) {
      error[0] = blue(input[i]) + " command not found";
      return;
    }
  }
  return true;
};

export const createCommandDataValidation = (formattedInput) => {
  const variables = parseInputInsideParenthesis(formattedInput).values;
  const fields = [];
  for (let i = 0; i < variables.length; i++) {
    const [type, name] = variables[i].trim().split(" ").reverse();
    let dataType = type;
    let values = dataType.includes("har") ? "" : 0;
    const constraints = [];
    if (type.includes("(")) {
      const parsedData = parseInputInsideParenthesis(type);
      dataType = parsedData.cmd ? parsedData.cmd : dataType;
      values = parsedData.values ? parsedData.values : values;
      constraints.push({ lengthMustBe: values.join("") });
    }

    if (!og_dataTypes.includes(dataType)) {
      error[0] = blue(dataType) + " is not a valid dataType";
      return;
    }

    fields.push({
      name,
      dataType,
      constraints,
    });
  }

  return fields;
};

export const parseInputInsideParenthesis = (input) => {
  const firstIndex = input.indexOf("(");
  const lastIndex = input.lastIndexOf(")");
  const values = input
    .slice(firstIndex + 1, lastIndex)
    .split(",")
    .filter((x) => x.trim() !== "");
  return {
    cmd: input.slice(0, firstIndex).trim(),
    values,
    rest: input.slice(lastIndex + 1),
  };
};

const commandsWithOpes = {
  create: (input) => {
    const tableName = createCommandValidation(input);
    if (tableName) {
      return green(tableName) + " is created successfully";
    }

    return false;
  },
  select: (input) => selectCommandValidation(input.split(";")[0]),
  insert: (input) => insertCommandValidation(input.split(";")[0]),
  delete: (input) => deleteCommandValidation(input),
  drop: (input) => dropCommandValidation(input),
  update: (input) => updateCommandValidation(input),
  alter: (input) => alterCommandValidation(input),
};

const createCommandValidation = (input) => {
  const formattedInput = input.split(";")[0];
  const indexOfFieldsStart = formattedInput.indexOf("(");
  const cmdPart = formattedInput
    .slice(0, indexOfFieldsStart)
    .split(" ")
    .filter((x) => x !== "");
  if (!createCommandLineValidation(cmdPart)) return;

  if (input.split(" ")[2].includes(";")) {
    error[0] = "Must provide fields while creating a table.";
    return;
  }

  const fields = createCommandDataValidation(formattedInput);
  if (!fields) {
    return;
  }

  const tableName = cmdPart.at(-1);
  createNewTable(tableName, fields);

  return tableName;
};

export const selectCommandValidation = (formattedInput) => {
  const splitWithF = formattedInput
    .split("f")
    .flatMap((x) => x.split(" ").flatMap((x) => x.split(",")))
    .filter((x) => x.trim() !== "");

  let indexOfFrom = 0;
  for (let i = 0; i < splitWithF.length; i++) {
    if (splitWithF[i].includes("rom") || splitWithF[i].includes("rm")) {
      indexOfFrom = i;
      break;
    }
  }

  const requiredFields = splitWithF.slice(1, indexOfFrom);
  const tableName = splitWithF.slice(indexOfFrom + 1)[0];
  const rawSyntax = commandsSpecifics["select"].syntax.split(";")[0].slice(13);
  const syntax = rawSyntax
    .replace("*/[column1, column2]", requiredFields.join(","))
    .replace("table_name", tableName)
    .split(" ");

  const splittedInput = (
    splitWithF[0] +
    " " +
    requiredFields.join(",") +
    " f" +
    splitWithF.slice(indexOfFrom, indexOfFrom + 2).join(" ")
  ).split(" ");

  const conditions = splitWithF.slice(indexOfFrom + 2);
  for (let i = 0; i < splittedInput.length; i++) {
    if (splittedInput[i] !== syntax[i]) {
      error[0] = blue(splittedInput[i]) + " not found.";
      return;
    }
  }
  
  return showData(tableName, requiredFields,conditions);
};

const insertCommandValidation = (input) => {
  let cmdLine = "";
  let fields = "";
  let values = "";
  let isFieldStarted = false;
  let isFieldsEnded = false;
  let isValuesStarted = false;
  for (let i = 0; i < input.length; i++) {
    if (input[i] === "(" && !isFieldStarted) {
      isFieldStarted = true;
      continue;
    } else if (input[i] === "(") {
      isValuesStarted = true;
      continue;
    }

    if (input[i] === ")" && !isFieldsEnded) {
      isFieldsEnded = true;
      continue;
    } else if (input[i] === ")") continue;

    cmdLine +=
      !isFieldStarted || (isFieldsEnded && !isValuesStarted) ? input[i] : "";
    fields += isFieldStarted && !isFieldsEnded ? input[i] : "";
    values += isValuesStarted ? input[i] : "";
  }
  const indexOfSpaceInField = fields.indexOf(" ");
  if (
    indexOfSpaceInField > 0 &&
    !fields.slice(0, indexOfSpaceInField).includes(",")
  ) {
    error[0] = "fields must be separated by commas(,).";
    return;
  }

  cmdLine = cmdLine.split(" ").filter((x) => x.trim() !== "");
  const tableName = cmdLine[2];
  const rawSyntax = commandsSpecifics.insert.syntax.split(";")[0].slice(13);
  const syntax = rawSyntax
    .replace("column1, column2", fields)
    .replace("table_name", tableName)
    .replace("value1, value2", values)
    .split(" ");
  const extraInput = input.split(" ");
  for (let i = 0; i < syntax.length; i++) {
    if (syntax[i] !== extraInput[i]) {
      error[0] = blue(extraInput[i]) + " is not found.";
      return;
    }
  }

  return insertNewRecord(
    tableName,
    fields,
    values.replaceAll('"', "").replaceAll("'", "")
  );
};

export const executeDbCommands = (input) => {
  if (input.includes("}") || input.includes("{")) {
    error[0] = "curly braces not supported in OQL.";
    return "\nInvalid Syntax : " + error[0] + "\n";
  }

  const cmd = input.split(" ")[0];
  if (commandsWithOpes[cmd]) {
    if (!input.includes(";")) {
      error[0] = "every statement must end with " + red("semi-colon(;).");
      return "\nInvalid Syntax : " + error[0] + "\n";
    }
  }
  const result = commandsWithOpes[cmd](input);
  if (!result) return "\nInvalid Syntax : " + error[0] + "\n";

  return result;
};

export const multipLineInput = (input) => {
  while (!";)".includes(input.at(-1))) {
    input += prompt("");
  }
  return input;
};

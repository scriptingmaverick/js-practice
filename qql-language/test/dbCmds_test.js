import { assertEquals } from "@std/assert/equals";
import {
  executeDbCommands,
  parseInputInsideParenthesis,
} from "../src/commands.js";

import {
  createNewTable,
  insertNewRecord,
  showData,
} from "../src/executableCommands.js";

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

Deno.test("test with curly braces {}", () => {
  assertEquals(
    executeDbCommands("create table My_table{"),
    "\nInvalid Syntax : curly braces not supported in OQL.\n"
  );
});

Deno.test("test with wrong placement of semicolon", () => {
  assertEquals(
    executeDbCommands("create table My_tabl;"),
    "\nInvalid Syntax : Must provide fields while creating a table.\n"
  );
});

Deno.test("test with wrong placement of semicolon", () => {
  assertEquals(
    executeDbCommands("create table My_table();"),
    "\nInvalid Syntax : Must provide fields while creating a table.\n"
  );
});

Deno.test("parsing input in parenthesis", () => {
  assertEquals(parseInputInsideParenthesis("(col1,col2,col3)"), {
    cmd: "",
    values: ["col1", "col2", "col3"],
    rest: "",
  });
});

Deno.test("parsing input in parenthesis 2", () => {
  assertEquals(parseInputInsideParenthesis("name varchar(20),"), {
    cmd: "name varchar",
    values: ["20"],
    rest: ",",
  });
});

Deno.test("parsing input in parenthesis 3", () => {
  assertEquals(parseInputInsideParenthesis("select (id,name,salary)"), {
    cmd: "select",
    values: ["id", "name", "salary"],
    rest: "",
  });
});

Deno.test("testing create cmd validation", () => {
  assertEquals(
    executeDbCommands("create tabl My_table (id int,name varchar(20));"),
    `\nInvalid Syntax : ${blue("tabl")} command not found\n`
  );
});

Deno.test("testing create cmd validation by giving wrong datatype", () => {
  assertEquals(
    executeDbCommands(`create table xyz (id int,
       name vachar(20),
       ); `),
    `\nInvalid Syntax : ${blue("vachar")} is not a valid dataType\n`
  );
});

Deno.test("creating an existing table", () => {
  assertEquals(
    createNewTable("my_table", [
      { dataType: "int", name: "id", constraints: [] },
    ]),
    red("my_table") + " is already exists."
  );
});

Deno.test("creating a table", () => {
  assertEquals(
    createNewTable("new_table", [
      { dataType: "int", name: "id", constraints: [] },
      {
        dataType: "varchar",
        name: "name",
        constraints: [{ lengthMustBe: 20 }],
      },
    ]),
    red("new_table") + " is already exists."
  );
});

Deno.test("testing select command with error", () => {
  assertEquals(
    executeDbCommands("select id from new_table"),
    "\nInvalid Syntax : every statement must end with " +
      red("semi-colon(;).") +
      "\n"
  );
});

Deno.test("testing select command with incorrect command", () => {
  assertEquals(
    executeDbCommands("select id frm new_table;"),
    `\nInvalid Syntax : ${blue("frm")} not found.\n`
  );
});

Deno.test("testing select command with wrong column name", () => {
  assertEquals(
    executeDbCommands("select id, nme from new_table;"),
    "\nInvalid Syntax : \x1b[34mnme\x1b[0m is not present on table\n"
  );
});

// Deno.test("testing select command", () => {
//   assertEquals(executeDbCommands("select id, name from new_table;"), [
//     ["id", "1", "2", "3"],
//     ["name", "fgn", "fsgs", "dgaed"],
//   ]);
// });

// Deno.test("displaying data of a table", () => {
//   assertEquals(showData("new_table", ["id", "name"]), [
//     ["id", "1", "2", "3"],
//     ["name", "fgn", "fsgs", "dgaed"],
//   ]);
// });

// Deno.test("test inserting values", () => {
//   assertEquals(
//     insertNewRecord("new_table", "name", "sendhil"),
//     "inserted succesfully."
//   );
// });

// Deno.test("test inserting values", () => {
//   assertEquals(
//     executeDbCommands(
//       'insert into new_table (id, name) values (10,"sendhil");'
//     ),
//     "inserted succesfully."
//   );
// });

Deno.test("test with filter in select cmd", () => {
  assertEquals(executeDbCommands("select id from new_table where id = '10';"), [
    "id: 10",
    "name: perrumbai",
  ]);
});

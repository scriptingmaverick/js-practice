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

const createHelpStructure = (cmdToHelp) =>
  Object.values(cmdToHelp).join("\n  ");

export const commandsSpecifics = {
  create: {
    context: green("--create") + " is used for creating a table in the db",
    syntax:
      "syntax: " +
      magenta(
        `create table table_name (
    column1 datatype,
    column2 datatype,
    column3 datatype
);`
      ),
    example:
      "exapmle: " +
      cyan(`create table Employees (
    ID int,
    Name varchar(255),
    Salary int
);`),
  },
  insert: {
    context:
      green("--insert") +
      " is used for inserting a record into an existing table",
    syntax:
      "syntax: " +
      magenta(
        "insert into table_name (column1, column2) values (value1, value2);"
      ),
    example:
      "exapmle: " +
      cyan(
        "insert into Employees (Name, Department, Salary) values ('John Doe', 'Marketing', 60000);"
      ),
  },
  update: {
    context:
      green("--update") + " is used for updating a record or a field in table",
    syntax:
      "syntax: " +
      magenta(
        "update table_name set column1 = value1, column2 = value2 where condition;"
      ),
    example:
      "exapmle: " +
      cyan("update Employees set Salary = 65000 where Name = 'John Doe';"),
  },
  select: {
    context:
      yellow("--select") + " is used for getting records in the database",
    syntax:
      "syntax: " + magenta("select */[column1, column2] from table_name;"),
    example: "exapmle: " + cyan("select Name, Salary from Employees;"),
  },
  where: {
    context:
      yellow("--where") + " filters records based on a specific condition",
    syntax:
      "syntax: " +
      magenta(`select column_name from table_name where condition;`),
    example:
      "exapmle: " + cyan(`select * from Employees where Department = 'Sales';`),
  },
  distinct: {
    context: yellow("--distinct") + " return only distinct values",
    syntax:
      "syntax: " + magenta("select distinct column_name from table_name;"),
    example: "exapmle: " + cyan("select distinct Department from Employees;"),
  },
  delete: {
    context: red("--delete") + " is used for deleting a record in db",
    syntax: "syntax: " + magenta("delete from table_name where condition;"),
    example: "exapmle: " + cyan("delete from Employees where ID = 105;"),
  },
  drop: {
    context: red("--drop") + " deletes the table and all its data permanently",
    syntax: "syntax: " + magenta("drop table table_name;"),
    example: "exapmle: " + cyan("drop table employees"),
  },
};

export const printCommands = () =>
  Object.values(commandsSpecifics).map(
    (x) => "\n" + createHelpStructure(x) + "\n"
  );

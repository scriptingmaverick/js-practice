import { error } from "./commands.js";

const SCHEMA_DIRECTORY = "./table_schemas";
const TABLE_DIRECTORY = "./tables";

function red(text) {
  return "\x1B[31m" + text + "\x1B[0m";
}

function blue(text) {
  return "\x1B[34m" + text + "\x1B[0m";
}

const createSchema = (tableName, fields) => {
  const schema = fields.map((field) => {
    return [
      [field.name],
      [field.dataType],
      [field.constraints.map((constraint) => [constraint.lengthMustBe])],
    ];
  });

  Deno.writeTextFileSync(
    `${SCHEMA_DIRECTORY}/${tableName}.txt`,
    schema.join("\n")
  );
};

const createTable = (tableName, fields) => {
  const makeFields = fields.map((field) => field.name);
  Deno.writeTextFileSync(
    `${TABLE_DIRECTORY}/${tableName}.txt`,
    makeFields.join("\t")
  );
};

export const createNewTable = (tableName, fields) => {
  Deno.writeTextFileSync(`${TABLE_DIRECTORY}/${tableName}.txt`, "", {
    append: true,
  });

  const table = Deno.readTextFileSync(`${TABLE_DIRECTORY}/${tableName}.txt`);
  if (table !== "") {
    return red(tableName) + " is already exists.";
  }

  createSchema(tableName, fields);
  createTable(tableName, fields);

  return blue(tableName) + " is created successfully.";
};

export const showData = (tableName, requiredFields) => {
  const tempData = [
    ["id", "name"],
    [1, "fgn"],
    [2, "fsgs"],
    [3, "dgaed"],
  ];
  Deno.writeTextFileSync(
    `${TABLE_DIRECTORY}/${tableName}.txt`,
    tempData.map((x) => x[0] + "\t" + x[1]).join("\n")
  );

  const data = Deno.readTextFileSync(
    `${TABLE_DIRECTORY}/${tableName}.txt`
  ).split("\n");

  const fields = data[0].split("\t");
  let fieldStores = fields.map((x) => [x]);

  for (let i = 1; i < data.length; i++) {
    const splittedInfo = data[i].split("\t");
    fieldStores = fieldStores.map(
      (field, i) => field.push(splittedInfo[i]) && field
    );
  }

  for (let i = 0; i < requiredFields.length; i++) {
    if (requiredFields[i] !== fieldStores[i][0]) {
      error[0] = blue(requiredFields[i]) + " is not present on table";
      return;
    }
  }

  const dataToReturn = fieldStores.filter((x) => requiredFields.includes(x[0]));
  return dataToReturn;
};

export const insertNewRecord = (tableName, fields, data) => {
  const fieldsToStore = fields
    .split(",")
    .flatMap((x) => x.split(" "))
    .filter((x) => x.trim() !== "");
  const dataToStore = data
    .split(",")
    .flatMap((x) => x.split(" "))
    .filter((x) => x.trim() !== "");
  console.log(dataToStore);
  Deno.writeTextFileSync(`${TABLE_DIRECTORY}/${tableName}.txt`, "", {
    append: true,
  });

  const file = Deno.readTextFileSync(
    `${TABLE_DIRECTORY}/${tableName}.txt`
  ).split("\n");
  if (file === "") {
    error[0] = blue(tableName) + " is not created in db";
    return;
  }
  const fieldsHad = file[0].split("\t");
  for (let i = 0; i < fieldsToStore.length; i++) {
    if (!fieldsHad.includes(fieldsToStore[i])) {
      error[0] = blue(fieldsToStore[i]) + " is not a field in table";
      return;
    }
  }

  const schema = Deno.readTextFileSync(`${SCHEMA_DIRECTORY}/${tableName}.txt`)
    .split("\n")
    .map((x) => x.split(","));
  const dataToStoreInFile = [];
  for (let i = 0; i < fieldsHad.length; i++) {
    let isFound = -1;
    const default_value = schema
      .filter((x) => x[0] === fieldsHad[i])[0][1]
      .includes("char")
      ? ""
      : 0;
    for (let j = 0; j < fieldsToStore.length; j++) {
      if (fieldsToStore[j] === fieldsHad[i]) isFound = j;
    }
    dataToStoreInFile.push(
      isFound === -1 ? default_value : dataToStore[isFound]
    );
  }

  Deno.writeTextFileSync(
    `${TABLE_DIRECTORY}/${tableName}.txt`,
    `\n${dataToStoreInFile.join("\t")}`,
    { append: true }
  );

  return "inserted succesfully.";
};

export const deleteARecord = (tableName, threshold) => {};

export const filterData = (tableName, threshold) => {};

export const deleteTable = (tableName) => {};

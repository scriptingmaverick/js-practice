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
  const tablePath = `${TABLE_DIRECTORY}/${tableName}`;
  Deno.writeTextFileSync(`${tablePath}.txt`, "", {
    append: true,
  });

  const table = Deno.readTextFileSync(`${tablePath}.txt`);
  if (table !== "") {
    return red(tableName) + " is already exists.";
  }

  createSchema(tableName, fields);
  createTable(tableName, fields);

  return blue(tableName) + " is created successfully.";
};

export const insertNewRecord = (tableName, fields, data) => {
  const tablePath = `${TABLE_DIRECTORY}/${tableName}`;
  const fieldsToStore = fields
    .split(",")
    .flatMap((x) => x.split(" "))
    .filter((x) => x.trim() !== "");
  const dataToStore = data
    .split(",")
    .flatMap((x) => x.split(" "))
    .filter((x) => x.trim() !== "");

  Deno.writeTextFileSync(`${tablePath}.txt`, "", {
    append: true,
  });

  const file = Deno.readTextFileSync(`${tablePath}.txt`).split("\n");

  if (file[0] === "") {
    error[0] = blue(tableName) + " is not created.";
    return;
  }

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

const allFields = (data, fields, indexOfRequiredValue) =>
  Object.values(data).map((x, i) => `${fields[i]}: ${x[indexOfRequiredValue]}`);

const specificFields = (fieldStores, requiredFields, fields) =>
  Object.values(fieldStores)
    .filter((x, i) => requiredFields.includes(fields[i]))
    .map((x, i) => `${requiredFields[i]} : [ ${x} ]`);

export const showData = (tableName, requiredFields, conditions = []) => {
  const tablePath = `${TABLE_DIRECTORY}/${tableName}`;
  Deno.writeTextFileSync(`${tablePath}.txt`, "", {
    append: true,
  });

  const data = Deno.readTextFileSync(`${tablePath}.txt`).split("\n");

  if (data[0] === "") {
    error[0] = blue(tableName) + " is not created.";
    return;
  }

  if (data.length === 1) {
    error[0] = blue(tableName) + " has no data in it.";
    return;
  }

  const fields = data[0].split("\t");
  const fieldStores = {};

  for (let i = 0; i < fields.length; i++) {
    fieldStores[i] = [];
  }

  for (let i = 1; i < data.length; i++) {
    const splittedData = data[i].split("\t");
    splittedData.map((x, i) => fieldStores[i].push(x));
  }

  for (let i = 0; i < requiredFields.length; i++) {
    if (requiredFields[i] !== fields[i]) {
      error[0] = blue(requiredFields[i]) + " is not present on table";
      return;
    }
  }

  console.log(tableName, requiredFields, conditions);
  console.log(fields, fieldStores);
  console.log(allFields(fieldStores, fields, requiredFields));
  if (requiredFields[0] === "*") {
    if (conditions.length > 2) {
      return filterData(fields, fieldStores, conditions, requiredFields);
    }
  }

  return specificFields(fieldStores, requiredFields, fields);
};

export const filterData = (
  fields,
  data,
  condition,
  returnableFields = ["*"]
) => {
  if (condition[0] !== "where") {
    error[0] = blue(condition[0]) + " is not found.";
    return;
  }

  const indexOfFieldToCheck = fields.indexOf(condition[1]);
  if (!data[indexOfFieldToCheck]) {
    error[0] = blue(condition[1]) + " is not a field of table.";
    return;
  }

  const indexOfRequiredValue = data[indexOfFieldToCheck].indexOf(
    condition[3].replaceAll('"', "").replaceAll("'", "")
  );

  if (indexOfRequiredValue === -1) {
    error[0] = blue(condition[3]) + " is not present on table.";
    return;
  }

  if (returnableFields[0] === "*") {
    return allFields(data, fields, indexOfRequiredValue);
  }
  return specificFields(data, returnableFields, fields);
};

export const deleteARecord = (tableName, threshold) => {};

export const deleteTable = (tableName) => {};

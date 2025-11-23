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
  console.log(requiredFields);
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
  const rd = fieldStores.filter((x) => requiredFields.includes(x[0]));
  console.log(rd);
};

export const insertNewRecord = (tableName, data) => {};

export const deleteARecord = (tableName, threshold) => {};

export const filterData = (tableName, threshold) => {};

export const deleteTable = (tableName) => {};

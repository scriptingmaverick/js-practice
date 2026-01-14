import { DatabaseSync } from "node:sqlite";

export const db = new DatabaseSync(":memory:");

export const table = "trnxs";
export const args = ["amount"];

db.exec(
  `CREATE TABLE IF NOT EXISTS ${table}(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  ${args[0]} INTEGER
);`,
);

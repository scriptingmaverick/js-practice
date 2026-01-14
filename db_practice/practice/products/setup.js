import { DatabaseSync } from "node:sqlite";

export const db = new DatabaseSync(":memory:");

export const table = "products";
export const args = ["name", "price"];

db.exec(
  `CREATE TABLE IF NOT EXISTS ${table}(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  ${args[0]} VARCHAR(50),
  ${args[1]} INTEGER
);`
);

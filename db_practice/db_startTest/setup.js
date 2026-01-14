import { DatabaseSync } from "node:sqlite";

export const db = new DatabaseSync("test.db");

export const table = "student";
export const args = ["age", "name", "subject"];

db.exec(
  `CREATE TABLE IF NOT EXISTS ${table}(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  ${args[0]} INTEGER,
  ${args[1]} VARCHAR(50),
  ${args[2]} TEXT
);`,
);

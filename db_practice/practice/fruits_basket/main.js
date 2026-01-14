import { db } from "./setup.js";

const insert = db.prepare("insert into fruits(name) values(?);");

const fruits = ["apple", "mango", "banana", "guava", "cherry"];

for (const fruit of fruits) {
  insert.run(fruit);
}

console.log(db.prepare("select count(name) from fruits;").all());

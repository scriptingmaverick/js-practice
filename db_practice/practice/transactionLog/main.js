import { db } from "./setup.js";

const insert = db.prepare("insert into trnxs(amount) values(?);");

const rawTransactions = ["+100", "-20", "+50", "-10", "+5"];

for (const amount of rawTransactions) {
  insert.run(+amount);
}

console.log(
  db.prepare("select sum(amount) as sumOfTrnxs from trnxs;")
    .all(),
);

import { args, db, table } from "./setup.js";

const insert = db.prepare(
  `insert into ${table}(${args[0]},${args[1]},${args[2]}) values(?,?,?)`,
);

const show = db.prepare(`select * from ${table}`);

const insertFn = () => {
  const values = [];
  let i = 0;
  while (i < args.length) {
    values.push(prompt(`enter value for ${args[i++]}`));
  }

  insert.run(...values);
  console.log("\ninsert successful.");
};

const showFn = () => {
  const data = show.all();

  if (data.length === 0) return console.log("\nNo rows to show.");
  while (data.length > 0) {
    const row = data.shift();
    console.log(row);
  }

  console.log("\nrows fetched successfully.");
};

// while (true) {
//   const userPrompt = prompt(
//     "\nselec any option :\t1) select \t\t2) insert \t\t3) exit : ",
//   );
//   const choices = {
//     1: showFn,
//     2: insertFn,
//     3: () => Deno.exit(0),
//   };

//   choices[userPrompt]();
// }

console.log(db);

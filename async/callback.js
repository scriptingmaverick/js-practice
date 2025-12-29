import * as fs from "node:fs";

// const fileData = fs.readFile("./files", "utf8", (a, l) => {
//   const files = l.split("\n");
//   const f1 = fs.readFile(files[0], "utf8", (a, l) => {
//     console.log("f1 -> ", l);
//     return l;
//   });
//   const f2 = fs.readFile(files[1], "utf8", (a, l) => {
//     console.log("f2 -> ", l);
//     return l;
//   });

//   console.log(f1);
//   console.log(f2);
//   return f1 + f2;
// });

// console.log("fd -> ", fileData);

export let fil = fs.readFile("./file1", "utf-8", (err, data) => (fil = data));
setTimeout(() => {
  console.log(fil);
}, 1000);

// we can't access fil anyway so, we have to export it then unless we use a settimeout / setinterval.

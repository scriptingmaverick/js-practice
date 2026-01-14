import { db } from "./setup.js";

console.log(db.query("select * from student;"));

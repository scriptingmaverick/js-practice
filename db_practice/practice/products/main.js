import { db } from "./setup.js";

const insert = db.prepare("insert into products(name,price) values(?,?)");

insert.run("keyboard", 50);
insert.run("mouse", 30);
insert.run("monitor", 200);

const getCheapProducts = (minPrice) => {
  const select = db.prepare(
    `select * from products where price <= ${minPrice}`,
  );

  console.log(select.all());
};

getCheapProducts(30);

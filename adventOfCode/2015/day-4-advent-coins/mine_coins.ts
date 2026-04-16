import { md5 } from "@takker/md5";
import { encodeHex } from "jsr:@std/encoding@1/hex";

// const hash = md5("your message here");
// console.log(encodeHex(hash));

// const input = Deno.readTextFileSync("input.txt");

const hasFound = (hash: string): boolean => hash.startsWith("000000");

const input: string = "yzbqklnj";

const secret: string = input;

let i: number = 0;

while (true) {
  const msg: string = secret + i++;

  // console.log(msg);
  const hash = md5(msg);

  if (hasFound(encodeHex(hash))) {
    console.log(i);
    break;
  }
}

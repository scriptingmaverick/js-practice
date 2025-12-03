import { assertEquals } from "jsr:@std/assert";
import { part_1, part_2, recursiveAddition } from "./1.js";

const input = Deno.readTextFileSync("input.txt");

Deno.test("simple test of part-1 with sample values", () => {
  assertEquals(part_1("12\n14\n1969\n100756"), 34241);
});

Deno.test("simple test of part-1 ", () => {
  assertEquals(part_1("123\n34\n56\n89"), 91);
});

Deno.test("part-1 test with input", () => {
  assertEquals(part_1(input), 3270338);
});

Deno.test("testing recursive addition function", () => {
  assertEquals(recursiveAddition(14), 2);
});

Deno.test("testing recursive addition function", () => {
  assertEquals(recursiveAddition(1969), 966);
});

Deno.test("testing recursive addition function", () => {
  assertEquals(recursiveAddition(100756), 50346);
});

Deno.test("simple test of part-2 with sample values", () => {
  assertEquals(part_2("14\n1969\n100756"), 51314);
});

Deno.test('testing part-2 with input', () => {
  assertEquals(part_2(input), 4902650)
})

Deno.test('simple test 245', () => {
  const inp = Deno.readTextFileSync('inp.txt')
  assertEquals(part_2(inp),5218616)
})
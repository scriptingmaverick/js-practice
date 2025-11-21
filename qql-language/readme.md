# Object Query Language (OQL) Interpreter 💾
### This project simulates a tiny database query engine, feeling like a basic SQL shell or command-line parser.

---
## Goal: 
Define a small, fixed set of commands (e.g., SELECT, WHERE, COUNT) that operate on a central, large Array of JS Objects (simulating a table of records). Write a single function, query(commandString), that parses the command and executes the corresponding operations.

## Unique Feature:
 It requires parsing a String command into discrete instructions before executing the logic.

## Focus Concepts:

### Strings & String Methods:
* Using split and other methods to parse the complex input command string into an Array of tokens (e.g., separating 'SELECT name WHERE age > 30' into ['SELECT', 'name', 'WHERE', 'age > 30']).

### Array Methods:
* Extensive use of filter (for WHERE), map (for SELECTing specific fields), and potentially reduce (for COUNT).

### Functions:
* A primary parsing function and dedicated helper functions for each operation (selectRecords, filterRecords).

### Example Query Logic:
```js
Input: SELECT name, age WHERE country = 'USA'

Output: [{ name: 'Alice', age: 40 }, { name: 'Bob', age: 25 }] (Only names and ages for records where country is USA).

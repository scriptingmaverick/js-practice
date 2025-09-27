## **Problem: Splitting a Word by Alternating Vowels and Consonants**

Write a program that takes a single word as input and prints out **new words** according to the following rules:

1. Start a new word with the **first unused letter** of the input word.
2. Alternate between **vowel** and **consonant**, starting with the **type of the first letter**:

   * If the first letter is a vowel → next must be a consonant, then vowel, then consonant, and so on.
   * If the first letter is a consonant → next must be a vowel, then consonant, then vowel, etc.
3. To extend the current word, pick the **next letter of the required type that comes after the last letter used**.
4. Stop the current word when no further letters of the required type are available after the last used letter.
5. Repeat the process with the remaining letters (in order) until all letters are used.
6. Print each word **separated by commas**.

**Vowels:** a, e, i, o, u (lowercase only)
**Consonants:** all other lowercase letters

---

### **Worked Example**

**Input:**

```
apple
```

**Step-by-Step Explanation:**

1. Start with first letter `"a"` (vowel). Next required type → consonant.
2. Next consonant after `"a"` → `"p"`. Word so far: `"ap"`.
3. Next required type → vowel. Next vowel after `"p"` → `"e"`. Word so far: `"ape"`.
4. Next required type → consonant. Next consonant after `"e"` → none left. Stop current word.

✅ First word: `"ape"`

Remaining letters in order: `"p"`, `"l"` → none of them can continue alternation → each becomes a separate word.

**Final Output:**

```
ape,p,l
```

---

### **Test Cases**

| Input | Output    |
| ----- | --------- |
| apple | ape,p,l   |
| there | tere,h    |
| hello | helo,l    |
| abyss | ab,y,s,s |
| this  | tis,h    |

---

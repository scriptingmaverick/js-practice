# 🌌 Orion Compression Protocol — Assignment

## 🚀 Mission Brief: Operation Stellar Whisper

**Welcome, elite Quantum Engineers.**

After the success of the Bencode Cipher, your team has been promoted to the *Orion Division*. The interstellar *Orion Grid* suffers from bandwidth collapse caused by cosmic interference. Your mission is to craft a compact compression format — the **Orion Compression Protocol (OCP)** — to shrink text transmissions using a Run-Length Encoding (RLE) inspired system with support for nested patterns.

---

## 🛰️ The Story: Compression Beyond the Stars

In the year 2249, humanity’s interstellar network faces catastrophic slowdowns. The Mars Council demands immediate action. Your task is to design the core module of the **Orion Compression Engine** capable of compressing text using RLE, and — for advanced mode — detecting and compressing nested repeating patterns.

---

## 🧠 Technical Objectives

You will implement **two core functions** for the Orion Compression Protocol.

### 1️⃣ `encode(data)`

* **Purpose:** Convert a given string into its compressed OCP format.
* **Input:** a JavaScript string.
* **Output:** a compressed string using OCP notation.

**Rules:**

* Consecutive repeating characters are represented as `<count>[char]`.
* Non-repeating sequences are written as-is.
* Sequences may nest (compressed substrings can be re-encoded).

**Examples:**

```js
encode("aaaabbc")       // → "4[a]2[b]c"
encode("xxxxxxxxxx")    // → "10[x]"
encode("abbbbcccaa")    // → "a4[b]3[c]2[a]"
```

---

### 2️⃣ `decode(data)`

* **Purpose:** Reconstruct the original string from its compressed OCP form.
* **Input:** a compressed OCP string.
* **Output:** the original uncompressed string.

**Rules:**

* Expand any `<count>[char/sequence]` pattern recursively.
* Nested sequences must be decoded correctly.

**Examples:**

```js
decode("4[a]2[b]c")          // → "aaaabbc"
decode("2[ab3[c]]")          // → "abcccabccc"
decode("3[a2[bc]]")          // → "abcbcabcbcabcbc"
```

---

## 🧩 Bonus Challenge: Nested Universe Mode 🌠

In advanced transmissions, sequences can **nest indefinitely**.

Example:

```js
encode("abcbcabcbcabcbc")  // should produce something like "3[a2[bc]]"
```

**Bonus:** Build an encoder that **detects repeating patterns beyond single characters** (substrings) and compresses them into nested OCP form.

(Hint: recursion, substring detection, pattern grouping.)

---

## ✅ Example Test Cases

```js
console.log(encode("aaaa"));          // "4[a]"
console.log(decode("4[a]"));          // "aaaa"

console.log(encode("aabccc"));        // "2[a]b3[c]"
console.log(decode("2[a]b3[c]"));     // "aabccc"

console.log(decode("2[ab3[c]]"));     // "abcccabccc"
console.log(decode("3[a2[bc]]"));     // "abcbcabcbcabcbc"
```

---

## 🪐 Evaluation Criteria

* **Logic & Correctness:** Correct handling of nested encodings/decodings.
* **Recursion Mastery:** Elegant recursive decoding and (optional) nested encoding.
* **Readability:** Clean, modular code and clear variable names.
* **Creativity Bonus:** Encoder that auto-detects repeating substrings (not just single chars).

---

## 💬 Final Transmission

> "Compression is the language of the cosmos. Where there is repetition, there is opportunity."
>
> — Commander Nova, Head of the Orion Grid

Good luck, intern. The stars are counting on your code. 🌠

---

Would you like the **next mission** to be about **encryption (cipher)**, **file system simulation**, or **AI decision logic (chatbot core)**? Reply with your choice and I’ll craft another assignment.

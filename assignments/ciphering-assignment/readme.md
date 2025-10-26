## 🚀 Assignment: The Bencode Cipher - Securing the Future of Data!

### 🎯 Mission Brief: The Quantum Leap Initiative

Welcome, elite STEP interns! Your mission, should you choose to accept it, is to become the architects of a critical data serialization protocol. The "Quantum Leap Initiative" is a top-secret project aimed at revolutionizing secure data transfer for inter-planetary communications. Our current data formats are too verbose and inefficient for the vast distances and limited bandwidth of space. We need a compact, robust, and easily parsable serialization format.

This is where Bencode comes in. A simplified subset of the Bencode specification has been identified as the ideal candidate for our initial secure data packets. Your task is to implement the core encoding and decoding mechanisms for this vital protocol.

### 🌌 The Story: Whispers Across the Void

Imagine a future where humanity has established outposts on Mars and beyond. Communication between Earth and these distant colonies is paramount, but the vastness of space introduces significant challenges: signal degradation, limited bandwidth, and the constant threat of data interception. To overcome these hurdles, our scientists have developed a new, highly efficient data transfer system. However, this system relies on a specialized serialization format to pack crucial information into the smallest possible packets, ensuring both speed and security.

Your team has been tasked with building the "Bencode Cipher" – the very heart of this new communication system. Without your robust encoder and decoder, the Quantum Leap Initiative cannot proceed, and the future of inter-planetary communication hangs in the balance!

### 📝 Assignment Requirements: The Bencode Cipher Protocol

Your primary objective is to implement two core functions that will handle the serialization and deserialization of our critical data.

#### Supported Data Types:

Our simplified Bencode subset will only support the following data types:

1.  **Integers:** Represented as `i<integer>e`.
    *   Example: `i123e` for the number 123.
    *   Example: `i-42e` for the number -42.
    *   The integer `0` is `i0e`.
    *   No leading zeros (e.g., `i01e` is invalid).

2.  **Byte Strings:** Represented as `<length>:<string>`.
    *   Example: `5:hello` for the string "hello".
    *   Example: `0:` for an empty string.
    *   The length is the number of bytes in the string.

3.  **Lists:** Represented as `l<bencoded_elements>e`.
    *   Example: `li123e5:helloe` for the list `[123, "hello"]`.
    *   Example: `le` for an empty list.

#### Function Contracts:

You must implement two functions with the following contracts:

1.  **`encode(data)`**
    *   **Purpose:** Takes a JavaScript data type (number, string, or array) and converts it into its Bencoded string representation.
    *   **Parameters:**
        *   `data`: The data to be encoded. This can be a number, a string, or an array containing numbers, strings, or other arrays (nested lists).
    *   **Returns:** A string representing the Bencoded data.

2.  **`decode(bencodedString)`**
    *   **Purpose:** Takes a Bencoded string and converts it back into its original JavaScript data type.
    *   **Parameters:**
        *   `bencodedString`: The Bencoded string to be decoded.
    *   **Returns:** The original JavaScript data (number, string, or array).

### 💡 Example Usage:

```javascript
// Integer
console.log(encode(123));          // → "i123e"
console.log(decode("i123e"));      // → 123

// Byte String
console.log(encode("hello"));      // → "5:hello"
console.log(decode("5:hello"));    // → "hello"

// List
console.log(encode([1, "two", ["three", 4]])); // → "li1e3:twol5:threei4eee"
console.log(decode("li1e3:twol5:threei4eee")); // → [1, "two", ["three", 4]]

// Empty List
console.log(encode([]));           // → "le"
console.log(decode("le"));         // → []

// Edge Cases (you should consider these in your implementation)
console.log(encode(0));            // → "i0e"
console.log(decode("i0e"));        // → 0
console.log(encode(""));           // → "0:"
console.log(decode("0:"));         // → ""

```

### 🚀 Your Challenge:

This assignment will test your understanding of:

  * **Data Type Handling:** Correctly identifying and processing different data types.
  * **String Manipulation:** Building and parsing complex string formats.
  * **Recursion (for lists):** Effectively handling nested data structures.
  * **Error Handling (implicit):** Your decoder should ideally handle malformed Bencode gracefully, though explicit error messages are not strictly required for this initial phase.

Good luck, future data architects\! The fate of inter-planetary communication rests on your code\!

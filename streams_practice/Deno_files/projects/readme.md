# Poker Hand Classification Assignment

## Overview

The goal of this assignment is to write a JavaScript function that accepts a single poker hand as input and determines its classification. A **poker hand** consists of 5 cards, and the possible classifications include: **High Card**, **One Pair**, **Two Pair**, **Three of a Kind**, **Straight**, **Flush**, **Full House**, **Four of a Kind**, **Straight Flush**, and **Royal Flush**. The function should determine the correct classification based on the input and return it as a string.

This assignment helps build understanding of algorithms, sorting, and pattern recognition.

---

## Objectives

1. Write a function `classifyPokerHand(hand)` that:

   - Accepts an array of 5 cards as input.
   - Each card is represented as an array: `[rank, suit]`.
     - **Rank**: A string, one of `['A', '2', '3', ..., '10', 'J', 'Q', 'K']`.
     - **Suit**: A single-character string, one of `['H', 'D', 'S', 'C']` (representing Hearts, Diamonds, Spades, and Clubs).
   - Returns a string representing the classification of the hand.

2. Understand and implement the classifications, including their hierarchy.

---

## What is a Poker Hand?

A **poker hand** is a combination of exactly 5 cards dealt to a player from a standard 52-card deck. Each card has:

- A **rank** (value of the card) such as `2`, `7`, `J` (Jack), or `A` (Ace).
- A **suit** (symbol) such as `H` (Hearts), `D` (Diamonds), `S` (Spades), or `C` (Clubs).

The classification of a hand is based on the ranks and suits of the cards. Some classifications require specific sequences, repetitions, or combinations.

---

## Poker Hand Classifications

The classifications are listed below in hierarchical order, from lowest to highest:

### 1. **High Card**

- A hand where no other classification applies.
- The value of the hand is determined by the highest card (e.g., `A` is higher than `K`).

**Example:**

```
Input: [['2', 'H'], ['5', 'D'], ['9', 'S'], ['J', 'C'], ['K', 'H']]
Output: "High Card"
```

### 2. **One Pair**

- A hand with exactly two cards of the same rank.

**Example:**

```
Input: [['4', 'H'], ['4', 'D'], ['7', 'S'], ['9', 'C'], ['K', 'H']]
Output: "One Pair"
```

### 3. **Two Pair**

- A hand with two different pairs of cards.

**Example:**

```
Input: [['3', 'H'], ['3', 'S'], ['8', 'D'], ['8', 'C'], ['J', 'H']]
Output: "Two Pair"
```

### 4. **Three of a Kind**

- A hand with three cards of the same rank.

**Example:**

```
Input: [['6', 'H'], ['6', 'D'], ['6', 'S'], ['9', 'C'], ['Q', 'H']]
Output: "Three of a Kind"
```

### 5. **Straight**

- A hand with 5 consecutive cards of any suit.

**Example:**

```
Input: [['5', 'H'], ['6', 'D'], ['7', 'S'], ['8', 'C'], ['9', 'H']]
Output: "Straight"
```

### 6. **Flush**

- A hand with all 5 cards of the same suit.

**Example:**

```
Input: [['2', 'H'], ['7', 'H'], ['10', 'H'], ['Q', 'H'], ['K', 'H']]
Output: "Flush"
```

### 7. **Full House**

- A hand with three cards of one rank and two cards of another rank.

**Example:**

```
Input: [['3', 'D'], ['3', 'H'], ['3', 'S'], ['9', 'C'], ['9', 'H']]
Output: "Full House"
```

### 8. **Four of a Kind**

- A hand with four cards of the same rank.

**Example:**

```
Input: [['J', 'H'], ['J', 'D'], ['J', 'S'], ['J', 'C'], ['7', 'H']]
Output: "Four of a Kind"
```

### 9. **Straight Flush**

- A hand with 5 consecutive cards of the same suit.

**Example:**

```
Input: [['6', 'S'], ['7', 'S'], ['8', 'S'], ['9', 'S'], ['10', 'S']]
Output: "Straight Flush"
```

### 10. **Royal Flush**

- A hand with the highest 5 consecutive cards (`10`, `J`, `Q`, `K`, `A`) all of the same suit.

**Example:**

```
Input: [['10', 'H'], ['J', 'H'], ['Q', 'H'], ['K', 'H'], ['A', 'H']]
Output: "Royal Flush"
```

---

## Function Signature

```javascript
const classifyPokerHand = (hand) => {
  // Your implementation here
};
```

---

## Test Inputs

Here are some test inputs you can use to verify your implementation:

```javascript
// High Card
[
  ["2", "H"],
  ["5", "D"],
  ["9", "S"],
  ["J", "C"],
  ["K", "H"],
][
  // One Pair
  (["4", "H"], ["4", "D"], ["7", "S"], ["9", "C"], ["K", "H"])
][
  // Two Pair
  (["3", "H"], ["3", "S"], ["8", "D"], ["8", "C"], ["J", "H"])
][
  // Three of a Kind
  (["6", "H"], ["6", "D"], ["6", "S"], ["9", "C"], ["Q", "H"])
][
  // Straight
  (["5", "H"], ["6", "D"], ["7", "S"], ["8", "C"], ["9", "H"])
][
  // Flush
  (["2", "H"], ["7", "H"], ["10", "H"], ["Q", "H"], ["K", "H"])
][
  // Full House
  (["3", "D"], ["3", "H"], ["3", "S"], ["9", "C"], ["9", "H"])
][
  // Four of a Kind
  (["J", "H"], ["J", "D"], ["J", "S"], ["J", "C"], ["7", "H"])
][
  // Straight Flush
  (["6", "S"], ["7", "S"], ["8", "S"], ["9", "S"], ["10", "S"])
][
  // Royal Flush
  (["10", "H"], ["J", "H"], ["Q", "H"], ["K", "H"], ["A", "H"])
];
```

---

## Guidelines

Assume the input will always be valid and consist of exactly 5 cards.

---

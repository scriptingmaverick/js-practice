class Lsystem {
  constructor({ axiom, rules, iterations }) {
    this.sentence = axiom;
    this.rules = rules;
    this.iterations = iterations;
    this.generateSentence();
  }

  iterateOver() {
    let next = "";
    for (const ch of this.sentence) {
      next += this.rules[ch] || ch;
    }

    this.sentence = next;
  }

  generateSentence() {
    for (let i = 0; i < this.iterations; i++) {
      this.iterateOver();
    }
  }

  *getNextElem() {
    for (const el of this.sentence) yield el;
  }
}

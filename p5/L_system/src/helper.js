class Lsystem {
  constructor({ axiom, rules, iterations }) {
    this.sentence = axiom;
    this.rules = rules;
    this.iterations = iterations;
    this.generateSentence();
  }
  chooseRule(ruleSet) {
    const total = ruleSet.reduce((sum, r) => sum + r.weight, 0);
    let r = random(total);

    for (const option of ruleSet) {
      r -= option.weight;
      if (r <= 0) return option.rule;
    }
  }

  iterateOver() {
    let next = "";

    for (const ch of this.sentence) {
      const rule = this.rules[ch];

      if (!rule) {
        next += ch;
      } else if (typeof rule === "string") {
        next += rule;
      } else if (Array.isArray(rule)) {
        next += this.chooseRule(rule);
      }
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

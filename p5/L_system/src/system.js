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

  format(ch, rule) {
    console.log(ch, rule);
  }

  joiner(str) {
    return [...str.split(/\([^\)]+\)/g)].join("");
  }

  matcher(str) {
    return [...str.matchAll(/[A-Z]\([^\)]+/g)]
      .map((x) => x[0].split("("))
      .map((x) => {
        const obj = {};
        obj[x[0]] = x[1];
        return obj;
      });
  }
    iterateOver() {
    let next = "";
    const sentence = this.matcher(this.sentence);
    const splits = this.joiner(this.sentence);
    console.log({ sentence, splits });

    for (const ch of this.sentence) {
      const rule = this.rules[ch];
      if (!rule) {
        next += ch;
      } else if (typeof rule === "string") {
        next += this.format(rule);
      } else if (Array.isArray(rule)) {
        next += this.format(ch, this.chooseRule(rule));
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

const tule = {
  name: "Parametric Basic Growth",
  axiom: "F(10)",
  iterations: 4,
  angle: 25,
  step: 1,
  rules: {
    F: "F(l*0.9)[+F(l*0.6)][-F(l*0.6)]",
  },
};

const sys = new Lsystem(tule);

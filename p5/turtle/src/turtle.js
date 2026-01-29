// @ts-nocheck

class Turtle {
  #unitRadian = PI / 180;
  #pos;
  #theta;
  #delta;
  #prevState;
  #angle;
  #reduceFactor;

  constructor(angle, x, y) {
    this.#pos = createVector(x, y);
    this.#theta = -HALF_PI;
    this.#delta = 7;
    this.#prevState = [[this.#pos.x, this.#pos.y]];
    this.#angle = angle;
    this.#reduceFactor = 0.9;
    this.c = 0
    this.lTurtle = {
      "F": (grammar) => this.move(grammar),
      "+": () => this.heading(this.#angle),
      "-": () => this.heading(-this.#angle),
      "[": () => this.saveCheckPoint(),
      "]": () => this.restoreCheckPoint(),
      "X": () => {},
      "Y": () => {},
    };
  }

  lMovement(grammar) {
    for (const el of grammar) {
      this.c+=1
      this.lTurtle[el](grammar);
    }
  }

  move(grammar) {
    const prev = [this.#pos.x, this.#pos.y];
    this.#pos.y += this.#delta * Math.sin(this.#theta) * this.#reduceFactor;
    this.#pos.x += this.#delta * Math.cos(this.#theta) * this.#reduceFactor;
    // this.#reduceFactor = Math.abs(this.#reduceFactor - 0.001);

    // strokeWeight(grammar.length -  this.c);
    line(...prev, this.#pos.x, this.#pos.y);
  }

  heading(angle) {
    this.#theta += angle * this.#unitRadian;
  }

  getColor() {
    return [random(0, 255), random(0, 255), random(0, 255)];
  }

  saveCheckPoint() {
    stroke(...this.getColor());
    this.#prevState.push([this.#pos.x, this.#pos.y]);
  }

  restoreCheckPoint() {
    stroke(...this.getColor());
    [this.#pos.x, this.#pos.y] = this.#prevState.pop();
  }
}

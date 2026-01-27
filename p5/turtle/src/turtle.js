// @ts-nocheck

class Turtle {
  #unitRadian = PI / 180;
  #pos;
  #theta;
  #delta;
  #prevState;
  constructor() {
    this.#pos = createVector(width / 2, height / 2);
    this.#theta = -HALF_PI;
    this.#delta = 20;
    this.#prevState = [[this.#pos.x, this.#pos.y]];
  }

  move() {
    const prev = [this.#pos.x, this.#pos.y];
    this.#pos.y += this.#delta * Math.sin(this.#theta);
    this.#pos.x += this.#delta * Math.cos(this.#theta);

    line(...prev, this.#pos.x, this.#pos.y);
  }

  heading(angle) {
    this.#theta += angle * this.#unitRadian;
  }

  saveCheckPoint() {
    this.#prevState.push([this.#pos.x, this.#pos.y]);
  }

  restoreCheckPoint() {
    [this.#pos.x, this.#pos.y] = this.#prevState.pop();
  }
}

const lTurtle = {
  "F": (turtle) => turtle.move(),
  "+": (turtle, angle) => turtle.heading(angle),
  "-": (turtle, angle) => turtle.heading(-angle),
  "[": (turtle) => turtle.saveCheckPoint(),
  "]": (turtle) => turtle.restoreCheckPoint(),
};

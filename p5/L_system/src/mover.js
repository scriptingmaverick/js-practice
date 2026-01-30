class Mover {
  constructor(x, y, angle) {
    this.theta = -HALF_PI;
    this.delta = 15;
    this.pos = createVector(x, y);
    this.prev = this.pos.copy();
    this.states = [];
    this.turn = (angle * PI) / 180;

    this.commands = {
      F: this.move.bind(this),
      "+": this.rotate.bind(this, +1),
      "-": this.rotate.bind(this, -1),
      "[": this.store.bind(this),
      "]": this.rollBack.bind(this),
    };
  }

  lMovements(sentence) {
    for (const el of sentence) {
      this.commands[el]?.();
    }
  }

  randomColor() {
    return [random(0, 123), random(0, 123), random(0, 123)];
  }

  move() {
    this.prev = this.pos.copy();

    stroke(...this.randomColor());
    const step = p5.Vector.fromAngle(this.theta).setMag(this.delta);
    this.pos.add(step);

    line(this.prev.x, this.prev.y, this.pos.x, this.pos.y);
  }

  rotate(direction) {
    this.theta += direction * this.turn;
  }

  store() {
    this.states.push({
      pos: this.pos.copy(),
      prev: this.prev.copy(),
      theta: this.theta,
    });
  }

  rollBack() {
    const { pos, prev, theta } = this.states.pop();
    this.pos = pos;
    this.prev = prev;
    this.theta = theta;
  }
}

class Turtle  {
  constructor(x, y, step, angle) {
    this.theta = -HALF_PI;
    this.delta = step * 1.5;
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

    this.color = this.randomColor();
  }

  randomColor() {
    return [random(0, 123), random(0, 123), random(0, 123)];
  }

  move() {
    stroke(...this.color);
    this.prev = this.pos.copy();
    strokeWeight(this.delta * 0.2);
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
      delta: this.delta,
      color: this.color,
    });

    this.color = this.randomColor();
    this.delta = max(this.delta - 0.6, 0.5);
  }

  rollBack() {
    const { pos, prev, theta, delta, color } = this.states.pop();
    this.pos = pos;
    this.prev = prev;
    this.theta = theta;
    this.delta = delta;
    this.color = color;
  }
}

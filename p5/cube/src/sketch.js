/// <reference types="p5/global"/>
// @ts-nocheck

const projectPoint = (p, screenZ = 700) => {
  console.log(p.x, screenZ);

  const pX = screenZ * p.x / p.z;
  const pY = screenZ * p.y / p.z;
  return createVector(pX, pY);
};

class Cube {
  constructor(x, y, z, h, w, d) {
    this.centre = createVector(x, y, z);
    this.h = h;
    this.w = w;
    this.d = d;

    this.vertices = this.createVertices();
    this.faces = this.createFaces();
  }

  createVertices() {
    const [w2, h2, d2] = [this.w / 2, this.h / 2, this.d / 2];
    const p1 = createVector(-w2, -h2, -d2);
    const p2 = createVector(-w2, +h2, -d2);
    const p3 = createVector(+w2, +h2, -d2);
    const p4 = createVector(+w2, -h2, -d2);
    const p5 = createVector(+w2, -h2, +d2);
    const p6 = createVector(+w2, +h2, +d2);
    const p7 = createVector(-w2, +h2, +d2);
    const p8 = createVector(-w2, -h2, +d2);
    return [p1, p2, p3, p4, p5, p6, p7, p8];
  }

  createFaces() {
    const [p1, p2, p3, p4, p5, p6, p7, p8] = this.vertices;
    const f1 = [p1, p2, p3, p4]; //FRONT
    const f2 = [p5, p6, p7, p8]; //BACk
    const f3 = [p1, p4, p5, p8]; //TOP
    const f4 = [p2, p3, p6, p7]; //BOTTOM
    const f5 = [p1, p8, p7, p2]; //LEFT
    const f6 = [p4, p3, p6, p5]; //RIGHT

    return [f1, f2, f3, f4, f5, f6];
  }

  getWorldPoints() {
    return this.faces.map((face) => {
      return face.map((p) => {
        return p5.Vector.add(p, this.centre);
      });
    });
  }
}

let cube;

const drawShapes = (shapes) => {
  shapes.forEach((shape) =>
    shape.getWorldPoints().forEach((vertices) => {
  
      vertices.forEach((vert) => {
        const pro = projectPoint(vert);
        fill(255, 0, 0);
        circle(pro.x, pro.y , 10);
      });
    })
  );
};
function setup() {
  createCanvas(windowWidth, windowHeight);
  cube = new Cube(0, 0, 800, 100, 100, 100);
}

function draw() {
  background(127, 127, 127);
  translate(width / 2, height / 2);
  // fill(255, 0, 0);
  drawShapes([cube]);
  // circle(0, 0, 100);
  noLoop();
}

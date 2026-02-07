import { distBtw, drawAt } from "../../../utils/helper.js";


const drawAline = (point1, point2) => {
  const [topPoint, lowerPoint] =
    point1.y > point2.y ? [point1, point2] : [point2, point1];

  const connPoint = { y: lowerPoint.y, x: topPoint.x };

  const oppSideLength = distBtw(topPoint, connPoint);
  const adjSideLength = distBtw(connPoint, lowerPoint);

  const hypotenuse = Math.round(
    Math.sqrt(Math.pow(oppSideLength, 2) + Math.pow(adjSideLength, 2)),
  );

  let { x, y } = lowerPoint;
  y = +y;
  x = +x;
  while (+y < +topPoint.y) {
    const sinTheta = adjSideLength / hypotenuse;
    const cosTheta = oppSideLength / hypotenuse;

    x += sinTheta;
    y += cosTheta;

    drawAt(Math.round(+x), Math.round(+y));

    // console.log({ x, y });
  }
};

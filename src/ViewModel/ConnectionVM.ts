import { line, curveBasis } from "d3-shape";
export interface Point2d {
    x: number;
    y: number;
}

export const calculateCurve = (from: Point2d, to: Point2d) => {
    const length = to.x - from.x;
    const thirdLength = length / 3;
    const curve = line().curve(curveBasis)([
        [from.x, from.y],
        [from.x + thirdLength, from.y],
        [from.x + thirdLength * 2, to.y],
        [to.x, to.y],
    ]);
    return curve;
};

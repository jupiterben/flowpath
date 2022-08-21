import { line, curveBasis } from "d3-shape";
import { Point2d } from "~Model/FlowPath";
import { IOPortVM } from './FPNodeVM';

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

export class ConnectionVM {
    from?: IOPortVM ;
    to?: IOPortVM | Point2d;
    constructor(from?: IOPortVM , to?: IOPortVM | Point2d) {
        this.from = from;
        this.to = to;
    }

}
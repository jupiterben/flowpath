import { makeAutoObservable } from "mobx";
import { FPProcessNode, FPResource } from "./FPNode";

export class FPStage {
    center: Point2d = { x: 0, y: 0 };
    scale: number = 0.5;
}
export class FlowPath {
    stage: FPStage = new FPStage();
    nodes: FPProcessNode[] = [];
    resources: FPResource[] = [];
    constructor() {
        makeAutoObservable(this);
    }
    createNode() {
        var newNode = new FPProcessNode();
        this.nodes.push(newNode);
    }
}

import { makeAutoObservable } from "mobx";
import { FPProcessNode, FPResource } from "./FPNode";

export class FPStage {
    centerX: number = 0;
    cetnerY: number = 0;
    scale: number = 1;
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

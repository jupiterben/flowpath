import { FPProcessNode, FPResource } from "./FPNode";
import { immerable } from "immer";
import { Store } from '../Common/Store';

export interface Point2d {
    x: number;
    y: number;
}

export class FPStage {
    [immerable] = true;
    center: Point2d = { x: 0, y: 0 };
    scale: number = 1;
}


export class FlowPath {
    [immerable] = true;
    stage: FPStage = new FPStage();
    nodes: FPProcessNode[] = [];
    resources: FPResource[] = [];
}

export class FlowPathDoc extends Store<FlowPath> {
    constructor() { super(new FlowPath()) }
    createNode() {
        this.changeState(draft => {
            draft.nodes.push(new FPProcessNode());
        });
    }
}

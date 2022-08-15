import { makeAutoObservable } from "mobx";
import { v4 } from "uuid";

export class FPResource {
    uid: string = `res_${v4()}`;
    meta: any = {};
    lastModified: string = ""; //最后修改时间
}

export enum IOPortType {
    Input = "input",
    Output = "output",
}

export class IOPort {
    uid: string = `port_${v4()}`;
    res?: FPResource;
}
//流程节点
export class FPProcessNode {
    uid: string = `node_${v4()}`;
    name: string = "Node";
    x: number = 0;
    y: number = 0;
    inputs: IOPort[] = [];
    outputs: IOPort[] = [];
    constructor() {
        this.inputs.push(new IOPort());
        this.outputs.push(new IOPort());
        makeAutoObservable(this);
    }
}

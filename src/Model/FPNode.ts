import { v4 } from "uuid"

export class FPResource {
    uid: string = `res_${v4()}`;
    meta: any = {};
    lastModified: string = ""; //最后修改时间
}

//流程节点
export class FPProcessNode {
    uid: string = `node_${v4()}`;
    inputs: FPResource[] = [];
    outputs: FPResource[] = [];
    constructor() {
    }
}
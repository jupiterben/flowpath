import { makeAutoObservable } from 'mobx';
import FPNode from './FPNode';

type ResourceID = string;
type NodeID = string;

//流程资源数据
interface FlowResource {
    uid: ResourceID;
    url: string;
    status: string; //状态 
    iter: string;  //迭代 
    lastModified: string; //最后修改时间
}

//流程节点内部数据
interface FlowNodeLayoutData {
    x: number;
    y: number;
    width: number;
    height: number;
}
//流程工作节点数据
interface FlowProcessNodeData {
    version: number; //data version
    uid: NodeID;
    name: string;
    desc: string;
    assignedTo: string[];
    inputs: ResourceID | null[];  //
    outputs: ResourceID | null[];
    layout: FlowNodeLayoutData;
}

interface FlowPathData {
    version: number; //data version
    content: {
        nodes: FlowProcessNodeData[],
        resources: FlowResource[],
    };
}

//流程节点
class FlowProcessNode extends FPNode {
    private _data: FlowProcessNodeData;
    constructor(data: FlowProcessNodeData) {
        super();
        this._data = data;
    }
}

export class Stage {

}
export class FlowPath {
    stage: Stage = new Stage();
    nodes: FlowProcessNode[] = [];
    constructor() {
        makeAutoObservable(this);
    }
    createNode() {
        var newNode = new FlowProcessNode({
            version: 1,
            uid: '123',
            name: 'node1',
            desc: 'node1 desc',
            assignedTo: [],
            inputs: [],
            outputs: [],
            layout: {
                x: 0,
                y: 0,
                width: 0,
                height: 0,
            }
        });
        this.nodes.push(newNode);
    }
}
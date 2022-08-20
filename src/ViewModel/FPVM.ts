import { makeAutoObservable } from 'mobx';
import { FlowPath } from '~Model/FlowPath';
import { ConnectionVM } from './ConnectionVM';
import { FPNodeVM } from './FPNodeVM';
import FPStageVM from './FPStageVM';

export default class FPVM {
    model: FlowPath;
    //child vm
    height = 600;
    stageVM: FPStageVM;

    _nodeVMMap = new Map<string, FPNodeVM>();
    _connectionVMMap = new Map<string, ConnectionVM>();

    constructor(model: FlowPath) {
        this.model = model;
        this.stageVM = new FPStageVM(this.model.stage);
        makeAutoObservable(this);
    }

    get nodeVMs() {
        return this.model.nodes.map(n => {
            if (!this._nodeVMMap.has(n.uid)) {
                this._nodeVMMap.set(n.uid, new FPNodeVM(n));
            }
            return this._nodeVMMap.get(n.uid)!;
        });
    }


}
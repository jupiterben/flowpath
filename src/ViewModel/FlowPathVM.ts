import { makeAutoObservable, observe } from "mobx";
import { v4 } from 'uuid';
import { FlowPathDoc, FlowPath, FPStage } from "~Model/FlowPath";
import { FPProcessNode } from "../Model/FPNode";
import { ConnectionVM } from "./ConnectionVM";
import { FPNodeVM } from "./FPNodeVM";
import FPStageVM from "./FPStageVM";

class VMComponent<InputT, OutPutT> {
    private _inputs?: InputT;
    output?: OutPutT;
    constructor(private _updater: (input: InputT, preOutput?: OutPutT) => OutPutT) {
        makeAutoObservable(this);
    }
    update(input: InputT) {
        if (this._inputs === input) return;
        this.output = this._updater(input, this.output);
    }
}


export default class FlowPathVM {
    height = 800;

    stageComp: VMComponent<FPStage, FPStageVM>;
    nodesComp: VMComponent<FPProcessNode[], Map<string, FPNodeVM>>;

    static updateNodes(nodes: FPProcessNode[], oldVMs?: Map<string, FPNodeVM>) {
        return nodes.reduce((ret, item) => {
            let vm = oldVMs?.get(item.uid)! as FPNodeVM;
            if (!vm) {
                vm = new FPNodeVM(item);
            }
            return ret.set(item.uid, vm);
        }, new Map<string, FPNodeVM>());
    }

    constructor(model: FlowPathDoc) {
        this.stageComp = new VMComponent((stage: FPStage, oldVM?: FPStageVM) => {
            return oldVM || new FPStageVM();
        });
        this.nodesComp = new VMComponent(FlowPathVM.updateNodes);
        this.update(model.state);
        observe(model, "state", (change) => this.update(change.newValue as FlowPath), false);
        makeAutoObservable(this);
    }

    update(state: FlowPath) {
        this.stageComp.update(state.stage);
        this.nodesComp.update(state.nodes);
    }

    get stage() {
        return this.stageComp.output;
    }
    get nodes() {
        return Array.from(this.nodesComp.output!.values());
    }
}

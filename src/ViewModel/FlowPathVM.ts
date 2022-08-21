import { makeAutoObservable, observe } from "mobx";
import { FlowPathDoc, FlowPathStore } from "~Model/FlowPath";
import { FPProcessNode } from "~Model/FPNode";
import { ConnectionVM } from "./ConnectionVM";
import { FPNodeVM } from "./FPNodeVM";
import FPStageVM from "./FPStageVM";

export default class FlowPathVM {
    //child vm
    height = 600;
    stageVM?: FPStageVM;
    model: FlowPathDoc;

    _nodeVMMap = new Map<FPProcessNode, FPNodeVM>();
    _connectionVMMap = new Map<FPProcessNode, ConnectionVM>();

    constructor(model: FlowPathDoc) {
        this.model = model;
        makeAutoObservable(this);
        this.refresh(model.state);
        observe(
            model,
            "state",
            (change) => {
                this.refresh(model.state);
            },
            false
        );
    }

    createNode() {
        this.model.state.createNode();
        this.model.commit();
    }

    refresh(state: FlowPathStore) {
        if (this.stageVM?.model != state.stage) {
            this.stageVM = new FPStageVM(state.stage);
        }
        this._resfreshNodes(state);
    }

    private _resfreshNodes(state: FlowPathStore) {
        let oldInputs = this._nodeVMMap;
        this._nodeVMMap = state.nodes.reduce((ret, item) => {
            let vm = oldInputs.get(item);
            if (!vm) {
                vm = new FPNodeVM(item);
            }
            return ret.set(item, vm);
        }, new Map<FPProcessNode, FPNodeVM>());
    }

    get nodeVMs() {
        return Array.from(this._nodeVMMap.values());
    }
}

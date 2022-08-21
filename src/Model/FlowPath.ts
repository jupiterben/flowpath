import { FPProcessNode, FPResource } from "./FPNode";
import { createDraft, Draft, finishDraft, immerable } from "immer";
import { makeAutoObservable, makeObservable, observable } from "mobx";
import { UndoSystem } from "./UndoSystem";

export interface Point2d {
    x: number;
    y: number;
}

export class FPStage {
    [immerable] = true;
    center: Point2d = { x: 0, y: 0 };
    scale: number = 1;
}

export class FlowPathStore {
    [immerable] = true;
    stage: FPStage = new FPStage();
    nodes: FPProcessNode[] = [];
    resources: FPResource[] = [];
    createNode() {
        this.nodes.push(new FPProcessNode());
    }
}

export class FlowPathDoc {
    private _undoSys: UndoSystem<FlowPathStore>;
    state: Draft<FlowPathStore>;

    constructor() {
        const store = new FlowPathStore();
        this.state = createDraft(store);
        this._undoSys = new UndoSystem(store);
        makeObservable(this, {
            state: observable,
        });
    }

    commit(desc?: string) {
        const store = finishDraft(this.state);
        this._undoSys.commit(store, desc);
        this.state = createDraft(store);
        return this._undoSys.currentStore;
    }

    undo() {
        if (this._undoSys.undo()) {
            this.state = createDraft(this._undoSys.currentStore);
        }
        return this._undoSys.currentStore;
    }
    redo() {
        if (this._undoSys.redo()) {
            this.state = createDraft(this._undoSys.currentStore);
        }
        return this._undoSys.currentStore;
    }
}

import produce from 'immer';
import { WritableDraft } from 'immer/dist/internal';
import { makeObservable, observable } from 'mobx';
import { UndoSystem } from './UndoSystem';

export class Store<T>{
    private _undoSys: UndoSystem<T>;
    state: T;
    constructor(initData: T) {
        this.state = initData
        this._undoSys = new UndoSystem(this.state);
        makeObservable(this, {
            state: observable,
        });
    }
    changeState(recipe: (draft: WritableDraft<T>) => void) {
        this.state = produce(this.state, recipe);
    }

    commit(desc?: string) {
        this._undoSys.commit(this.state, desc);
    }

    undo() {
        if (this._undoSys.undo()) {
            this.state = this._undoSys.currentStore;
            return true;
        }
        return false;
    }
    redo() {
        if (this._undoSys.redo()) {
            this.state = this._undoSys.currentStore;
            return true;
        }
        return false;
    }
}

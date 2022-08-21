class Commit<T> {
    readonly time: Date;
    readonly pre?: Commit<T>;
    readonly store: T;
    readonly desc?: string;
    constructor(store: T, pre?: Commit<T>, desc?: string) {
        this.time = new Date();
        this.store = store;
        this.pre = pre;
    }
}

class Branch<T> {
    head: Commit<T>;
    name: string;
    readonly time: Date;
    constructor(name: string, head: Commit<T>) {
        this.name = name;
        this.head = head;
        this.time = new Date();
    }
}

export class UndoSystem<T> {
    private _branchs = new Array<Branch<T>>();
    private _currentBranch: Branch<T>;
    private _currentCommit: Commit<T>;

    get currentHead() {
        return this._currentBranch.head;
    }
    private set currentHead(value: Commit<T>) {
        this._currentBranch.head = value;
    }
    get currentStore() {
        return this._currentCommit.store;
    }
    constructor(store: T) {
        let commit = new Commit(store, undefined, "init");
        this._currentBranch = new Branch("master", commit);
        this._branchs.push(this._currentBranch);
        this._currentCommit = commit;
    }

    canUndo() {
        return !!this._currentCommit.pre;
    }
    undo() {
        if (this._currentCommit.pre) {
            this._currentCommit = this._currentCommit.pre!;
            return true;
        }
        return false;
    }

    private get nextCommit() {
        let itr: Commit<T> | undefined = this.currentHead;
        if (itr === this._currentCommit) return null;
        while (itr) {
            if (itr.pre === this._currentCommit) {
                return itr;
            }
            itr = itr.pre;
        }
        return null;
    }
    canRedo() {
        return !!this.nextCommit;
    }
    redo() {
        let next = this.nextCommit;
        if (next) {
            this._currentCommit = next;
            return true;
        }
        return false;
    }

    commit(store: T, desc?: string) {
        if (this._currentCommit.store === store) return;
        let commit = new Commit(store, this._currentCommit, desc);
        this._currentCommit = commit;
        this.currentHead = commit;
    }

    createBranch(name: string) {
        const branch = new Branch(name, this.currentHead);
        this._branchs.push(branch);
        return branch;
    }

    switchBranch(name: string) {}
}

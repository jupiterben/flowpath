//git style undo redo
class Commit<T> {
    readonly time: Date = new Date();
    constructor(
        public store: T,
        public pre?: Commit<T>,
        public desc?: string
    ) {}
}

class Branch<T> {
    head: Commit<T>;
    from: Commit<T>;
    readonly time: Date = new Date();
    constructor(public name: string, commit: Commit<T>) {
        this.from = commit;
        this.head = commit;
    }
}

export class UndoSystem<T> {
    private _branches = new Array<Branch<T>>();
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
        this._branches.push(this._currentBranch);
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
        if (this._currentCommit.store === store) return false;
        let commit = new Commit(store, this._currentCommit, desc);
        this._currentCommit = commit;
        this.currentHead = commit;
        return true;
    }

    private _createBranch(name: string) {
        const branch = new Branch(name, this.currentHead);
        this._branches.push(branch);
        return branch;
    }

    findBranch(name: string) {
        return this._branches.find((branch) => branch.name === name);
    }
    createBranch(name: string) {
        if (this.findBranch(name)) {
            return false;
        }
        return this._createBranch(name);
    }

    switchToBranch(name: string, create: boolean) {
        let branch = this.findBranch(name);
        if (!branch && create) {
            branch = this._createBranch(name);
        }
        if (!branch) return false;
        this._currentBranch = branch;
        this._currentCommit = branch!.head;
        return true;
    }
}

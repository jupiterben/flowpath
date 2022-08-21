import { makeAutoObservable } from "mobx";
import { Point2d } from "~Model/FlowPath";
import { FPProcessNode, IOPort, IOPortType } from "../Model/FPNode";

export class IOPortVM {
    model: IOPort;
    portType: IOPortType;
    position?: Point2d;
    constructor(model: IOPort, portType: IOPortType) {
        this.model = model;
        this.portType = portType;
        makeAutoObservable(this);
    }
    get uid() {
        return this.model.uid;
    }
    get label() {
        return this.model.res?.meta.label || "";
    }
    get name() {
        return this.label;
    }
    get color() {
        return this.portType == IOPortType.Input ? "red" : "blue";
    }
}

export class FPNodeVM {
    model: FPProcessNode;
    constructor(model: FPProcessNode) {
        this.model = model;
        this._refreshInputs();
        this._refreshOutputs();
        makeAutoObservable(this);
    }
    width: number = 60;
    height: number = 60;
    x: number = 0;
    y: number = 0;

    _inputsVMMap = new Map<string, IOPortVM>();
    _outputsVMMap = new Map<string, IOPortVM>();

    private _refreshInputs() {
        let oldInputs = this._inputsVMMap;
        this._inputsVMMap = this.model.inputs.reduce((ret, item) => {
            let vm = oldInputs.get(item.uid);
            if (!vm) {
                vm = new IOPortVM(item, IOPortType.Input);
            }
            return ret.set(item.uid, vm);
        }, new Map<string, IOPortVM>());
    }
    private _refreshOutputs() {
        let oldOutputs = this._outputsVMMap;
        this._outputsVMMap = this.model.outputs.reduce((ret, item) => {
            let vm = oldOutputs.get(item.uid);
            if (!vm) {
                vm = new IOPortVM(item, IOPortType.Output);
            }
            return ret.set(item.uid, vm);
        }, new Map<string, IOPortVM>());
    }

    get label() {
        return this.model.name;
    }

    get uid() {
        return this.model.uid;
    }
    get inputs() {
        return Array.from(this._inputsVMMap.values());
    }
    get outputs() {
        return Array.from(this._outputsVMMap.values());
    }

    dragStartPos?: Point2d;
    onDragging = (mousePos: Point2d, offset?: Point2d) => {
        this.x = offset!.x + this.dragStartPos!.x;
        this.y = offset!.y + this.dragStartPos!.y;
    };
    onDragStart = (mousePos: Point2d, offset?: Point2d) => {
        this.dragStartPos = { x: this.x, y: this.y };
    };
    onDragEnd = (mousePos: Point2d, offset?: Point2d) => {
        this.dragStartPos = undefined;
    };
}

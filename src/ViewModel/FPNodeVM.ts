import { makeAutoObservable } from "mobx";
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
    get name() { return this.label; }
    get color() { return this.portType == IOPortType.Input ? "red" : "blue"; }
}

export class FPNodeVM {
    model: FPProcessNode;
    constructor(model: FPProcessNode) {
        this.model = model;
        makeAutoObservable(this);
    }
    width: number = 60;
    height: number = 60;
    x: number = 0;
    y: number = 0;

    _inputsVMMap = new Map<string, IOPortVM>();
    _outputsVMMap = new Map<string, IOPortVM>();

    get label() {
        return this.model.name;
    }

    get uid() {
        return this.model.uid;
    }
    get inputs() {
        return this.model.inputs.map((item) => {
            if (!this._inputsVMMap.has(item.uid)) {
                this._inputsVMMap.set(
                    item.uid,
                    new IOPortVM(item, IOPortType.Input)
                );
            }
            return this._inputsVMMap.get(item.uid)!;
        });
    }
    get outputs() {
        return this.model.outputs.map((item) => {
            if (!this._outputsVMMap.has(item.uid)) {
                this._outputsVMMap.set(
                    item.uid,
                    new IOPortVM(item, IOPortType.Output)
                );
            }
            return this._outputsVMMap.get(item.uid)!;
        });
    }

    dragStartPos?: Point2d;
    onDragging = (mousePos: Point2d, offset?: Point2d) => {
        this.x = offset!.x + this.dragStartPos!.x;
        this.y = offset!.y + this.dragStartPos!.y;
    }
    onDragStart = (mousePos: Point2d, offset?: Point2d) => {
        this.dragStartPos = { x: this.x, y: this.y };
    }
    onDragEnd = (mousePos: Point2d, offset?: Point2d) => {
        this.dragStartPos = undefined;
    }

}

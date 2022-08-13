import { makeAutoObservable } from 'mobx';
import { FPProcessNode } from '~Model/FPNode';

export default class FPNodeVM {
    model: FPProcessNode;
    constructor(model: FPProcessNode) {
        this.model = model;
        makeAutoObservable(this);
    }
    width: number = 60;
    height: number = 60;
    x: number = 0;
    y: number = 0;
    label: string = "Node";
    get uid() { return this.model.uid; }
    get inputs() { return this.model.inputs; }
    get outputs() { return this.model.outputs; }
}
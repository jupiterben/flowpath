import { makeAutoObservable } from 'mobx';
import FPNode from '~Model/FPNode';

export default class FPNodeVM {
    model: FPNode;
    constructor(model: FPNode) {
        this.model = model;
        makeAutoObservable(this);
    }
    width: number = 20;
    height: number = 60;
    x: number = 0;
    y: number = 0;
    label: string = "Node";
    get id() { return this.model.id; }
}
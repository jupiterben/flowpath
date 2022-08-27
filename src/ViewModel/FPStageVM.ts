import { makeAutoObservable } from 'mobx';
import { FPStage, Point2d } from '~Model/FlowPath';

export default class FPStageVM {
    scale = 1;
    center: Point2d = { x: 0, y: 0 };

    constructor() {
        makeAutoObservable(this);
    }

    update(model: FPStage) {
        const { x, y } = model.center;
        this.center = { x, y };
    }

    get translate() {
        return { x: this.center.x * this.scale, y: this.center.y * this.scale };
    }

    startCenter?: Point2d;
    onDragging = (mousePos: Point2d, offset?: Point2d) => {
        if (!this.startCenter || !offset) return;
        let offsetX = -offset.x / this.scale;
        let offsetY = -offset.y / this.scale;
        this.center = { x: offsetX + this.startCenter.x, y: offsetY + this.startCenter.y };
    }
    onDragStart = (mousePos: Point2d, offset?: Point2d) => {
        this.startCenter = this.center;
    }
    onDragEnd = (mousePos: Point2d, offset?: Point2d) => {
        this.startCenter = undefined;
    }

}
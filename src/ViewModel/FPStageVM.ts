import { makeAutoObservable } from 'mobx';
import { FPStage } from '~Model/FlowPath';

export default class FPStageVM {
    model: FPStage;
    translate: Point2d;

    constructor(model: FPStage) {
        this.model = model;
        this.translate = this._calTranslate();
        makeAutoObservable(this);
    }

    //model to px
    get scale() {
        return this.model.scale;
    }
    get center() {
        return this.model.center;
    }
    set center(value: Point2d) {
        this.model.center = value;
    }
    _calTranslate() {
        return { x: this.center.x * this.scale, y: this.center.y * this.scale };
    }

    oldCenter?: Point2d;
    onDragging = (mousePos: Point2d, offset?: Point2d) => {
        if (!this.oldCenter || !offset) return;
        let offsetX = -offset.x / this.scale;
        let offsetY = -offset.y / this.scale;
        this.center = { x: offsetX + this.oldCenter.x, y: offsetY + this.oldCenter.y };
        this.translate = this._calTranslate();
    }
    onDragStart = (mousePos: Point2d, offset?: Point2d) => {
        this.oldCenter = this.center;
    }
    onDragEnd = (mousePos: Point2d, offset?: Point2d) => {
        this.oldCenter = undefined;
    }

}
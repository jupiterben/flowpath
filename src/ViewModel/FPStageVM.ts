import { makeAutoObservable } from 'mobx';
import { Stage } from '~Model/FlowPath';

export default class FPStageVM {
    scale = 1;
    translate = {x:0, y:0};
    constructor(model:Stage) {
        makeAutoObservable(this);
    }
}
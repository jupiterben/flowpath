import React from "react";
import StageVM from '~ViewModel/FPStageVM';
import * as styles from "./FPStage.module.css";
import { observer } from "mobx-react-lite";
import Draggable from './Draggable';

interface Prop extends React.ComponentProps<"div"> {
    vm: StageVM;
}

const FPStageView = ({ vm, children }: Prop) => {
    var scale = vm.scale;
    var translate = vm.translate;
    const dragHandler = {
        onDragging: vm.onDragging,
        onDragStart: vm.onDragStart,
        onDragEnd: vm.onDragEnd
    };
    return (
        <Draggable className={styles.wrapper} dragHandler={dragHandler} >
            <div className={styles.transformWrapper} style={{ transform: `translate(${-translate.x}px, ${-translate.y}px)` }}            >
                <div className={styles.scaleWrapper} style={{ transform: `scale(${scale})` }}>
                    {children}
                </div>
            </div>
        </Draggable>
    )
}

export default observer(FPStageView);
import React from "react";
import * as styles from "./FPNode.module.css";
import { observer } from "mobx-react-lite";
import { FPNodeVM } from "~ViewModel/FPNodeVM";
import IoPortsView from "./IoPortsView";
import Draggable from './Draggable';

interface Prop {
    vm: FPNodeVM;
}
const FPNodeView = ({ vm }: Prop) => {
    var width = vm.width;
    var x = vm.x;
    var y = vm.y;
    var label = vm.label;
    const dragHandler = {
        onDragging: vm.onDragging,
        onDragStart: vm.onDragStart,
        onDragEnd: vm.onDragEnd
    };

    return (
        <Draggable className={styles.wrapper}
            style={{ width, transform: `translate(${x}px, ${y}px)` }}
            dragHandler={dragHandler}
        >
            <NodeHeader>{label}</NodeHeader>
            <IoPortsView
                nodeId={vm.uid}
                inputs={vm.inputs}
                outputs={vm.outputs}
            />
        </Draggable >
    );
};
export default observer(FPNodeView);

const NodeHeader = ({ children, className, ...props }: React.ComponentProps<'h2'>) => (
    <h2
        {...props}
        className={styles.label + (className ? ` ${className}` : "")}
    >
        {children}
    </h2>
)

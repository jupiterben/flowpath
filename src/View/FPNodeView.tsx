import React from "react";
import * as styles from "./FPNode.module.css";
import { observer } from "mobx-react-lite";
import { FPNodeVM } from "~ViewModel/FPNodeVM";
import IoPortView from "./IoPortsView";
import Draggable from "react-draggable";

interface Prop {
    vm: FPNodeVM;
}
const FPNodeView = ({ vm }: Prop) => {
    var width = vm.width;
    var x = vm.x;
    var y = vm.y;
    var label = vm.label;
    return (
        <Draggable>
            <div
                className={styles.wrapper}
                style={{ width, transform: `translate(${x}px, ${y}px)` }}
            >
                <NodeHeader>{label}</NodeHeader>
                <IoPortView
                    nodeId={vm.uid}
                    inputs={vm.inputs}
                    outputs={vm.outputs}
                />
            </div>
        </Draggable>
    );
};

interface HeaderProp {
    children: React.ReactNode;
    className?: string;
}
const NodeHeader = ({ children, className = "", ...props }: HeaderProp) => (
    <h2
        {...props}
        className={styles.label + (className ? ` ${className}` : "")}
    >
        {children}
    </h2>
);
export default observer(FPNodeView);

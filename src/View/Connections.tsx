import styles from "./Connections.css";
import React from "react";
import { calculateCurve } from "~ViewModel/ConnectionVM";
import { Point2d } from "~Model/FlowPath";

export const ConnectionsView = ({}) => {
    return <div className={styles.svgWrapper} />;
};

interface ConnectionProp {
    from: Point2d;
    to: Point2d;
    id: string;
    lineRef: any;
    outputNodeId: string;
    outputPortName: string;
    inputNodeId: string;
    inputPortName: string;
}

export const ConnectionView = ({
    from,
    to,
    id,
    lineRef,
    outputNodeId,
    outputPortName,
    inputNodeId,
    inputPortName,
}: ConnectionProp) => {
    const curve = calculateCurve(from, to)!;
    return (
        <svg className={styles.svg} data-flume-component="connection-svg">
            <path
                data-connection-id={id}
                data-output-node-id={outputNodeId}
                data-output-port-name={outputPortName}
                data-input-node-id={inputNodeId}
                data-input-port-name={inputPortName}
                data-flume-component="connection-path"
                stroke="rgb(185, 186, 189)"
                fill="none"
                strokeWidth={3}
                strokeLinecap="round"
                d={curve}
                ref={lineRef}
            />
        </svg>
    );
};

import React from "react";
import { observer } from "mobx-react-lite";
import styles from "./IoPorts.module.less";
import { IOPortVM } from "~ViewModel/FPNodeVM";

interface IOPortsProp {
    inputs: IOPortVM[];
    outputs: IOPortVM[];
    nodeId: string;
}
const IoPortsView = ({ inputs, outputs, nodeId }: IOPortsProp) => {
    return (
        <div className={styles.wrapper} data-flume-component="ports">
            {inputs.length ? (
                <div
                    className={styles.inputs}
                    data-flume-component="ports-inputs"
                >
                    {inputs.map((input) => (
                        <Input nodeId={nodeId} key={input.uid} name={input.name} color={input.color} label={input.label} />
                    ))}
                </div>
            ) : null}
            {!!outputs.length && (
                <div
                    className={styles.outputs}
                    data-flume-component="ports-outputs"
                >
                    {outputs.map((output) => (
                        <Output nodeId={nodeId} key={output.uid} name={output.name} color={output.color} label={output.label}/>
                    ))}
                </div>
            )}
        </div>
    );
};

export default observer(IoPortsView);

interface InputProp {
    label: string;
    name: string;
    nodeId: string;
    color: string;
}
const Input = ({ label, name, nodeId, color }: InputProp) => {
    const hidePort = false;
    const defaultLabel = "Input";
    const triggerRecalculation = () => {};
    return (
        <div
            data-flume-component="port-input"
            className={styles.transput}
            onDragStart={(e) => {
                e.preventDefault();
                e.stopPropagation();
            }}
        >
            {!hidePort ? (
                <Port                   
                    color={color}
                    name={name}
                    nodeId={nodeId}
                    isInput
                    triggerRecalculation={triggerRecalculation}
                />
            ) : null}
            <label
                data-flume-component="port-label"
                className={styles.portLabel}
            >
                {label || defaultLabel}
            </label>
        </div>
    );
};

interface OutputProp {
    label: string;
    name: string;
    nodeId: string;
    color: string;
}
const Output = ({ label, name, nodeId, color }: OutputProp) => {
    const defaultLabel = "Output";
    const triggerRecalculation = () => {};
    return (
        <div
            data-flume-component="port-output"
            className={styles.transput}
            data-controlless={true}
            onDragStart={(e) => {
                e.preventDefault();
                e.stopPropagation();
            }}
        >
            <label
                data-flume-component="port-label"
                className={styles.portLabel}
            >
                {label || defaultLabel}
            </label>
            <Port
                name={name}
                color={color}
                nodeId={nodeId}
                isInput={false}
                triggerRecalculation={triggerRecalculation}
            />
        </div>
    );
};

interface PortProp {
    isInput: boolean;
    name: string;
    nodeId: string;
    color: string;
    triggerRecalculation: () => void;
}
const Port = ({ isInput, nodeId, color, name }: PortProp) => {
    const port = React.useRef(null);

    return (
        <React.Fragment>
            <div
                style={{ zIndex: 999 }}
                className={styles.port}
                data-port-color={color}
                data-port-name={name}
                data-port-transput-type={isInput ? "input" : "output"}
                data-node-id={nodeId}
                data-flume-component="port-handle"
                onDragStart={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                }}
                ref={port}
            />
        </React.Fragment>
    );
};

import React from "react";
import { observer } from "mobx-react-lite";
import styles from "./IoPorts.module.less";
import FPNodeVM from '~ViewModel/FPNodeVM';
import { FPResource } from '~Model/FPNode';

interface Prop {
    inputs : FPResource,
    outputs,
}
const IoPorts = ({ inputs, outputs }: Prop) => {
    
    return (
        <div className={styles.wrapper} data-flume-component="ports">
            {inputs.length ? (
                <div className={styles.inputs} data-flume-component="ports-inputs">
                    {inputs.map(input => (
                        <Input
                            nodeId={nodeId}
                            key={input.uid}
                        />
                    ))}
                </div>
            ) : null}
            {!!resolvedOutputs.length && (
                <div className={styles.outputs} data-flume-component="ports-outputs">
                    {
                        resolvedOutputs.map(output => (
                            <Output
                                {...output}
                                nodeId={nodeId}
                                key={output.uid}
                            />
                        ))}
                </div>
            )}
        </div>
    );
}

export default observer(IoPorts);

interface InputProp {
    label: string;
    type: string;
    name: string;
    nodeId: string;
    color: string;
}
const Input = ({ label, type, name, nodeId, color }: InputProp) => {
    const hidePort = false;
    const defaultLabel = "Input";
    const triggerRecalculation = () => { };
    return (
        <div data-flume-component="port-input"
            className={styles.transput}
            onDragStart={e => {
                e.preventDefault();
                e.stopPropagation();
            }}>
            {!hidePort ? (
                <Port
                    type={type}
                    color={color}
                    name={name}
                    nodeId={nodeId}
                    isInput
                    triggerRecalculation={triggerRecalculation}
                />
            ) : null}
            <label data-flume-component="port-label" className={styles.portLabel}>{label || defaultLabel}</label>
        </div>
    )
}


interface OutputProp {
    label: string;
    type: string;
    name: string;
    nodeId: string;
    color: string;
}
const Output = ({ label, type, name, nodeId, color }: OutputProp) => {
    const defaultLabel = "Output";
    const triggerRecalculation = () => { };
    return (
        <div data-flume-component="port-output"
            className={styles.transput}
            data-controlless={true}
            onDragStart={e => {
                e.preventDefault();
                e.stopPropagation();
            }}
        >
            <label data-flume-component="port-label" className={styles.portLabel}>{label || defaultLabel}</label>
            <Port type={type}
                name={name}
                color={color}
                nodeId={nodeId}
                isInput={false}
                triggerRecalculation={triggerRecalculation}
            />
        </div>
    )
}

interface PortProp {
    isInput: boolean;
    type: string;
    name: string;
    nodeId: string;
    color: string;
    triggerRecalculation: () => void;
}
const Port = ({ isInput, type, nodeId, color, name }: PortProp) => {
    const port = React.useRef(null);

    return (
        <React.Fragment>
            <div style={{ zIndex: 999 }}
                className={styles.port}
                data-port-color={color}
                data-port-name={name}
                data-port-type={type}
                data-port-transput-type={isInput ? "input" : "output"}
                data-node-id={nodeId}
                data-flume-component="port-handle"
                onDragStart={e => {
                    e.preventDefault();
                    e.stopPropagation();
                }}
                ref={port}
            />
        </React.Fragment>
    )
}

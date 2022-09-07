import * as React from "react";
import { createRoot } from "react-dom/client";

import FlowPathVM from "~ViewModel/FlowPathVM";
import FPStageView from "./FPStageView";
import { observer } from "mobx-react-lite";
import FPNodeView from "./FPNodeView";
import { FPNodeVM } from "~ViewModel/FPNodeVM";
import { useParentSize } from '@cutting/use-get-parent-size';

interface Prop {
    vm: FlowPathVM;
}
const FPViewComponent = observer(({ vm }: Prop) => {
    const fullscreen: any = {
        position: "fixed",
        top: "0px",
        left: '0px',
        bottom: '0px',
        right: '0px'
    };
    const ref = React.useRef<HTMLDivElement>(null);
    const { width, height } = useParentSize(ref, { debounceDelay: 1 });
    return (
        <div ref={ref} style={fullscreen} >
            <FPStageView vm={vm.stage!} {...{ width, height }}>
                {vm.nodes.map((nodeVM: FPNodeVM) => (
                    <FPNodeView vm={nodeVM} key={nodeVM.uid} />
                ))}
            </FPStageView>
        </div>
    );
});


export class FlowPathView {
    constructor(private vm: FlowPathVM) { }
    render() {
        const container = document.getElementById("root");
        const root = createRoot(container!);
        root.render(<FPViewComponent vm={this.vm} />);
    }
}
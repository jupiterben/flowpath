import * as React from "react";
import { createRoot } from "react-dom/client";

import FlowPathVM from "~ViewModel/FlowPathVM";
import FPStageView from "./FPStageView";
import { observer } from "mobx-react-lite";
import FPNodeView from "./FPNodeView";
import { FPNodeVM } from "~ViewModel/FPNodeVM";

interface Prop {
    vm: FlowPathVM;
}
const FPViewComponent = observer(({ vm }: Prop) => {
    return (
        <div style={{ height: vm.height }}>
            <FPStageView vm={vm.stage!}>
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
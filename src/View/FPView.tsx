import React from "react";
import FlowPathVM from "~ViewModel/FlowPathVM";
import FPStageView from "./FPStageView";
import { observer } from "mobx-react-lite";
import FPNodeView from "./FPNodeView";
import { FPNodeVM } from "~ViewModel/FPNodeVM";

interface Prop {
    vm: FlowPathVM;
}
const FPView = ({ vm }: Prop) => {
    return (
        <div style={{ height: vm.height }}>
            <FPStageView vm={vm.stageVM!}>
                {vm.nodeVMs.map((nodeVM: FPNodeVM) => (
                    <FPNodeView vm={nodeVM} key={nodeVM.uid} />
                ))}
            </FPStageView>
        </div>
    );
};

export default observer(FPView);

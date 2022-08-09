import React from "react";
import FPVM from '~ViewModel/FPVM';
import FPStageView from './FPStageView';
import { observer } from "mobx-react-lite";
import FPNodeView from './FPNodeView';
import FPNodeVM from '~ViewModel/FPNodeVM';

interface Prop {
    vm: FPVM;
}
const FPView = ({ vm }: Prop) => {
    return (
        <div style={{ height: vm.height }}>
            <FPStageView vm={vm.stageVM} >
                <h2>{vm.nodeVMs.length}</h2>
                {
                    vm.nodeVMs.map((nodeVM: FPNodeVM) => (
                        <FPNodeView vm={nodeVM} key={nodeVM.id} />
                    ))
                }
            </FPStageView>
        </div>
    )
}

export default observer(FPView);
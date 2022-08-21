import * as React from "react";
import { createRoot } from "react-dom/client";
import FlowPathVM from './ViewModel/FlowPathVM';
import { FlowPathDoc } from './Model/FlowPath';
import FPView from './View/FPView';


class App {
    vm: FlowPathVM;
    constructor() {
        this.vm = new FlowPathVM(new FlowPathDoc());
    }
    Render() {
        const container = document.getElementById("root");
        const root = createRoot(container!);
        root.render(<FPView vm={this.vm} />);
        
        setInterval(() => {
            this.vm.createNode();
        },1000);
    }
}

var app = new App();
app.Render();

export default app;

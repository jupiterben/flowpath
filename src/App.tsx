import * as React from "react";
import { createRoot } from "react-dom/client";
import FPVM from './ViewModel/FPVM';
import { FlowPath } from './Model/FlowPath';
import FPView from './View/FPView';


class App {
    model: FlowPath;
    vm: FPVM;
    constructor() {
        this.model = new FlowPath();
        this.vm = new FPVM(this.model);
    }
    Render() {
        const container = document.getElementById("root");
        const root = createRoot(container!);
        root.render(<FPView vm={this.vm} />);
        
        setInterval(() => {
            this.model.createNode();
        },1000);
    }
}

var app = new App();
app.Render();

export default app;

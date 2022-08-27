import FlowPathVM from './ViewModel/FlowPathVM';
import { FlowPathDoc } from './Model/FlowPath';
import { FlowPathView } from './View/FPView';

declare global {
    var app: App;
}

class App {
    vm: FlowPathVM;
    doc: FlowPathDoc;
    view: FlowPathView;
    constructor() {
        this.doc = new FlowPathDoc();
        this.vm = new FlowPathVM(this.doc);
        this.view = new FlowPathView(this.vm);
    }
    start() {
        this.view.Render();
    }
}

globalThis.app = new App();
globalThis.app.start();
export default app;

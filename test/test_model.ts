import { FlowPathDoc } from "../src/Model/FlowPath";

let model = new FlowPathDoc();

model.state.createNode();
model.state.stage.center = { x: 1, y: 1 };

console.log(model.commit());

for (let i = 0; i < 100; i++) {
    model.state.createNode();
}

console.log(model.commit());

console.log(model.undo());

console.log(model.undo());

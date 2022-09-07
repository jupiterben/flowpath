import React, { useRef } from "react";
import StageVM from '~ViewModel/FPStageVM';
import { observer } from "mobx-react-lite";
import Draggable from './Draggable';
import { Stage, Layer, Rect, Text } from 'react-konva';
import Konva from 'konva';

interface Prop extends React.ComponentProps<"div"> {
    vm: StageVM;
    width: number;
    height: number;
}

// const FPStageView = ({ vm, children }: Prop) => {
//     var scale = vm.scale;
//     var translate = vm.translate;
//     const dragHandler = {
//         onDragging: vm.onDragging,
//         onDragStart: vm.onDragStart,
//         onDragEnd: vm.onDragEnd
//     };
//     return (
//         <Draggable className={styles.wrapper}
//             dragHandler={dragHandler}>
//             <div className={styles.transformWrapper} style={{ transform: `translate(${-translate.x}px, ${-translate.y}px)` }}>
//                 <div className={styles.scaleWrapper} style={{ transform: `scale(${scale})` }}>
//                     {children}
//                 </div>
//             </div>
//         </Draggable>
//     )
// }

class ColoredRect extends React.Component {
    state = {
        color: 'green'
    };
    handleClick = () => {
        this.setState({
            color: Konva.Util.getRandomColor()
        });
    };
    render() {
        return (
            <Rect
                x={20}
                y={20}
                width={50}
                height={50}
                fill={this.state.color}
                shadowBlur={5}
                onClick={this.handleClick}
            />
        );
    }
}



const FPStageView = ({ vm, children, width, height }: Prop) => {
    return (
        <Stage width={width} height={height}>
            <Layer>
                <ColoredRect />
            </Layer>
        </Stage>

    )
}
export default observer(FPStageView);
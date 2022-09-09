import React, { useEffect, useRef, useState } from "react";
import StageVM from '~ViewModel/FPStageVM';
import { observer } from "mobx-react-lite";
import Draggable from './Draggable';
import { Stage, Layer, Rect, Text, Image } from 'react-konva';
import useImage from 'use-image';

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

interface Rect {
    x: number;
    y: number;
    w: number;
    h: number;
}
interface GridProp {
    minStrip: number;
    maxStrip: number;
    drawAxis: boolean;
}

const InfGrid = (viewport: Rect, gridProp: GridProp) => {

}

const URLImage = (props: any) => {
    const [image, setImage] = useState<CanvasImageSource | undefined>(undefined);
    useEffect(() => {
        loadImage();
    }, [props.src]);

    function loadImage() {
        const image = new window.Image();
        image.src = props.src;
        image.onload = () => {
            setImage(image);
        };
    }
    return (
        <Image x={props.x} y={props.y} image={image} />
    );
}

const FPStageView = ({ vm, children, width, height }: Prop) => {
    const [image] = useImage("");
    return (
        <Stage width={width} height={height} >
            <Layer>
                <URLImage src="" />
                <Image image={image} y={100} />
            </Layer>
        </Stage>
    )
}
export default observer(FPStageView);


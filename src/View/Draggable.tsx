import React, { TouchEvent, MouseEvent } from "react";
import { Point2d } from "~ViewModel/ConnectionVM";

interface DraggableProp {
    children: React.ReactNode;
    onDragDelayStart: any;
    onDragStart: any;
    onDrag: any;
    onDragEnd: any;
    onMouseDown: any;
    onTouchStart: any;
    disabled: boolean;
    delay: number;
    innerRef: any;
}

export default ({
    children,
    onDragDelayStart,
    onDragStart,
    onDrag,
    onDragEnd,
    onMouseDown,
    onTouchStart,
    disabled,
    delay = 6,
    innerRef,
    ...rest
}: DraggableProp) => {
    let startCoordinates = React.useRef<Point2d | null>(null);
    let offset = React.useRef<Point2d | null>(null);
    let wrapper = React.useRef();

    const dragging = (e: globalThis.MouseEvent) => {
        if (onDrag) {
            onDrag(e);
        }
    };

    const stopDrag = (e: globalThis.MouseEvent) => {
        if (onDragEnd) {
            onDragEnd(e);
        }
        
        window.removeEventListener("mouseup", stopDrag);
        window.removeEventListener("mousemove", dragging);
    };

    const startDrag = (e: MouseEvent) => {` `
        if (onDragStart) {
            onDragStart(e);
        }
        window.addEventListener("mouseup", stopDrag);
        window.addEventListener("mousemove", dragging);
    };

    const checkDragDelay = (e: globalThis.TouchEvent & globalThis.MouseEvent) => {
        let x;
        let y;
        if ("ontouchstart" in window && e.touches) {
            x = e.touches[0].clientX;
            y = e.touches[0].clientY;
        } else {
            e.preventDefault();
            x = e.clientX;
            y = e.clientY;
        }
        let a = Math.abs(startCoordinates.current.x - x);
        let b = Math.abs(startCoordinates.current.y - y);
        let distance = Math.round(Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2)));
        let dragDistance = delay;
        if (distance >= dragDistance) {
            startDrag(e);
            endDragDelay();
        }
    };

    const endDragDelay = () => {
        document.removeEventListener("mouseup", endDragDelay);
        document.removeEventListener("mousemove", checkDragDelay);
        startCoordinates.current = null;
    };

    const startDragDelay = (e: globalThis.MouseEvent & globalThis.TouchEvent) => {
        if (onDragDelayStart) {
            onDragDelayStart(e);
        }
        e.stopPropagation();
        let x;
        let y;
        
        if ("ontouchstart" in window && e.touches) {
            x = e.touches[0].clientX;
            y = e.touches[0].clientY;
        } else {
            e.preventDefault();
            x = e.clientX;
            y = e.clientY;
        }
        startCoordinates.current = { x, y };
        document.addEventListener("mouseup", endDragDelay);
        document.addEventListener("mousemove", checkDragDelay);
    };

    return (
        <div
            onMouseDown={(e: MouseEvent<HTMLDivElement>) => {
                if (!disabled) {
                    startDragDelay(e);
                }
                if (onMouseDown) {
                    onMouseDown(e.clientX, e.clientY);
                }
            }}
            onTouchStart={(e: TouchEvent<HTMLDivElement>) => {
                if (!disabled) {
                    startDragDelay(e);
                }
                if (onTouchStart) {
                    onTouchStart();
                }
            }}
            onDragStart={(e:MouseEvent<HTMLDivElement>) => {
                e.preventDefault();
                e.stopPropagation();
            }}
            {...rest}
        >
            {children}
        </div>
    );
};

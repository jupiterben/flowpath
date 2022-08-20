import React, { TouchEvent, MouseEvent } from "react";
type MouseCallBack = (mousePos: Point2d, offset?: Point2d) => void;

interface DraggableProp extends React.ComponentProps<'div'> {
    dragHandler?: {
        onDragStart?: MouseCallBack;
        onDragging?: MouseCallBack;
        onDragEnd?: MouseCallBack;
    }
    disabled?: boolean;
    delay?: number;
}

function IsTouchEvent<T>(evt: any): evt is TouchEvent<T> | globalThis.TouchEvent {
    return evt.touches !== undefined;
}

export default ({
    children,
    dragHandler = {},
    disabled = false,
    delay = 6,
    onMouseDown,
    onTouchStart,
    ...rest
}: DraggableProp) => {
    const { onDragStart, onDragging, onDragEnd } = dragHandler;
    let startCoordinates = React.useRef<Point2d | null>(null);

    const dragging = (e: globalThis.MouseEvent) => {
        if (onDragging && startCoordinates.current) {
            const offsetX = e.clientX - startCoordinates.current.x;
            const offsetY = e.clientY - startCoordinates.current.y;
            onDragging({ x: e.clientX, y: e.clientY }, { x: offsetX, y: offsetY });
        }
    };

    const stopDrag = (e: globalThis.MouseEvent) => {
        if (onDragEnd) {
            onDragEnd({ x: e.clientX, y: e.clientY });
        }
        window.removeEventListener("mouseup", stopDrag);
        window.removeEventListener("mousemove", dragging);
        startCoordinates.current = null;
    };

    const startDrag = (x: number, y: number) => {
        if (onDragStart) {
            onDragStart({ x, y });
        }
        window.addEventListener("mouseup", stopDrag);
        window.addEventListener("mousemove", dragging);
    };

    const checkDragDelay = (e: globalThis.TouchEvent | globalThis.MouseEvent) => {
        let x;
        let y;
        if (IsTouchEvent(e)) {
            x = e.touches[0].clientX;
            y = e.touches[0].clientY;
        } else {
            e.preventDefault();
            x = e.clientX;
            y = e.clientY;
        }
        let a = Math.abs(startCoordinates.current!.x - x);
        let b = Math.abs(startCoordinates.current!.y - y);
        let distanceSq = Math.pow(a, 2) + Math.pow(b, 2);
        let dragDistance = delay * delay;
        if (distanceSq >= dragDistance) {
            startDrag(x, y);
            endDragDelay();
        }
    };

    const endDragDelay = () => {
        document.removeEventListener("mouseup", endDragDelay);
        document.removeEventListener("mousemove", checkDragDelay);
    };

    const startDragDelay = (e: MouseEvent | TouchEvent) => {
        e.stopPropagation();
        let x;
        let y;
        if (IsTouchEvent(e)) {
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
                    onMouseDown(e);
                }
            }}
            onTouchStart={(e: TouchEvent<HTMLDivElement>) => {
                if (!disabled) {
                    startDragDelay(e);
                }
                if (onTouchStart) {
                    onTouchStart(e);
                }
            }}
            onDragStart={(e: MouseEvent) => {
                e.preventDefault();
                e.stopPropagation();
            }}
            {...rest}
        >
            {children}
        </div>
    );
};

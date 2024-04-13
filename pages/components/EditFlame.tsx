import { Dispatch, FC, RefObject, SetStateAction, useState } from "react";
import { Condition, EditText } from "..";

interface Props {
  condition: Condition;
  contentScale: number;
  editTexts: EditText[];
  contentRef: RefObject<HTMLDivElement>;
  setCondition: Dispatch<SetStateAction<Condition>>;
  setEditTexts: Dispatch<SetStateAction<EditText[]>>;
}

export const EditFlame: FC<Props> = ({
  condition,
  contentScale,
  setCondition,
  editTexts,
  setEditTexts,
  contentRef,
}) => {
  const updatePosition = (newX: number, newY: number) => {
    setCondition((prev) => ({
      ...prev,
      x: prev.x - newX / contentScale,
      y: prev.y - newY / contentScale,
    }));

    setEditTexts((prev) => prev.map((editText) => ({
      ...editText,
      x: editText.id === condition.referenceTextId ? editText.x - newX / contentScale : editText.x,
      y: editText.id === condition.referenceTextId ? editText.y - newY / contentScale : editText.y,
    })));
  };

  const updateSize = (xChange: number, heightRatios: number) => {
    const newWidth = condition.width - xChange;
    const newHeight = newWidth * heightRatios;

    setCondition((prev) => ({
      ...prev,
      width: newWidth,
      height: newHeight,
    }));

    setEditTexts((prev) => prev.map((editText) => ({
      ...editText,
      scale: editText.id === condition.referenceTextId ? newHeight / editText.height : editText.scale,
    })));
  };

  const handleDrag = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    let prevX = e.clientX;
    let prevY = e.clientY;

    document.onmousemove = (ev: MouseEvent) => {
      const newX = prevX - ev.clientX;
      const newY = prevY - ev.clientY;
      updatePosition(newX, newY);
      prevX = ev.clientX;
      prevY = ev.clientY;
    };

    document.onmouseup = () => {
      document.onmousemove = null;
      document.onmouseup = null;
    };
  };

  const handleResize = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    const prevX = e.clientX;
    const heightRatios = condition.height / condition.width;

    document.onmousemove = (ev: MouseEvent) => {
      const xChange = prevX - ev.clientX;
      updateSize(xChange, heightRatios);
    };

    document.onmouseup = () => {
      document.onmousemove = null;
      document.onmouseup = null;
    };
  };

  return (
    <div
      style={{
        width: `${condition.width / contentScale}px`,
        height: `${condition.height / contentScale}px`,
        border: "1px solid red",
        position: "absolute",
        top: 0,
        left: 0,
        transform: `translate(${condition.x}px, ${condition.y}px)`,
        zIndex: 100,
      }}
      onMouseDown={handleDrag}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: "-3px",
            bottom: "-3px",
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            cursor: "se-resize",
            backgroundColor: "#726464",
            zIndex: 100,
          }}
          onMouseDown={handleResize}
        />
      </div>
    </div>
  );
};

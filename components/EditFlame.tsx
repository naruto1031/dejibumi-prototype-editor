import { Dispatch, FC, RefObject, SetStateAction, useState } from "react";
import { Condition, EditText } from "../pages";
import { useOutsideClick } from "../hooks/useOutsideClick";

interface Props {
  condition: Condition;
  contentScale: number;
  editTexts: EditText[];
  contentRef: RefObject<HTMLDivElement>;
  contentEdit: { id: string; isEditing: boolean }[];
  setCondition: Dispatch<SetStateAction<Condition>>;
  setEditTexts: Dispatch<SetStateAction<EditText[]>>;
  handleDoubleClick: () => void;
}

export const EditFlame: FC<Props> = ({
  condition,
  contentScale,
  setCondition,
  setEditTexts,
  editTexts,
  handleDoubleClick,
  contentEdit
}) => {
  const updatePosition = (newX: number, newY: number) => {
    setCondition((prev) => ({
      ...prev,
      x: prev.x - newX / contentScale,
      y: prev.y - newY / contentScale,
    }));

    setEditTexts((prev) =>
      prev.map((editText) => ({
        ...editText,
        x:
          editText.id === condition.referenceTextId
            ? editText.x - newX / contentScale
            : editText.x,
        y:
          editText.id === condition.referenceTextId
            ? editText.y - newY / contentScale
            : editText.y,
      }))
    );
  };

  const updateSize = (xChange: number, heightRatios: number) => {
    const newWidth = condition.width - xChange;
    const newHeight = newWidth * heightRatios;

    setCondition((prev) => ({
      ...prev,
      width: newWidth,
      height: newHeight,
    }));

    setEditTexts((prev) =>
      prev.map((editText) => {
        if (editText.id === condition.referenceTextId) {
          const newScale =
            (newHeight / condition.height) *
            (editTexts.find(
              (editText) => editText.id === condition.referenceTextId
            )?.scale ?? 1);

          return {
            ...editText,
            scale: newScale,
          };
        }
        return editText;
      })
    );
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

  const ref = useOutsideClick(() => {
    setCondition((prev) => ({
      ...prev,
      isEditing: false,
    }));
  });

  return (
    <div
      ref={ref}
      style={{
        width: `${condition.width / contentScale}px`,
        height: `${condition.height / contentScale}px`,
        border: contentEdit.some((editText) => editText.isEditing) ? "none" : "1px solid red",
        position: "absolute",
        top: 0,
        left: 0,
        transform: `translate(${condition.x}px, ${condition.y}px)`,
        zIndex: contentEdit.some((editText) => editText.isEditing) ? -1 : 0,
        visibility: condition.isEditing ? "visible" : "hidden",
      }}
      onMouseDown={handleDrag}
      onDoubleClick={handleDoubleClick}
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
            display: contentEdit.some((editText) => editText.isEditing) ? "none" : "block",
          }}
          onMouseDown={handleResize}
        />
      </div>
    </div>
  );
};

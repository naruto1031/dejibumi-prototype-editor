import { Dispatch, FC, SetStateAction } from "react";
import { Condition, EditText } from "..";

interface Props {
  condition: Condition;
  contentScale: number;
  editTexts: EditText[];
  setCondition: Dispatch<SetStateAction<Condition>>;
  setEditTexts: Dispatch<SetStateAction<EditText[]>>;
}

export const EditFlame: FC<Props> = ({
  condition,
  contentScale,
  setCondition,
  editTexts,
  setEditTexts,
}) => {
  const handleMouseDown = (e: React.MouseEvent) => {
    let prevX = e.clientX;
    const heightRatios = condition.height / condition.width;

    document.onmousemove = (e: MouseEvent) => {
      const calcHeight = (condition.width - (prevX - e.clientX)) * heightRatios;
      const x = condition.width - (prevX - e.clientX);
      const y = calcHeight;

      setCondition((prev) => ({
        ...prev,
        width: x,
        height: y,
      }));

      const newEditTexts = editTexts.map((editText) => {
        if (editText.id === condition.referenceTextId) {
          return {
            ...editText,
            scale: condition.height / editText.height,
          };
        }

        return editText;
      });
      setEditTexts(newEditTexts);
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
          }}
          onMouseDown={handleMouseDown}
        />
      </div>
    </div>
  );
};

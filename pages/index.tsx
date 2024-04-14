import { useEffect, useRef, useState } from "react";
import { css } from "@/styled-system/css";
import { EditFlame, Header, SideMenu } from "@/components";

export interface Condition {
  width: number;
  height: number;
  x: number;
  y: number;
  referenceTextId: string;
  isEditing: boolean;
}

export interface EditText {
  id: string;
  height: number;
  x: number;
  y: number;
  scale: number;
  text: string;
}

export default function Home() {
  const mainContentRef = useRef<HTMLDivElement>(null);
  const [editTexts, setEditTexts] = useState<EditText[]>([
    {
      id: "data-1",
      height: 21.6,
      x: 43.2,
      y: 69,
      scale: 1,
      text: "テキストを挿入",
    },
    {
      id: "data-2",
      height: 21.6,
      x: 0,
      y: 0,
      scale: 1,
      text: "テキストを挿入",
    },
  ]);

  const [contentEdit, setContentEdit] = useState([
    {
      id: "data-1",
      isEditing: false,
    },
    {
      id: "data-2",
      isEditing: false,
    },
  ]);

  const [contentScale, _] = useState(2);
  const [condition, setCondition] = useState<Condition>({
    width: 0,
    height: 0,
    x: 0,
    y: 0,
    referenceTextId: "",
    isEditing: false,
  });

  const handleDoubleClick = () => {
    setContentEdit((prev) =>
      prev.map((prevText) =>
        prevText.id === condition.referenceTextId
          ? {
              ...prevText,
              isEditing: true,
            }
          : prevText
      )
    );
  };

  return (
    <div>
      <Header />
      <main
        style={{
          display: "flex",
          overflow: "hidden",
        }}
      >
        <SideMenu />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <div
            ref={mainContentRef}
            style={{
              width: "300px",
              height: "200px",
              backgroundColor: "#DFE1E7",
              position: "relative",
              transform: `scale(${contentScale})`,
            }}
          >
            {editTexts.map((editText) => (
              <div
                key={editText.id}
                style={{
                  transform: `translate(${editText.x}px, ${editText.y}px)`,
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "fit-content",
                }}
              >
                <div
                  style={{
                    fontSize: "16px",
                    transformOrigin: "0 0",
                    lineHeight: "22px",
                    transform: `scale(${editText.scale})`,
                    margin: 0,
                    border: contentEdit.find((edit) => edit.id === editText.id)
                      ?.isEditing
                      ? "1px solid red"
                      : "none",
                  }}
                  className={css({
                    "&:focus": {
                      outline: "none",
                    },
                  })}
                  onClick={(e: React.MouseEvent) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    setCondition({
                      width: rect.width > 0 ? rect.width : 0,
                      height: rect.height > 0 ? rect.height : 0,
                      x: editText.x,
                      y: editText.y,
                      referenceTextId: editText.id,
                      isEditing: true,
                    });
                  }}
                  onBlur={() =>
                    setContentEdit((prev) =>
                      prev.map((prevText) =>
                        prevText.id === condition.referenceTextId
                          ? {
                              ...prevText,
                              isEditing: false,
                            }
                          : prevText
                      )
                    )
                  }
                  suppressContentEditableWarning={true}
                  contentEditable={
                    contentEdit.find((edit) => edit.id === editText.id)
                      ?.isEditing
                  }

                  onInput={(e: React.FormEvent) => {console.log(e.currentTarget.textContent)}}
                >
                  <p
                    style={{
                      userSelect: "none",
                    }}
                    className={css({
                      "&:focus": {
                        outline: "none",
                      },
                    })}
                  >
                    {editText.text}
                  </p>
                </div>
              </div>
            ))}
            <EditFlame
              condition={condition}
              contentScale={contentScale}
              setCondition={setCondition}
              editTexts={editTexts}
              setEditTexts={setEditTexts}
              contentRef={mainContentRef}
              handleDoubleClick={handleDoubleClick}
              contentEdit={contentEdit}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

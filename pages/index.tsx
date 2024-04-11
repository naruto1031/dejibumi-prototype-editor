import { useEffect, useRef, useState } from "react";
import { Header } from "./components/Header";
import { SideMenu } from "./components/SideMenu";
import { EditFlame } from "./components/EditFlame";

export interface Condition {
  width: number;
  height: number;
  x: number;
  y: number;
  referenceTextId: string;
}

export interface EditText {
  id: string;
  height: number;
  x: number;
  y: number;
  scale: number;
}

export default function Home() {
  const mainContentRef = useRef<HTMLDivElement>(null);
  const [editTexts, setEditTexts] = useState([
    {
      id: "data-1",
      height: 21.6,
      x: 43.2,
      y: 69,
      scale: 1,
    },
    {
      id: "data-2",
      height: 21.6,
      x: 0,
      y: 0,
      scale: 1,
    },
  ]);

  const [contentScale, _] = useState(2);
  const [condition, setCondition] = useState({
    width: 0,
    height: 0,
    x: 0,
    y: 0,
    referenceTextId: "",
  });

  useEffect(() => {
    const newEditTexts = editTexts.map((editText) => {
      if (editText.id === condition.referenceTextId) {
        return {
          ...editText,
          scale: condition.height / (editText.height * contentScale),
        };
      }

      return editText;
    });
    setEditTexts(newEditTexts);
  }, [condition]);

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
                <p
                  style={{
                    fontSize: "16px",
                    transformOrigin: "0 0",
                    lineHeight: "22px",
                    transform: `scale(${editText.scale})`,
                    margin: 0,
                  }}
                >
                  <span
                    onClick={(e: React.MouseEvent) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      setCondition({
                        width: rect.width,
                        height: rect.height,
                        x: editText.x,
                        y: editText.y,
                        referenceTextId: editText.id,
                      });
                    }}
                  >
                    こんにちは
                  </span>
                </p>
              </div>
            ))}
            <EditFlame
              condition={condition}
              contentScale={contentScale}
              setCondition={setCondition}
              editTexts={editTexts}
              setEditTexts={setEditTexts}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

import { Dispatch, FC, SetStateAction } from "react";

interface Props {
  currentScale: number;
  setCurrentScale: Dispatch<SetStateAction<number>>;
}

export const Header: FC<Props> = ({ currentScale, setCurrentScale }) => {
  return (
    <header
      style={{
        width: "100%",
        height: "10vh",
        backgroundColor: "#726464",
        display: "flex",
      }}
    >
      <div>ヘッダ</div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "20px",
          gap: "10px",
          width: "200px",
          margin: "0 auto",
          color: "#fff",
        }}
      >
        <button
          style={{
            width: "30px",
            height: "30px",
            borderRadius: "50%",
            backgroundColor: "#fff",
            color: "#000",
            paddingBottom: "10px",
          }}
          onClick={() => setCurrentScale((prev) => prev - 0.1)}
        >
          -
        </button>
        <div>{currentScale.toFixed(2)}</div>
        <button
          style={{
            width: "30px",
            height: "30px",
            borderRadius: "50%",
            backgroundColor: "#fff",
            color: "#000",
          }}
          onClick={() => setCurrentScale((prev) => prev + 0.1)}
        >
          +
        </button>
      </div>
    </header>
  );
};

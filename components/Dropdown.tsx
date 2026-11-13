import { useState } from "react";

interface dropDownProps {
  list: Array<string>;
  setSelected: (selected: number) => void;
}

export default function Dropdown({ list, setSelected }: dropDownProps) {
  const [dropDownShowing, setDropDownShowing] = useState(false);
  return (
    <>
      <div
        style={{
          justifyContent: "left",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <button
          style={{
            textAlign: "left",
          }}
          onClick={() => {
            setDropDownShowing(!dropDownShowing);
          }}
        >
          Pick an option
        </button>
        <ul
          style={{
            position: "absolute",
            display: dropDownShowing ? "block" : "none",
            translate: "0 1rem",
          }}
        >
          {list.map((item, index) => (
            <li
              key={index}
              style={{
                height: "1rem",
              }}
            >
              <button
                onClick={() => {
                  setSelected(index);
                }}
              >
                {item}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

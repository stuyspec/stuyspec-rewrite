import { useState } from "react";

interface dropDownProps {
  list: Array<string>;
  setSelected: (selected: number) => void;
}
/*
  this dropdown is intended to be used for the volume/issue picker in the crossword settings
  but if you REALLY wanted to you could probably adapt it for use elsewhere?
  idk give it a shot if you really like this dropdown that much lmao

  the concept is that you basically have a setVolumeTemp or setIssueTemp function
  passed down from the parent that allow this dropdown to send up whatever is clicked.

  pretty simple stuff except i can't style for my life so it does not look like the other settings buttons at all
  but whatever
*/
export default function Dropdown({ list, setSelected }: dropDownProps) {
  const [dropDownShowing, setDropDownShowing] = useState(false);
  return (
    <>
      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          border: "1px solid black",
        }}
      >
        <button
          style={{
            textAlign: "left",
            padding: "0 0 5px 0",
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
            display: dropDownShowing ? "flex" : "none",
            flexDirection: "column",
            translate: "0 1rem",
            flex: "1 1 auto",
            gap: "5px",
            overflowY: "auto",
            scrollbarWidth: "thin",
            scrollbarColor: "#555555 transparent",
            minHeight: 0,
            maxHeight: "5rem",
            alignSelf: "stretch",
            width: "100%",
            boxSizing: "border-box",
          }}
        >
          {list.map((item, index) => (
            <li
              key={index}
              style={{
                height: "1rem",
                flex: "1 1 auto",
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

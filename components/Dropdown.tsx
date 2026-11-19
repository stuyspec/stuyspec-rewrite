import { useState, useEffect } from "react";
import styles from "../styles/Crossword.module.css";

interface dropDownProps {
  list: Array<number>;
  type: string;
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

export default function Dropdown({ list, type, setSelected }: dropDownProps) {
  const [dropDownShowing, setDropDownShowing] = useState(false);
  const [selectedItem, setSelectedLocal] = useState<number | null>(null);

  const label = selectedItem !== null ? `${type === "volume" ? "Volume" : "Issue"}: ${selectedItem}` : `${type === "volume" ? "Pick a Volume:" : "Pick an Issue:"}`;

  return (
    <>
      <div
        className={styles["dropdown-container"]}
      >
        <button
          style={{
            textAlign: "center",
            padding: "2.5px 0",
          }}
          onClick={() => {
            setDropDownShowing((prev) => !prev);
          }}
        >
          {label}
        </button>
        <ul className={styles["dropdown-list"]}
          style={{
            position: "absolute",
            display: dropDownShowing ? "flex" : "none",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            translate: "0 1.75rem",
            flex: "1 1 auto",
            overflowY: "auto",
            scrollbarWidth: "thin",
            scrollbarColor: "#555555 transparent",
            minHeight: 0,
            maxHeight: "5rem",
            alignSelf: "stretch",
            width: "100%",
            boxSizing: "border-box",
            borderRadius: "var(--radius-md)",
            backgroundColor: "var(--secondary)",
            zIndex: 1,
            padding: "5px 0 10px 0",
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
                  console.log(
                    `changed ${type === "volume" ? "vol" : "iss"} to ${list[index]}`,
                  );
                  setSelected(list[index]);
                  setSelectedLocal(list[index]);
                  setDropDownShowing(false);
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

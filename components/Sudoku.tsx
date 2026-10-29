import { ReceivedArticle } from "../ts_types/db_types";
import { useState } from "react";
import styles from "../styles/Sudoku.module.css";

interface TileObj {
  index: number;
  selected: boolean;
  value: string;
  given: boolean;
}

function checkBoard(board: TileObj[]) {
  const errors = new Set<number>();
  let full = true;
  let won = false;

  for (let row = 0; row < 9; row++) {
    //row error detection
    const seen = new Map<string, number>();
    for (let col = 0; col < 9; col++) {
      const index = row * 9 + col;
      const value = board[index].value;
      if (value === "") {
        full = false;
        continue;
      }
      if (seen.has(value)) {
        errors.add(seen.get(value)!);
        errors.add(index);
      } else {
        seen.set(value, index);
      }
    }
  }

  for (let col = 0; col < 9; col++) {
    //col error detection
    const seen = new Map<string, number>();
    for (let row = 0; row < 9; row++) {
      const index = row * 9 + col;
      const value = board[index].value;
      if (value === "") continue;
      if (seen.has(value)) {
        errors.add(seen.get(value)!);
        errors.add(index);
      } else {
        seen.set(value, index);
      }
    }
  }

  for (let hblock = 0; hblock < 3; hblock++) {
    //block error detection
    for (let vblock = 0; vblock < 3; vblock++) {
      const seen = new Map<string, number>();
      for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
          const row = vblock * 3 + r;
          const col = hblock * 3 + c;
          const index = row * 9 + col;
          const value = board[index].value;
          if (value === "") continue;
          if (seen.has(value)) {
            errors.add(seen.get(value)!);
            errors.add(index);
          } else {
            seen.set(value, index);
          }
        }
      }
    }
  }

  if (errors.size === 0 && full === true) {
    won = true;
  }

  return [errors, won] as const;
}

function shadeBoard(index: number, bs: TileObj[]) {
  const row = Math.floor(index / 9);
  for (let i = 0; i < 9; i++) {
    bs[row * 9 + i].selected = true;
  }

  const col = index % 9;
  for (let i = 0; i < 9; i++) {
    bs[col + i * 9].selected = true;
  }

  const blockx = Math.floor(col / 3);
  const blocky = Math.floor(row / 3);
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      bs[i * 9 + j + blockx * 3 + blocky * 27].selected = true;
    }
  }
}

function createTileObj(index: number, value: string, given: boolean): TileObj {
  return {
    index: index,
    selected: false,
    value: value,
    given: given,
  };
}

function whatColorShouldIPaintThisElement(
  obj: TileObj,
  won: boolean,
  errors: Set<number>,
): string {
  if (won) {
    return "green";
  }
  if (errors.has(obj.index)) {
    return "red";
  } else {
    if (obj.selected) {
      return "yellow";
    } else {
      return "";
    }
  }
}

function Sudoku(props: { puzzle: ReceivedArticle }) {
  const base = Array(81).fill(""); //this is the given values
  // DO NOT SET BASE TO [] IT WILL Break IDIOT
  let i = 0;
  const newbase: TileObj[] = [];
  base.map((tile) => {
    if (tile === "") {
      newbase.push(createTileObj(i, tile, false));
    } else {
      newbase.push(createTileObj(i, tile, true));
    }
    i++;
  });
  const [boardState, setBoardState] = useState(newbase);

  const [errors, won] = checkBoard(boardState);

  return (
    <>
      {Array(9)
        .fill("")
        .map((_, i) => {
          return (
            <div key={i}>
              {Array(9)
                .fill("")
                .map((_, j) => {
                  const currindex = i * 9 + j;
                  return (
                    <textarea
                      maxLength={1}
                      rows={1}
                      cols={2}
                      key={currindex}
                      readOnly={boardState[currindex].given}
                      style={{
                        backgroundColor: whatColorShouldIPaintThisElement(
                          boardState[currindex],
                          won,
                          errors,
                        ),
                      }}
                      className={styles.sudokuTextArea}
                      value={boardState[currindex].value}
                      onChange={(e) => {
                        // EDIT VALUE
                        if (!/^[1-9]?$/.test(e.target.value)) return; //reject anything that isn't a single digit 1-9 (or empty)
                        const temp = boardState.slice(0);
                        temp[currindex].value = e.target.value;
                        setBoardState(temp);
                      }}
                      onFocus={() => {
                        // SELECTION
                        const temp = boardState.slice(0);
                        shadeBoard(currindex, temp);
                        setBoardState(temp);
                      }}
                      onBlur={() => {
                        // DESELECTION
                        const temp = boardState.slice(0);
                        for (let i = 0; i < 81; i++) {
                          temp[i].selected = false;
                        }
                        setBoardState(temp);
                      }}
                    />
                  );
                })}
            </div>
          );
        })}
    </>
  );
}

export default Sudoku;

import { ReceivedArticle } from "../ts_types/db_types";
import { useRef, useState } from "react";
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

  if (bs[index].value === "") return;
  for (let i = 0; i < 81; i++) {
    if (bs[i].value === bs[index].value) bs[i].selected = true;
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

function howShouldIStyleThisCell(
  obj: TileObj,
  focused: boolean,
  won: boolean,
  errors: Set<number>,
): string {
  const classes = [styles.cell];
  if (obj.given) classes.push(styles.given);
  if (won) classes.push(styles.won);
  else if (errors.has(obj.index)) classes.push(styles.error);
  else if (focused) classes.push(styles.focused);
  else if (obj.selected) classes.push(styles.highlighted);
  return classes.join(" ");
}

function Sudoku(props: { puzzle: ReceivedArticle }) {
  const base =
    JSON.parse(props.puzzle.text) != undefined
      ? JSON.parse(props.puzzle.text)
      : Array(81).fill(""); //this are the given values

  // DO NOT SET BASE TO [] IT WILL Break IDIOT
  let i = 0;
  const newbase: TileObj[] = [];
  base.map((tile: string) => {
    if (tile === "") {
      newbase.push(createTileObj(i, tile, false));
    } else {
      newbase.push(createTileObj(i, tile, true));
    }
    i++;
  });
  const [boardState, setBoardState] = useState(newbase);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const cellRefs = useRef<(HTMLInputElement | null)[]>([]); //just now realized i wasn't storing the individual cells :sob:

  function moveFocus(index: number, key: string) {
    const row = Math.floor(index / 9);
    const col = index % 9;
    //wrap around the edges of the board
    const moves: Record<string, [number, number]> = {
      ArrowUp: [(row + 8) % 9, col],
      ArrowDown: [(row + 1) % 9, col],
      ArrowLeft: [row, (col + 8) % 9],
      ArrowRight: [row, (col + 1) % 9],
    };
    const [newRow, newCol] = moves[key];
    cellRefs.current[newRow * 9 + newCol]?.focus();
  }

  const [errors, won] = checkBoard(boardState);

  return (
    <div className={styles.board}>
      {boardState.map((tile, currindex) => (
        <input
          type="text"
          inputMode="numeric"
          autoComplete="off"
          aria-label={`Row ${Math.floor(currindex / 9) + 1}, column ${(currindex % 9) + 1}`}
          key={currindex}
          ref={(el) => {
            cellRefs.current[currindex] = el;
          }}
          readOnly={tile.given}
          className={howShouldIStyleThisCell(
            tile,
            currindex === focusedIndex,
            won,
            errors,
          )}
          value={tile.value}
          onChange={(e) => {
            // EDIT VALUE: keep only the last typed digit so typing over a cell replaces it
            const value = e.target.value.slice(-1);
            if (!/^[1-9]?$/.test(value)) return; //reject anything that isn't a single digit 1-9 (or empty)
            const temp = boardState.slice(0);
            temp[currindex].value = value;
            for (let i = 0; i < 81; i++) {
              temp[i].selected = false;
            }
            shadeBoard(currindex, temp);
            setBoardState(temp);
          }}
          onKeyDown={(e) => {
            // move about
            if (e.key.startsWith("Arrow")) {
              e.preventDefault(); // stop the cursor moving inside the input / page scrolling
              moveFocus(currindex, e.key);
            }
          }}
          onFocus={() => {
            // SELECTION
            const temp = boardState.slice(0);
            shadeBoard(currindex, temp);
            setBoardState(temp);
            setFocusedIndex(currindex);
          }}
          onBlur={() => {
            // DESELECTION
            const temp = boardState.slice(0);
            for (let i = 0; i < 81; i++) {
              temp[i].selected = false;
            }
            setBoardState(temp);
            setFocusedIndex(null);
          }}
        />
      ))}
    </div>
  );
}

export default Sudoku;

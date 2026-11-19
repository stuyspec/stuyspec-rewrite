import { ReceivedArticle } from "../ts_types/db_types";
import { useState, useEffect, useRef } from "react";
import CrosswordReader from "../utils/crosswordReader";
import type { Clue } from "@xwordly/xword-parser";
import Keyboard, { type KeyboardReactInterface } from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import styles from "../styles/Crossword.module.css";
import { FaRulerVertical } from "react-icons/fa";
import Dropdown from "./Dropdown";
import fetchCrosswords from "../utils/fetchCrosswords";
import { fetchCrosswordVolIss } from "../utils/fetchCrosswords";
import { useRouter } from "next/router";

interface SettingsProps {
  displaying: boolean;
  changeDisplaying: (displaying: boolean) => void;
  changeVolume: (volume: number) => void;
  changeIssue: (issue: number) => void;
  clearGrid: () => void;
  showAnswers: () => void;
}

type LimitingInputSettingsProps = Pick<
  SettingsProps,
  "changeDisplaying" | "changeVolume" | "changeIssue"
>;

function LimitingInputSettings({
  changeDisplaying,
  changeVolume,
  changeIssue,
}: LimitingInputSettingsProps) {
  const [vol, setVol] = useState(-1);
  const [iss, setIss] = useState(-1);

  /*
      This useEffect hook basically fetches all of the availables crossword volumes and issues
      asynchronously. This hook is primarily related to the Settings section for the crossword.
  
      The algorithm is:
      1. Find all available volumes from the db.
      2. Throw the available volumes from the db into a list, no repeats.
      3. The user selects a volume through the dropdown menu.
      4. The issue drop down menu opens up, and then finds all available issues from that volume.
      5. Display those issues in the dropdown, then let the user select one.
      6. When change crossword is clicked, those values are pushed to the actual volume and issue variables, and the crossword is updated.
    */

  const [crosswordVolumes, setCrosswordVolumes] = useState<number[]>([]);
  const [crosswordIssues, setCrosswordIssues] = useState<number[]>([]);

  // creates router for redirect
  const router = useRouter();

  // loads the available volumes on component mount
  useEffect(() => {
    const loadCrosswords = async () => {
      const articles = await fetchCrosswords();
      let volumes = articles.map((article: ReceivedArticle) => article.volume);
      volumes = Array.from(new Set(volumes));
      setCrosswordVolumes(volumes);
    };
    loadCrosswords();
  }, []);

  // loads available issues on volume selection/change
  useEffect(() => {
    const loadCrosswords = async () => {
      const articles = await fetchCrosswords();
      let issues = articles.map((article: ReceivedArticle) => {
        if (article.volume == vol) {
          return article.issue;
        }
      });
      issues = Array.from(new Set(issues));
      setCrosswordIssues(issues);
    };
    loadCrosswords();
  }, [vol]);

  const [selectedArticle, setSelectedArticle] = useState<ReceivedArticle>();
  // loads the crossword from db when iss is finally imported/changed
  useEffect(() => {
    if (vol != -1 && iss != -1) {
      const loadCrossword = async () => {
        const article: ReceivedArticle = await fetchCrosswordVolIss(vol, iss);
        setSelectedArticle(article);
      };
      loadCrossword();
    }
  }, [iss]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        textAlign: "center",
        gap: "10px",
        minWidth: 0,
        maxWidth: "10rem",
        alignItems: "stretch",
      }}
    >
      <div className={styles["dropdown-container"]} style={{ width: "100%" }}>
        <Dropdown
          list={crosswordVolumes}
          type="volume"
          setSelected={setVol}
        ></Dropdown>
      </div>
      <div className={styles["dropdown-container"]}
        style={{
          display: vol != -1 ? "inline-flex" : "none",
          width: "100%",
        }}
      >
        <Dropdown
          list={crosswordIssues}
          type="issue"
          setSelected={setIss}
        ></Dropdown>
      </div>
      <div style={{ width: "100%" }}>
        <button className={styles["confirm-button"]}
          onClick={() => {
            if (vol != -1 && iss != -1) {
              changeVolume(vol);
              changeIssue(iss);

              if (selectedArticle) {
                router.push(`/article/${selectedArticle.slug}`);
              }
            }
          }}
          style={{
            display: vol != -1 && iss != -1 ? "inline-flex" : "none",
            width: "100%",
            textAlign: "center",
            justifyContent: "center",
          }}
        >
          Confirm
        </button>
      </div>
    </div>
  );
}

function Settings({
  displaying,
  changeDisplaying,
  changeVolume,
  changeIssue,
  clearGrid,
  showAnswers,
}: SettingsProps) {
  function swapDisplaying() {
    changeDisplaying(!displaying);
  }

  const [resetConfirmDisplaying, setResetConfirmDisplaying] = useState(false);
  const [showAnswersConfirmDisplaying, setShowAnswersConfirmDisplaying] =
    useState(false);

  function swapResetDisplaying() {
    setResetConfirmDisplaying(!resetConfirmDisplaying);
  }

  function swapShowAnswersDisplaying() {
    setShowAnswersConfirmDisplaying(!showAnswersConfirmDisplaying);
  }

  return (
    <>
      <button onClick={swapDisplaying} className={styles["standard-button"]}>
        Settings
      </button>

      {displaying && (
        <div
          className={styles.modal}
          style={{
            display: "inline-flex",
            border: "2px solid black",
            borderRadius: "5px",
            zIndex: 1000,
          }}
        >
          <div onClick={swapDisplaying} className={styles["overlay"]}></div>
          <div className={styles["modal-content"]}>
            <h2>Settings</h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "10rem auto 10rem",
                alignItems: "start",
                columnGap: "20px",
              }}
            >
              <LimitingInputSettings
                changeDisplaying={changeDisplaying}
                changeVolume={changeVolume}
                changeIssue={changeIssue}
              />
              <div className={styles["divider"]} />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "15px",
                }}
              >
                <button
                  className={styles["standard-button"]}
                  onClick={swapShowAnswersDisplaying}
                >
                  Reveal Answers
                </button>
                <button
                  className={styles["standard-button"]}
                  onClick={swapResetDisplaying}
                >
                  Reset Grid
                </button>
              </div>
            </div>
            <button className={styles["close-modal"]} onClick={swapDisplaying}>
              X
            </button>
            <Confirmation
              displaying={resetConfirmDisplaying}
              changeDisplaying={setResetConfirmDisplaying}
              actionOnConfirm={clearGrid}
            ></Confirmation>
            <Confirmation
              displaying={showAnswersConfirmDisplaying}
              changeDisplaying={setShowAnswersConfirmDisplaying}
              actionOnConfirm={showAnswers}
            ></Confirmation>
          </div>
        </div>
      )}
    </>
  );
}

interface confirmationProps {
  displaying: boolean;
  changeDisplaying: (displaying: boolean) => void;
  actionOnConfirm: () => void;
}

function Confirmation({
  displaying,
  changeDisplaying,
  actionOnConfirm,
}: confirmationProps) {
  function swapDisplaying() {
    changeDisplaying(!displaying);
  }
  return (
    <>
      {displaying && (
        <div
          className={styles["confirm-modal-content"]}
          style={{
            display: "inline-flex",
            borderRadius: "5px",
            zIndex: 1000,
            textAlign: "center",
          }}
        >
          <h2>Are you sure?</h2>
          <div style={{ display: "flex", flexDirection: "row", gap: "20px" }}>
            <button
              className={styles["standard-button"]}
              onClick={() => {
                actionOnConfirm();
                swapDisplaying();
              }}
            >
              Yes
            </button>
            <button
              className={styles["standard-button"]}
              onClick={swapDisplaying}
            >
              No
            </button>
          </div>

          <button className={styles["close-modal"]} onClick={swapDisplaying}>
            X
          </button>
        </div>
      )}
    </>
  );
}

async function fileExists(path: string) {
  const response = await fetch(path, {
    method: "HEAD",
    cache: "no-store",
  });

  return response.ok;
}

function Crossword(props: { puzzle: ReceivedArticle }) {
  const [won, setWon] = useState(false);
  const [selectedCell, setSelectedCell] = useState(0);

  // user info
  const [lastKey, setLastKey] = useState("");
  const [vertical, setVertical] = useState(true);

  // website puzzle state
  const [volume, setVolume] = useState(props.puzzle.volume);
  const [issue, setIssue] = useState(props.puzzle.issue);

  // modals active or not
  const [settingsDisplaying, setSettingsDisplaying] = useState(false);
  const [confirmationDisplaying, setConfirmationDisplaying] = useState(false);

  // Puzzle info variables
  const [puzzleSolution, setPuzzleSolution] = useState<string[]>([]);
  const [rowCount, setRowCount] = useState(0);
  const [rowLength, setRowLength] = useState(0);
  const [numberLabelGrid, setNumberLabelGrid] = useState<number[]>([]);

  // grid init
  const [grid, setGrid] = useState<string[]>([]);

  // crossword info init
  type CrosswordInfoType = Awaited<ReturnType<typeof CrosswordReader>>;

  const [crosswordInfo, setCrosswordInfo] = useState<CrosswordInfoType | null>(
    null,
  );

  // automatically scale cellSize with viewport, why did i make everything dependent on cellSize aah :(
  const [viewport, setViewport] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const onResize = () =>
      setViewport({ w: window.innerWidth, h: window.innerHeight });
    +onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const onResize = () =>
      setViewport({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // the grid is sized from the article column so it lines up with the title block
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver(([entry]) =>
      setContainerWidth(entry.contentRect.width),
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const showClues = viewport.w >= 768; // keep in sync with Crossword.module.css
  const CLUES_W = 240 + 20; // minimum clue column width + gap
  const GRID_OUTLINE = 2; // cell outlines draw 1px outside the grid on each side
  const CHROME_H = 220;

  const availableW = containerWidth - GRID_OUTLINE - (showClues ? CLUES_W : 0);

  // with clues, the clue column absorbs leftover width. without them, the grid
  // has to fill the column by itself, so the cells can't be rounded or capped.
  const cellSize = showClues
    ? Math.max(
        18,
        Math.min(
          44,
          Math.floor(
            Math.min(
              availableW / (rowLength || 15),
              (viewport.h - CHROME_H) / (rowCount || 15),
            ),
          ),
        ),
      )
    : Math.max(18, availableW / (rowLength || 15));

  // toolbar
  const [mergedClues, setMergedClues] = useState<Clue[]>([]);
  const [clueIndex, setClueIndex] = useState(0);

  // modulo for proper index looping
  const mod = (n: number, d: number) => ((n % d) + d) % d;

  // keyboard code ripped straight from docs lmao
  const [keyboardActive, setKeyboardActive] = useState(false);

  const [input, setInput] = useState("");
  const keyboard = useRef<KeyboardReactInterface | null>(null);

  const LAYOUTS = {
    default: [
      "{tab} q w e r t y u i o p",
      "a s d f g h j k l {bksp}",
      "{shift} z x c v b n m {rev} {enter}",
    ],
    shift: [
      "{tab} Q W E R T Y U I O P",
      "A S D F G H J K L {bksp}",
      "{shift} Z X C V B N M {rev} {enter}",
    ],
  };

  const [layout, setLayout] = useState("default");

  const onChange = (newInput: string) => {
    setInput(newInput);
    // console.log("Input changed", newInput);
  };

  const handleShift = () => {
    const newLayoutName = layout === "default" ? "shift" : "default";
    setLayout(newLayoutName);
  };

  // Send on-screen keys through the same handler the physical keyboard uses.
  const dispatchKey = (key: string) => {
    window.dispatchEvent(new KeyboardEvent("keydown", { key }));
  };

  const onKeyPress = (button: string) => {
    if (button === "{shift}") {
      handleShift();
      return;
    }
    if (button === "{rev}") {
      setVertical(!vertical);
      return;
    }

    const physicalKey =
      button === "{bksp}"
        ? "Backspace"
        : button === "{enter}"
          ? "Enter"
          : button === "{tab}"
            ? "Tab"
            : button === "{space}"
              ? " "
              : button;

    dispatchKey(physicalKey);
  };

  /*
  check crossword info from .puz file
*/

  useEffect(() => {
    const asyncPuzzleLoader = async () => {
      try {
        const loadingPuzzle = await CrosswordReader(volume, issue);
        setCrosswordInfo(loadingPuzzle);
        const loadingPuzzleSolution = loadingPuzzle.grid.cells.flatMap(
          (row) => {
            return row.map((cell) => cell.solution ?? "N/A");
          },
        );
        setPuzzleSolution(loadingPuzzleSolution);
        // console.log(puzzleSolution);
        setRowCount(loadingPuzzle.grid.height);
        setRowLength(loadingPuzzle.grid.width);
        setGrid(
          loadingPuzzle.grid.cells.flatMap((row) => {
            return row.map((_) => "");
          }),
        );

        // number init
        setNumberLabelGrid(
          loadingPuzzle.grid.cells.flatMap((row) => {
            return row.map((cell) => cell.number ?? -1);
          }),
        );

        // set big clue array with a  ll clues
        const across = loadingPuzzle.clues.across;
        const down = loadingPuzzle.clues.down;
        setMergedClues([...across, ...down]);

        console.log(loadingPuzzle);
      } catch {
        -console.error("Unable to read crossword file. Lock in.");
      }
    };

    asyncPuzzleLoader();
  }, [volume, issue]);

  /*
    This useEffect() hook updates the most recent key.
  */
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Nothing is typed until the puzzle has actually loaded.
      if (!rowLength || !rowCount) return;

      let key = e.key.toUpperCase();
      if (/^[a-z]$/i.test(e.key)) {
        setLastKey(key);
        if (vertical) {
          let newCell = selectedCell;
          if (puzzleSolution[newCell] != "N/A") {
            newCell = (newCell + rowLength) % (rowLength * rowCount);
          }
          let maxSteps = 0;
          while (puzzleSolution[newCell] == "N/A" && maxSteps < rowCount) {
            newCell = (newCell + rowLength) % (rowLength * rowCount);
            maxSteps++;
          }
          setSelectedCell(newCell);
        } else {
          let newCell = selectedCell;
          if (puzzleSolution[newCell] != "N/A") {
            newCell =
              (((newCell % rowLength) + 1) % rowLength) +
              newCell -
              (newCell % rowLength);
          }
          let maxSteps = 0;
          while (puzzleSolution[newCell] == "N/A" && maxSteps < rowLength) {
            newCell =
              (((newCell % rowLength) + 1) % rowLength) +
              newCell -
              (newCell % rowLength);
            maxSteps++;
          }
          setSelectedCell(newCell);
        }
      } else if (key === "BACKSPACE") {
        key = "";
        setLastKey(key);
        let newCell = selectedCell;
        if (grid[selectedCell] == "") {
          if (vertical) {
            if (puzzleSolution[newCell] != "N/A") {
              const wrap = rowLength * rowCount;
              newCell = (newCell - rowLength + wrap) % (rowLength * rowCount);
            }
            let maxSteps = 0;
            while (puzzleSolution[newCell] == "N/A" && maxSteps < rowCount) {
              const wrap = rowLength * rowCount;
              newCell = (newCell - rowLength + wrap) % wrap;
              maxSteps++;
            }
          } else {
            if (puzzleSolution[newCell] != "N/A") {
              newCell =
                (((newCell % rowLength) - 1 + rowLength) % rowLength) +
                newCell -
                (newCell % rowLength);
            }
            let maxSteps = 0;
            while (puzzleSolution[newCell] == "N/A" && maxSteps < rowLength) {
              newCell =
                (((newCell % rowLength) - 1 + rowLength) % rowLength) +
                newCell -
                (newCell % rowLength);
              maxSteps++;
            }
          }
        }
        setSelectedCell(newCell);
      } else if (key === "TAB") {
        if (vertical) {
          let newCell = selectedCell;
          if (puzzleSolution[newCell] != "N/A") {
            newCell = (newCell + rowLength) % (rowLength * rowCount);
          }
          let maxSteps = 0;
          while (puzzleSolution[newCell] == "N/A" && maxSteps < rowCount) {
            newCell = (newCell + rowLength) % (rowLength * rowCount);
            maxSteps++;
          }
          setSelectedCell(newCell);
        } else {
          let newCell = selectedCell;
          if (puzzleSolution[newCell] != "N/A") {
            newCell =
              (((newCell % rowLength) + 1) % rowLength) +
              newCell -
              (newCell % rowLength);
          }
          let maxSteps = 0;
          while (puzzleSolution[newCell] == "N/A" && maxSteps < rowLength) {
            newCell =
              (((newCell % rowLength) + 1) % rowLength) +
              newCell -
              (newCell % rowLength);
            maxSteps++;
          }
          setSelectedCell(newCell);
        }
        e.preventDefault();
        return;
      } else if (key === "ARROWDOWN") {
        let newCell = selectedCell;
        if (puzzleSolution[newCell] != "N/A") {
          newCell = (newCell + rowLength) % (rowLength * rowCount);
        }
        let maxSteps = 0;
        while (puzzleSolution[newCell] == "N/A" && maxSteps < rowCount) {
          newCell = (newCell + rowLength) % (rowLength * rowCount);
          maxSteps++;
        }
        e.preventDefault();
        setSelectedCell(newCell);
        return;
      } else if (key === "ARROWRIGHT") {
        let newCell = selectedCell;
        if (puzzleSolution[newCell] != "N/A") {
          newCell =
            (((newCell % rowLength) + 1 + rowLength) % rowLength) +
            newCell -
            (newCell % rowLength);
        }
        let maxSteps = 0;
        while (puzzleSolution[newCell] == "N/A" && maxSteps < rowLength) {
          newCell =
            (((newCell % rowLength) + 1 + rowLength) % rowLength) +
            newCell -
            (newCell % rowLength);
          maxSteps++;
        }
        setSelectedCell(newCell);
        return;
      } else if (key === "ARROWUP") {
        let newCell = selectedCell;
        if (puzzleSolution[newCell] != "N/A") {
          newCell =
            (newCell - rowLength + rowLength * rowCount) %
            (rowLength * rowCount);
        }
        let maxSteps = 0;
        while (puzzleSolution[newCell] == "N/A" && maxSteps < rowCount) {
          newCell =
            (newCell - rowLength + rowLength * rowCount) %
            (rowLength * rowCount);
          maxSteps++;
        }
        e.preventDefault();
        setSelectedCell(newCell);
        return;
      } else if (key === "ARROWLEFT") {
        let newCell = selectedCell;
        if (puzzleSolution[newCell] != "N/A") {
          newCell =
            (((newCell % rowLength) - 1 + rowLength) % rowLength) +
            newCell -
            (newCell % rowLength);
        }
        let maxSteps = 0;
        while (puzzleSolution[newCell] == "N/A" && maxSteps < rowLength) {
          newCell =
            (((newCell % rowLength) - 1 + rowLength) % rowLength) +
            newCell -
            (newCell % rowLength);
          maxSteps++;
        }
        setSelectedCell(newCell);
        return;
      } else {
        return;
      }
      setGrid((currentGrid) =>
        currentGrid.map((cell, index) =>
          puzzleSolution[index] === "N/A"
            ? ""
            : index === selectedCell
              ? key
              : cell,
        ),
      );
    };

    window.addEventListener("keydown", handleKeyDown);

    // console.log(grid);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedCell, vertical, puzzleSolution, rowLength, rowCount, grid]);

  /*
    This useEffect() hook clears the most recent key
    shortly after it is typed.
  */
  useEffect(() => {
    if (lastKey === "") return;

    const timeoutId = setTimeout(() => {
      setLastKey("");
    }, 100);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [lastKey]);

  useEffect(() => {
    if (input === "") return;

    const timeoutId = setTimeout(() => {
      setInput("");
    }, 100);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [input]);

  // console.log(lastKey);
  // console.log(grid);

  useEffect(() => {
    if (crosswordInfo != null) {
      let cellIndex = selectedCell || 0;
      let width = crosswordInfo.grid.width;
      let height = crosswordInfo.grid.height;
      let cells = crosswordInfo.grid.cells;
      if (vertical) {
        while (cellIndex >= width) {
          const above =
            cells[Math.floor((cellIndex - width) / width)]?.[cellIndex % width];

          if (above === undefined || above.isBlack) break;
          cellIndex -= width;
        }
        for (
          let i = crosswordInfo.clues.across.length;
          i < mergedClues.length;
          i++
        ) {
          if (
            mergedClues[i].number ===
            cells[Math.floor(cellIndex / width)][cellIndex % width].number
          ) {
            setClueIndex(i);
            break;
          }
        }
      } else {
        while (cellIndex % width > 0) {
          const left =
            cells[Math.floor(cellIndex / width)]?.[(cellIndex - 1) % width];

          if (left === undefined || left.isBlack) break;
          cellIndex -= 1;
        }
        for (let i = 0; i < crosswordInfo.clues.down.length; i++) {
          if (
            mergedClues[i].number ===
            cells[Math.floor(cellIndex / width)][cellIndex % width].number
          ) {
            setClueIndex(i);
            break;
          }
        }
      }
    }
  }, [grid, selectedCell, vertical, mergedClues]);

  /*
  Checks the currently input letters in the grid against the answer grid
*/

  function answerCheck() {
    return (
      grid.length === puzzleSolution.length &&
      grid.every((cell, index) => {
        const solutionCell =
          puzzleSolution[index] === "N/A" ? "" : puzzleSolution[index];

        return cell === solutionCell;
      })
    );
  }

  function clearGrid() {
    setWon(false);
    setSelectedCell(0);

    // user info
    setLastKey("");
    setVertical(true);

    // Puzzle info variables
    setPuzzleSolution([]);
    setRowCount(0);
    setRowLength(0);
    setNumberLabelGrid([]);
    const asyncPuzzleLoader = async () => {
      try {
        const loadingPuzzle = await CrosswordReader(volume, issue);
        setCrosswordInfo(loadingPuzzle);
        const loadingPuzzleSolution = loadingPuzzle.grid.cells.flatMap(
          (row) => {
            return row.map((cell) => cell.solution ?? "N/A");
          },
        );
        setPuzzleSolution(loadingPuzzleSolution);
        // console.log(puzzleSolution);
        setRowCount(loadingPuzzle.grid.height);
        setRowLength(loadingPuzzle.grid.width);
        setGrid(
          loadingPuzzle.grid.cells.flatMap((row) => {
            return row.map((_) => "");
          }),
        );

        // number init
        setNumberLabelGrid(
          loadingPuzzle.grid.cells.flatMap((row) => {
            return row.map((cell) => cell.number ?? -1);
          }),
        );

        // set big clue array with a  ll clues
        const across = loadingPuzzle.clues.across;
        const down = loadingPuzzle.clues.down;
        setMergedClues([...across, ...down]);

        // console.log(numberPlacer(loadingPuzzleSolution, loadingPuzzle.clues.across, loadingPuzzle.clues.down, loadingPuzzle.grid.width, loadingPuzzle.grid.height))
        console.log(loadingPuzzle);
      } catch {
        console.error("Unable to read crossword file. Lock in.");
      }
    };
    asyncPuzzleLoader();
  }

  function fillWithAnswers() {
    setGrid(
      puzzleSolution.map((cell) => {
        return cell === "N/A" ? "" : cell;
      }),
    );
  }

  return (
    <>
      <div
        className={styles.all}
        ref={containerRef}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <div className={styles.header} style={{ fontSize: "1rem" }}>
              <h2>{crosswordInfo?.title}</h2>
              <h2>{crosswordInfo?.author}</h2>
            </div>
            <Settings
              displaying={settingsDisplaying}
              changeDisplaying={setSettingsDisplaying}
              changeVolume={setVolume}
              changeIssue={setIssue}
              clearGrid={clearGrid}
              showAnswers={fillWithAnswers}
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-start",
              gap: "20px",
              width: "100%",
            }}
          >
            {
              // GRID PLUS TOOLBAR AND SUBMIT
            }
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "stretch",
                justifyContent: "flex-start",
                flexShrink: 0,
                width: rowLength ? rowLength * cellSize + GRID_OUTLINE : "auto",
              }}
            >
              <div
                style={{
                  justifyContent: "center",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "stretch",
                  gap: "10px",
                }}
              >
                <div
                  className={styles.grid}
                  style={{
                    display: "grid",
                    gridTemplateColumns: `repeat(${rowLength}, ${cellSize}px)`,
                    gridTemplateRows: `repeat(${rowCount}, ${cellSize}px)`,
                    width: "fit-content",
                  }}
                >
                  {grid.map((cellInput, cellInputIndex) => (
                    <div
                      className={styles.container}
                      key={`${cellInputIndex}`}
                      style={{
                        width: `${cellSize}px`,
                        height: `${cellSize}px`,
                        paddingBottom: "2px",
                      }}
                    >
                      <button
                        className={styles.cell}
                        disabled={puzzleSolution[cellInputIndex] === "N/A"}
                        style={{
                          width: `${cellSize}px`,
                          height: `${cellSize}px`,
                          fontSize: `${cellSize * 0.5}px`,
                          backgroundColor:
                            puzzleSolution[cellInputIndex] === "N/A"
                              ? "#2e2e2e"
                              : cellInputIndex === selectedCell
                                ? "#4fe34f"
                                : (vertical &&
                                      cellInputIndex % rowLength ==
                                        selectedCell % rowLength) ||
                                    (!vertical &&
                                      Math.floor(cellInputIndex / rowLength) ==
                                        Math.floor(selectedCell / rowLength))
                                  ? "#a6f2a6"
                                  : "white",
                        }}
                        onClick={() => {
                          if (cellInputIndex === selectedCell) {
                            setVertical(!vertical);
                          }
                          setSelectedCell(cellInputIndex);
                        }}
                      >
                        {puzzleSolution[cellInputIndex] === "N/A"
                          ? ""
                          : cellInput}
                      </button>
                      <p
                        className={styles.numberOverlay}
                        style={{
                          fontSize: `${cellSize * 0.25}px`,
                          userSelect: "none",
                        }}
                      >
                        {numberLabelGrid[cellInputIndex] != -1
                          ? numberLabelGrid[cellInputIndex]
                          : ""}
                      </p>
                    </div>
                  ))}
                </div>

                {
                  // BOTTOM CLUE VIEWER TOOLBAR SECTION
                }
                <div
                  style={{
                    display: "flex",
                  }}
                >
                  <button
                    style={{
                      flexShrink: 0,
                      width: cellSize * 1.5,
                      height: cellSize * 1.5,
                      padding: 0,
                    }}
                    onClick={() => {
                      // you need the check on the list length otherwise nothing renders and everything breaks
                      // basically since the crossword is loaded asynchronously there is a brief moment where this can theoretically be called and there are no clues
                      // which breaks the entire app
                      // the same thing applies for the right chevron button
                      if (mergedClues.length > 0) {
                        const newIndex = mod(clueIndex - 1, mergedClues.length);
                        setClueIndex(newIndex);

                        for (let i = 0; i < grid.length; i++) {
                          if (
                            numberLabelGrid[i] ===
                              mergedClues[newIndex].number &&
                            crosswordInfo != null
                          ) {
                            const across =
                              newIndex < crosswordInfo.clues.across.length;
                            if (across) {
                              setVertical(false);
                            } else {
                              setVertical(true);
                            }
                            setSelectedCell(i);
                          }
                        }
                      }
                    }}
                  >
                    <img
                      src="/svg/chevron-left.svg"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                      }}
                    ></img>
                  </button>
                  <button
                    style={{
                      flex: 1,
                      minWidth: 0,
                      width: rowLength
                        ? (rowLength - 3) * cellSize + 10
                        : "auto",
                      overflowWrap: "anywhere",
                    }}
                    onClick={() => {
                      if (mergedClues.length > 0) {
                        const newIndex = mod(clueIndex, mergedClues.length);
                        setClueIndex(newIndex);

                        for (let i = 0; i < grid.length; i++) {
                          if (
                            numberLabelGrid[i] ===
                              mergedClues[newIndex].number &&
                            crosswordInfo != null
                          ) {
                            const across =
                              newIndex < crosswordInfo.clues.across.length;
                            if (across) {
                              setVertical(false);
                            } else {
                              setVertical(true);
                            }
                            setSelectedCell(i);
                          }
                        }
                      }
                    }}
                  >
                    {mergedClues.length > 0
                      ? `${mergedClues[clueIndex].number}. ${mergedClues[clueIndex].text}`
                      : "Loading clue..."}
                  </button>
                  <button
                    style={{
                      flexShrink: 0,
                      width: cellSize * 1.5,
                      height: cellSize * 1.5,
                      padding: 0,
                    }}
                    onClick={() => {
                      if (mergedClues.length > 0) {
                        const newIndex = mod(clueIndex + 1, mergedClues.length);
                        setClueIndex(newIndex);

                        for (let i = 0; i < grid.length; i++) {
                          if (
                            numberLabelGrid[i] ===
                              mergedClues[newIndex].number &&
                            crosswordInfo != null
                          ) {
                            const across =
                              newIndex < crosswordInfo.clues.across.length;
                            if (across) {
                              setVertical(false);
                            } else {
                              setVertical(true);
                            }
                            setSelectedCell(i);
                          }
                        }
                      }
                    }}
                  >
                    <img
                      src="/svg/chevron-right.svg"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                      }}
                    ></img>
                  </button>
                </div>

                {
                  // SUBMIT BUTTON SECTION
                  // THIS DIVIDER IS HERE TO PREVENT CONFUSION WHILE READING.
                }
                <div
                  style={{
                    display: "flex",
                    flex: "row",
                    gap: "20px",
                    alignItems: "center",
                    justifyContent: "center",
                    verticalAlign: "middle",
                  }}
                >
                  <button
                    className={styles.submitButton}
                    tabIndex={-1}
                    onClick={() => {
                      if (answerCheck()) {
                        setWon(true);
                      } else {
                        setWon(false);
                      }
                    }}
                  >
                    Submit
                  </button>
                  <p className={styles.winStatus}>
                    Status: {won ? "Completed" : "Not done yet"}
                  </p>
                  <button
                    onClick={() => {
                      setKeyboardActive(!keyboardActive);
                    }}
                    style={{
                      width: `${cellSize}px`,
                      height: `${cellSize}px`,
                      padding: "0",
                    }}
                  >
                    {" "}
                    {/* keyboard toggle button */}
                    <img
                      src={
                        keyboardActive
                          ? "/svg/keyboard-shown.svg"
                          : "/svg/keyboard-hidden.svg"
                      }
                    ></img>
                  </button>
                </div>

                {
                  // FIXED KEYBOARD
                }
                <div
                  style={{
                    height: 140, // 3 rows × 40px + 2×5px gaps + 2×5px theme padding
                    width: "100%",
                    visibility: keyboardActive ? "visible" : "hidden",
                    pointerEvents: keyboardActive ? "auto" : "none",
                  }}
                >
                  <Keyboard
                    className="Keyboard"
                    keyboardRef={(r) => (keyboard.current = r)}
                    layout={LAYOUTS}
                    layoutName={layout}
                    mergeDisplay
                    display={{
                      "{bksp}": "⌫",
                      "{enter}": "↵",
                      "{rev}": "🔄︎",
                    }}
                    onChange={onChange}
                    onKeyPress={onKeyPress}
                  ></Keyboard>
                </div>
              </div>
            </div>

            {
              // CLUES SECTION START
              // THIS COMMENT IS HERE AS A CLEAR DIVIDER SO I DO NOT GET MIXED UP.
              // HELL. READING MY OWN CODE IS HELL.
              //
              // it doesn't have to be justin :D
            }

            <div
              className={styles.clues}
              style={
                {
                  "--height": `${cellSize * rowCount}px`,
                } as React.CSSProperties
              }
            >
              <div className={styles.cluesAcrossContainer}>
                <h4
                  style={{
                    textAlign: "center",
                    marginBottom: "5px",
                  }}
                >
                  Across:
                </h4>
                <div className={styles.cluesAcross}>
                  <ul>
                    {crosswordInfo?.clues.across.map((clue) => {
                      return (
                        <li
                          className={styles.clue}
                          key={`across-${clue.number}`}
                        >
                          <button
                            tabIndex={-1}
                            onClick={() => {
                              let correctIndex = 0;
                              for (let i = 0; i < numberLabelGrid.length; i++) {
                                if (numberLabelGrid[i] == clue.number) {
                                  correctIndex = i;
                                }
                              }
                              for (
                                let i = 0;
                                i < crosswordInfo.clues.across.length;
                                i++
                              ) {
                                if (mergedClues[i].number == clue.number) {
                                  setClueIndex(i);
                                  break;
                                }
                              }
                              setVertical(false);
                              setSelectedCell(correctIndex);
                            }}
                          >
                            {clue.number}: {clue.text}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
              <div className={styles.cluesDownContainer}>
                <h4
                  style={{
                    textAlign: "center",
                    marginBottom: "5px",
                  }}
                >
                  Down:
                </h4>
                <div className={styles.cluesDown}>
                  <ul>
                    {crosswordInfo?.clues.down.map((clue) => {
                      return (
                        <li
                          className={styles.clue}
                          key={`across-${clue.number}`}
                        >
                          <button
                            tabIndex={-1}
                            onClick={() => {
                              let correctIndex = 0;
                              for (let i = 0; i < numberLabelGrid.length; i++) {
                                if (numberLabelGrid[i] == clue.number) {
                                  correctIndex = i;
                                }
                              }
                              for (
                                let i = crosswordInfo.clues.across.length;
                                i < mergedClues.length;
                                i++
                              ) {
                                if (mergedClues[i].number == clue.number) {
                                  setClueIndex(i);
                                  break;
                                }
                              }
                              setVertical(true);
                              setSelectedCell(correctIndex);
                            }}
                          >
                            {clue.number}: {clue.text}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          {
            // CLUES SECTION END
          }

          {
            // <button onClick={fillWithAnswers}>Complete grid</button>
          }
        </div>
      </div>
    </>
  );
}

export default Crossword;

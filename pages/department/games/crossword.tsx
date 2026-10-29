import { useEffect, useState, useRef } from "react";
import CrosswordReader from "../../../utils/crosswordReader";
import type { Clue } from "@xwordly/xword-parser";
import Keyboard, { type KeyboardReactInterface } from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";

function crossword() {
  const [won, setWon] = useState(false);
  const [selectedCell, setSelectedCell] = useState(0);

  // user info
  const [lastKey, setLastKey] = useState("");
  const [vertical, setVertical] = useState(true);

  // website puzzle state
  const [volume, setVolume] = useState(67);
  const [issue, setIssue] = useState(1);

  const [greetingsDisplaying, setGreetingsDisplaying] = useState(true);
  const [settingsDisplaying, setSettingsDisplaying] = useState(false);

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

  const SIDE = viewport.w >= 1024 ? 320 + 48 : 48;
  const CHROME_H = 220;

  const cellSize = Math.max(
    18,
    Math.min(
      44,
      Math.floor(
        Math.min(
          (viewport.w - SIDE) / (rowLength || 15),
          (viewport.h - CHROME_H) / (rowCount || 15),
        ),
      ),
    ),
  );

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
        console.log(mergedClues);

        // console.log(numberPlacer(loadingPuzzleSolution, loadingPuzzle.clues.across, loadingPuzzle.clues.down, loadingPuzzle.grid.width, loadingPuzzle.grid.height))
        console.log(loadingPuzzle);
      } catch {
        console.error("Unable to read crossword file. Lock in.");
      }
    };

    asyncPuzzleLoader();
  }, [volume, issue]);

  /*
      This useEffect() hook updates the most recent key.
    */
  useEffect(() => {
    if (!greetingsDisplaying) {
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

      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [selectedCell, vertical, puzzleSolution, rowLength, rowCount]);

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

  /* CURRENTLY UNUSED FUNCTION THAT FILLS THE WHOLE GRID
  function fillWithAnswers() {
    setGrid(
      puzzleSolution.map((cell) => {
        return cell === "N/A" ? "" : cell;
      }),
    );
  }
    */

  function Settings() {
    function changeSettingsDisplaying(): void {
      setSettingsDisplaying((current) => !current);
    }

    function LimitingInput() {
      const [vol, setVol] = useState("");
      const [iss, setIss] = useState("");

      const [volumeExists, setVolumeExists] = useState(false);
      const [issueExists, setIssueExists] = useState(false);

      const [submitClicked, setSubmitClicked] = useState(false);

      const handleChangeVol = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        // Replace anything that is NOT a digit with an empty string
        const cleanValue = inputValue.replace(/\D/g, "");
        setVol(cleanValue);
        setSubmitClicked(false);
      };

      const handleChangeIssue = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        // Replace anything that is NOT a digit with an empty string
        const cleanValue = inputValue.replace(/\D/g, "");
        setIss(cleanValue);
        setSubmitClicked(false);
      };

      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <p>Volume:</p>
          <input
            type="text"
            inputMode="numeric" // Optimizes the mobile keyboard layout
            value={vol}
            onChange={handleChangeVol}
            style={{
              outline: "none",
            }}
          />
          <p>Issue:</p>
          <input
            type="text"
            inputMode="numeric" // Optimizes the mobile keyboard layout
            value={iss}
            onChange={handleChangeIssue}
            style={{
              outline: "none",
            }}
          />
          <button
            style={{
              padding: "5px",
              outline: "none",
            }}
            onClick={async () => {
              changeSettingsDisplaying;
              setSubmitClicked(true);
              setVolumeExists(await fileExists(`/puzzles/crosswords/${vol}`));
              setIssueExists(
                await fileExists(`/puzzles/crosswords/${vol}/${iss}.puz`),
              );
              if (
                vol !== "" &&
                iss !== "" &&
                (await fileExists(`/puzzles/crosswords/${vol}/${iss}.puz`))
              ) {
                setGreetingsDisplaying(false);
                setVolume(Number(vol));
                setIssue(Number(iss));
                return;
              }
            }}
          >
            Change Crossword
          </button>
          <div
            style={{
              visibility:
                (!volumeExists || !issueExists) &&
                  vol != "" &&
                  iss != "" &&
                  submitClicked == true
                  ? "visible"
                  : "hidden",
            }}
          >
            <p>
              Error:{" "}
              {!issueExists || !volumeExists
                ? "The volume/issue you are looking for doesn't exist."
                : "No error."}
            </p>
          </div>
        </div>
      );
    }

    return (
      <>
        <button onClick={changeSettingsDisplaying} className="btn-modal">
          Settings
        </button>

        {settingsDisplaying && (
          <div
            className="modal"
            style={{
              display: "inline-flex",
              border: "2px solid black",
              borderRadius: "5px",
              zIndex: 1000,
            }}
          >
            <div onClick={changeSettingsDisplaying} className="overlay"></div>
            <div className="modal-content">
              <h2>Settings</h2>
              <LimitingInput />
              <button
                className="close-modal"
                onClick={changeSettingsDisplaying}
              >
                X
              </button>
            </div>
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

  function Greetings() {
    function LimitingInput() {
      const [vol, setVol] = useState("");
      const [iss, setIss] = useState("");

      const [volumeExists, setVolumeExists] = useState(false);
      const [issueExists, setIssueExists] = useState(false);

      const [submitClicked, setSubmitClicked] = useState(false);

      const handleChangeVol = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        // Replace anything that is NOT a digit with an empty string
        const cleanValue = inputValue.replace(/\D/g, "");
        setVol(cleanValue);
        setSubmitClicked(false);
      };

      const handleChangeIssue = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        // Replace anything that is NOT a digit with an empty string
        const cleanValue = inputValue.replace(/\D/g, "");
        setIss(cleanValue);
        setSubmitClicked(false);
      };

      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <h2>Welcome to the Spectator Crossword!</h2>
          <p>Type a Volume and Issue, then hit Submit to begin.</p>
          <p>Volume:</p>
          <input
            type="text"
            inputMode="numeric" // Optimizes the mobile keyboard layout
            value={vol}
            onChange={handleChangeVol}
            style={{
              outline: "none",
            }}
          />
          <p>Issue:</p>
          <input
            type="text"
            inputMode="numeric" // Optimizes the mobile keyboard layout
            value={iss}
            onChange={handleChangeIssue}
            style={{
              outline: "none",
            }}
          />
          <button
            style={{
              padding: "5px",
              outline: "none",
            }}
            onClick={async () => {
              setSubmitClicked(true);
              setVolumeExists(await fileExists(`/puzzles/crosswords/${vol}`));
              setIssueExists(
                await fileExists(`/puzzles/crosswords/${vol}/${iss}.puz`),
              );
              if (
                vol !== "" &&
                iss !== "" &&
                (await fileExists(`/puzzles/crosswords/${vol}/${iss}.puz`))
              ) {
                setGreetingsDisplaying(false);
                setVolume(Number(vol));
                setIssue(Number(iss));
                return;
              }
            }}
          >
            Submit
          </button>
          <div
            style={{
              visibility:
                (!volumeExists || !issueExists) &&
                  vol != "" &&
                  iss != "" &&
                  submitClicked == true
                  ? "visible"
                  : "hidden",
            }}
          >
            <p>
              Error:{" "}
              {!issueExists || !volumeExists
                ? "The volume/issue you are looking for doesn't exist."
                : "No error."}
            </p>
          </div>
        </div>
      );
    }

    return (
      <>
        {greetingsDisplaying && (
          <div
            className="modal"
            style={{
              display: "inline-flex",
              border: "2px solid black",
              borderRadius: "5px",
              zIndex: 1000,
            }}
          >
            <div className="overlay"></div>
            <div className="modal-content">
              <LimitingInput />
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <>
      <div
        className="all"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Greetings />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              width: rowLength ? rowLength * cellSize + 10 : "auto",
            }}
          >
            <div className="header" style={{ fontSize: "1rem" }}>
              <h2>{crosswordInfo?.title}</h2>
              <h2>{crosswordInfo?.author}</h2>
            </div>
            <div>
              <Settings />
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-start",
              gap: "20px",
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
                  className="grid"
                  style={{
                    display: "grid",
                    gridTemplateColumns: `repeat(${rowLength}, ${cellSize}px)`,
                    gridTemplateRows: `repeat(${rowCount}, ${cellSize}px)`,
                    width: "fit-content",
                  }}
                >
                  {grid.map((cellInput, cellInputIndex) => (
                    <div
                      className="container"
                      key={`${cellInputIndex}`}
                      style={{
                        width: `${cellSize}px`,
                        height: `${cellSize}px`,
                        paddingBottom: "2px",
                      }}
                    >
                      <button
                        className="cell"
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
                        className="numberOverlay"
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
                    className="submitButton"
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
                  <p className="winStatus">
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
            }

            <div
              className="clues"
              style={
                {
                  "--height": `${cellSize * rowCount}px`,
                } as React.CSSProperties
              }
            >
              <div className="cluesAcrossContainer">
                <h4
                  style={{
                    textAlign: "center",
                    marginBottom: "5px",
                  }}
                >
                  Across:
                </h4>
                <div className="cluesAcross">
                  <ul>
                    {crosswordInfo?.clues.across.map((clue) => {
                      return (
                        <li className="clue" key={`across-${clue.number}`}>
                          <button
                            tabIndex={-1}
                            onClick={() => {
                              let correctIndex = 0;
                              for (let i = 0; i < numberLabelGrid.length; i++) {
                                if (numberLabelGrid[i] == clue.number) {
                                  correctIndex = i;
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
              <div className="cluesDownContainer">
                <h4
                  style={{
                    textAlign: "center",
                    marginBottom: "5px",
                  }}
                >
                  Down:
                </h4>
                <div className="cluesDown">
                  <ul>
                    {crosswordInfo?.clues.down.map((clue) => {
                      return (
                        <li className="clue" key={`across-${clue.number}`}>
                          <button
                            tabIndex={-1}
                            onClick={() => {
                              let correctIndex = 0;
                              for (let i = 0; i < numberLabelGrid.length; i++) {
                                if (numberLabelGrid[i] == clue.number) {
                                  correctIndex = i;
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

export default crossword;

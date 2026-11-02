import { parse } from "@xwordly/xword-parser";
import type { Clue, Puzzle } from "@xwordly/xword-parser";
import { Buffer } from "buffer";

(globalThis as typeof globalThis & { Buffer: typeof Buffer }).Buffer = Buffer;

// this function basically just reorders the clues because the parser sucks ass
function renumberClues(puzzle: Puzzle): Puzzle {
  const { cells, width, height } = puzzle.grid;
  const originalClues = [...puzzle.clues.across, ...puzzle.clues.down];

  const across: Clue[] = [];
  const down: Clue[] = [];

  let clueIndex = 0;
  let number = 0;

  // checks if a cell is null or out of bounds
  function isBlocked(row: number, col: number): boolean {
    if (row < 0 || row >= height || col < 0 || col >= width) {
      return true;
    }

    return cells[row][col].isBlack;
  }

  // Adds a clue to a list
  function addClue(list: Clue[]) {
    const clue = originalClues[clueIndex];

    if (!clue) {
      throw new Error("Not enough clues for this grid.");
    }

    list.push({ number, text: clue.text });
    clueIndex++;
  }

  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      if (isBlocked(row, col)) continue;

      const startsAcross = isBlocked(row, col - 1) && !isBlocked(row, col + 1);

      const startsDown = isBlocked(row - 1, col) && !isBlocked(row + 1, col);

      if (!startsAcross && !startsDown) continue;

      number++;

      // The file stores Across before Down at each starting cell.
      if (startsAcross) addClue(across);
      if (startsDown) addClue(down);
    }
  }

  if (clueIndex !== originalClues.length) {
    throw new Error("Too many clues for this grid.");
  }

  return { ...puzzle, clues: { across, down } };
}

export default async function CrosswordReader(volume: number, issue: number) {
  // await receive url
  const response = await fetch(`/puzzles/crosswords/${volume}/${issue}.puz`);
  if (!response.ok) {
    throw new Error(`Unable to load puzzle: ${response.status}`);
  }

  const blob = await response.blob();
  const file = new File([blob], "wsj.puz", {
    type: "application/octet-stream",
  });

  const arrayBuffer = await file.arrayBuffer();
  const parsed = parse(arrayBuffer, {
    filename: file.name,
  });

  return renumberClues(parsed);
}

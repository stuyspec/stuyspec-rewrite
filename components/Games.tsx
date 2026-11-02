import Image from "next/image";
import { useRouter } from "next/router";

export default function Games() {
  const router = useRouter();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1 style={{ display: "inline" }}>Games</h1>
      <div style={{ display: "grid" }}>
        <button
          onClick={async () => {
            await router.push("games/crossword");
          }}
        >
          <div className="game">
            <div>
              <Image
                src="/svg/crossword.svg"
                alt="A symbol representing a crossword puzzle."
                width={25}
                height={25}
              />
            </div>
            <div
              style={{
                alignItems: "center",
                flex: 1,
                minWidth: 0,
              }}
            >
              <h1 style={{ textAlign: "center" }}>Crossword</h1>
              <p style={{ overflowWrap: "anywhere", textAlign: "center" }}>
                Fill in the blanks using the clues provided to complete the
                puzzle.
              </p>
            </div>
          </div>
        </button>
        <button
          onClick={async () => {
            await router.push("games/sudoku");
          }}
        >
          <div className="game">
            <div>
              <Image
                src="/svg/crossword.svg"
                alt="A symbol representing a crossword puzzle."
                width={25}
                height={25}
              />
            </div>
            <div
              style={{
                alignItems: "center",
                flex: 1,
                minWidth: 0,
              }}
            >
              <h1 style={{ textAlign: "center" }}>Sudoku</h1>
              <p style={{ overflowWrap: "anywhere", textAlign: "center" }}>
                Use logic and your stuyvesant brain to fill in the missing
                numbers.
              </p>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}

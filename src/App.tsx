import { useEffect, useState } from "react";
import Grid from "./Grid";

const allTunings = [
  { name: "E-Standard", notes: ["E", "A", "D", "G", "B", "E"], strings: 6 },
  { name: "D-Standard", notes: ["D", "G", "C", "F", "A", "D"], strings: 6 },
  { name: "C-Standard", notes: ["C", "F", "A#", "D#", "G", "C"], strings: 6 },
  { name: "Drop D", notes: ["D", "A", "D", "G", "B", "E"], strings: 6 },
  { name: "Ukulele Standard", notes: ["G", "C", "E", "A"], strings: 4 },
  { name: "Ukulele Low G", notes: ["F", "C", "E", "A"], strings: 4 },
  { name: "7-String Standard", notes: ["B", "E", "A", "D", "G", "B", "E"], strings: 7 },
  { name: "8-String Standard", notes: ["F#", "B", "E", "A", "D", "G", "B", "E"], strings: 8 },
];

function App() {
  const [tuning, setTuning] = useState(["E", "A", "D", "G", "B", "E"]);
  const [strings, setStrings] = useState(6);
  const [frets, setFrets] = useState(24);
  const [notes, setNotes] = useState<string[]>([]);

  /*
  const generateNotes = () => {
    const result: string[] = [];
    for (let fret = 0; fret <= frets; fret++) {
      result.push(getNoteAtFret(tuning, fret));
    }
    setNotes(result);
  };
  */

  return (
    <div style={{ fontFamily: "sans-serif", padding: "1rem" }}>
      <h1>Fretboard</h1>

      <div style={{ marginBottom: "1rem" }}>
        <label>
          Strings:{" "}
          <select
            value={strings}
            onChange={(e) => {
              const newStrings = Number(e.target.value);
              setStrings(newStrings);

              // Reset tuning to the first valid option for this string count
              const firstTuning = allTunings.find(t => t.strings === newStrings);
              if (firstTuning) setTuning(firstTuning.notes);
            }}
            style={{ marginRight: "1rem" }}
          >
            <option value={6}>6-String</option>
            <option value={7}>7-String</option>
            <option value={8}>8-String</option>
            <option value={4}>Ukulele</option>
          </select>
        </label>

        <label>
          Tuning:{" "}
          <select
            value={tuning.join(" ")}
            onChange={(e) => setTuning(e.target.value.split(" "))}
            style={{ marginRight: "1rem" }}
          >
            {allTunings
              .filter((t) => t.strings === strings)
              .map((t) => (
                <option key={t.name} value={t.notes.join(" ")}>
                  {t.name}
                </option>
              ))}
          </select>
        </label>

        <label>
          Frets:{" "}
          <input
            type="number"
            value={frets}
            onChange={(e) => setFrets(Number(e.target.value))}
            min={18}
            max={24}
          />
        </label>

      {/*
        <button onClick={generateNotes} style={{ marginLeft: "1rem" }}>
          Generate
        </button>
      */}
      </div>

      {notes.length > 0 && (
        <div>
          <h2>Notes on the {tuning} string:</h2>
          <p>{notes.join(" - ")}</p>
        </div>
      )}

      <Grid rows={strings-1} cols={frets-1} />

    </div>

    
  );
}

export default App;

import { useState } from "react";
import Grid from "./Grid";

// Define your notes
const NOTES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

function getNoteAtFret(openNote: string, fret: number): string {
  const indexOfOpen = NOTES.indexOf(openNote);
  if (indexOfOpen === -1) throw new Error(`Invalid note: ${openNote}`);
  const index = (indexOfOpen + fret) % NOTES.length;
  return NOTES[index] as string;
}

function App() {
  const [tuning, setTuning] = useState("E");
  const [strings, setStrings] = useState(6);
  const [frets, setFrets] = useState(24);
  const [notes, setNotes] = useState<string[]>([]);

  const generateNotes = () => {
    const result: string[] = [];
    for (let fret = 0; fret <= frets; fret++) {
      result.push(getNoteAtFret(tuning, fret));
    }
    setNotes(result);
  };

  return (
    <div style={{ fontFamily: "sans-serif", padding: "1rem" }}>
      <h1>Fretboard</h1>

      <div style={{ marginBottom: "1rem" }}>
        <label>
          Tuning:{" "}
          <select
            value={tuning}
            onChange={(e) => setTuning(e.target.value)}
            style={{ marginRight: "1rem" }}
          >
            <option value="E">E</option>
            <option value="A">A</option>
            <option value="D">D</option>
            <option value="G">G</option>
            <option value="B">B</option>
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

        <label>
          Strings:{" "}
          <input
            type="number"
            value={strings}
            onChange={(e) => setStrings(Number(e.target.value))}
            min={4}
            max={12}
          />
        </label>

        <button onClick={generateNotes} style={{ marginLeft: "1rem" }}>
          Generate
        </button>
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

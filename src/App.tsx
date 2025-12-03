import { useEffect, useState } from "react";
import Grid from "./Grid";

const allTunings = [
  // 6-String Tunings
  { name: "E-Standard", notes: ["E", "B", "G", "D", "A", "E"], strings: 6 },
  { name: "D#-Standard", notes: ["D#", "A#", "F#", "C#", "G#", "D#"], strings: 6 },
  { name: "D-Standard", notes: ["D", "A", "F", "C", "G", "D"], strings: 6 },
  { name: "C#-Standard", notes: ["C#", "G#", "E", "B", "F#", "C#"], strings: 6 },
  { name: "C-Standard", notes: ["C", "G", "D#", "A#", "F", "C"], strings: 6 },
  { name: "Drop D", notes: ["E", "B", "G", "D", "A", "D"], strings: 6 },
  { name: "Drop C#", notes: ["D#", "A#", "F#", "C#", "G#", "C#"], strings: 6 },
  { name: "Drop C", notes: ["D", "A", "F", "C", "G", "C"], strings: 6 },
  { name: "Drop B", notes: ["C#", "G#", "E", "B", "F#", "B"], strings: 6 },
  { name: "Drop A", notes: ["B", "F#", "D", "A", "E", "A"], strings: 6 },
  { name: "Open D", notes: ["D", "A", "F#", "D", "A", "D"], strings: 6 },
  { name: "Open G", notes: ["D", "B", "G", "D", "G", "D"], strings: 6 },
  { name: "Open C", notes: ["C", "G", "C", "G", "C", "E"], strings: 6 },

  // Ukulele Tunings
  { name: "Ukulele Standard", notes: ["A", "E", "C", "G"], strings: 4 },
  { name: "Drop F", notes: ["A", "E", "C", "F"], strings: 4 },

  // 7-String Tunings
  { name: "7-String Standard", notes: ["E", "B", "G", "D", "A", "E", "B"], strings: 7 },
  { name: "Drop A", notes: ["E", "B", "G", "D", "A", "E", "A"], strings: 7 },
  { name: "Drop G#", notes: ["D#", "A#", "F#", "C#", "G#", "D#", "G#"], strings: 7 },
  { name: "Drop G", notes: ["D", "A", "F", "C", "G", "D", "G"], strings: 7 },

  // 8-String Tunings
  { name: "8-String Standard", notes: ["E", "B", "G", "D", "A", "E", "B", "F#"], strings: 8 },
  { name: "Drop E", notes: ["E", "B", "G", "D", "A", "E", "B", "E"], strings: 8 },
  { name: "Drop D#", notes: ["D#", "A#", "D#", "G#", "C#", "F#", "A#", "D#"], strings: 8 },
  { name: "Drop D", notes: ["D", "A", "D", "G", "C", "F", "A", "D"], strings: 8 },
];


const SCALE_INTERVALS: Record<string, number[]> = {
  "major": [0, 2, 4, 5, 7, 9, 11],        // Ionian
  "minor": [0, 2, 3, 5, 7, 8, 10],       // Aeolian
  "harmonic minor": [0, 2, 3, 5, 7, 8, 11],
  "melodic minor": [0, 2, 3, 5, 7, 9, 11],
  "major pentatonic": [0, 2, 4, 7, 9],
  "minor pentatonic": [0, 3, 5, 7, 10],
  "blues": [0, 3, 5, 6, 7, 10],          // minor blues
  "dorian": [0, 2, 3, 5, 7, 9, 10],
  "mixolydian": [0, 2, 4, 5, 7, 9, 10],
  "lydian": [0, 2, 4, 6, 7, 9, 11],
  "phrygian": [0, 1, 3, 5, 7, 8, 10],
  "locrian": [0, 1, 3, 5, 6, 8, 10],
  "chromatic": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
};

const CHROMATIC_NOTES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

function generateFretboard(tuning: string[], frets: number): string[][] {
  return tuning.map((openNote) => {
    const stringNotes: string[] = [];
    const startIndex = CHROMATIC_NOTES.indexOf(openNote);
    if (startIndex === -1) throw new Error(`Invalid note in tuning: ${openNote}`);

    for (let fret = 0; fret <= frets; fret++) {
      const noteIndex = (startIndex + fret) % CHROMATIC_NOTES.length;
      stringNotes.push(CHROMATIC_NOTES[noteIndex]);
    }

    return stringNotes;
  });
}

function getScaleNotes(scale: string, root: string): string[] {
  const intervals = SCALE_INTERVALS[scale.toLowerCase()];
  if (!intervals) throw new Error(`Scale "${scale}" not found`);

  const rootIndex = CHROMATIC_NOTES.findIndex((n) => n.toUpperCase() === root.toUpperCase());
  if (rootIndex === -1) throw new Error(`Root note "${root}" not valid`);

  return intervals.map((interval) => CHROMATIC_NOTES[(rootIndex + interval) % CHROMATIC_NOTES.length]);
}

function App() {
  const [tuning, setTuning] = useState(["E", "B", "G", "D", "A", "E"]);
  const [strings, setStrings] = useState(6);
  const [frets, setFrets] = useState(24);
  const [notes, setNotes] = useState<string[]>([]);
  const [scale, setScale] = useState("minor pentatonic");
  const [scaleRoot, setScaleRoot] = useState("A");

  const fretboard = generateFretboard(tuning, frets);
  console.log(fretboard);

  const scaleNotes = getScaleNotes(scale, scaleRoot);
  console.log(scaleNotes);

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

      </div>
      <div style={{ marginBottom: "1rem" }}>

        <label>
          Scale:{" "}
          <select
            value={scaleRoot}
            onChange={(e) => setScaleRoot(e.target.value)}
            style={{ marginRight: "1rem" }}
          >
            {CHROMATIC_NOTES.map((note) => (
              <option key={note} value={note}>
                {note}
              </option>
            ))}
          </select>
        </label>

        <label>
          <select
            value={scale}
            onChange={(e) => setScale(e.target.value)}
          >
            <option value="major">Major</option>
            <option value="minor">Minor</option>
            <option value="harmonic minor">Harmonic Minor</option>
            <option value="melodic minor">Melodic Minor</option>
            <option value="major pentatonic">Major Pentatonic</option>
            <option value="minor pentatonic">Minor Pentatonic</option>
            <option value="blues">Blues</option>
            <option value="dorian">Dorian</option>
            <option value="mixolydian">Mixolydian</option>
            <option value="lydian">Lydian</option>
            <option value="phrygian">Phrygian</option>
            <option value="locrian">Locrian</option>
            <option value="chromatic">Chromatic</option>
          </select>
        </label>

      </div>
      {notes.length > 0 && (
        <div>
          <h2>Notes on the {tuning} string:</h2>
          <p>{notes.join(" - ")}</p>
        </div>
      )}

      <Grid rows={strings-1} cols={frets} pitches={fretboard} scale={scaleNotes} />

    </div>

    
  );
}

export default App;

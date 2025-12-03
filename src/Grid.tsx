import React, { useState, useRef } from "react";

interface NoteWithOctave {
  note: string;
  octave: number;
}

interface Note {
  active: boolean;
  pitch: string;
  octave: number;
}

interface GridProps {
  rows: number;
  cols: number;
  pitches: NoteWithOctave[][];
  scale: string[];
}

const Grid: React.FC<GridProps> = ({ rows, cols, pitches, scale }) => {
  const cellSize = 60;
  const lineColor = "#ccc";

  const generateGrid = (r: number, c: number): Note[][] =>
    Array.from({ length: r + 1 }, (_, row) =>
      Array.from({ length: c + 1 }, (_, col) => ({
        active: false,
        pitch: pitches[row][col].note,
        octave: pitches[row][col].octave,
      }))
    );

  const lastDimensions = useRef({ rows, cols });
  const [notes, setNotes] = useState<Note[][]>(() => generateGrid(rows, cols));

  const [scaleHighlight, setScaleHighlight] = useState(false);
  const [showOctaves, setShowOctaves] = useState(true);

  const handleGenerateGrid = () => {
    setNotes(generateGrid(rows, cols));
    lastDimensions.current = { rows, cols };
  };

  const toggleNote = (r: number, c: number) => {
    setNotes(prev =>
      prev.map((row, ri) =>
        row.map((note, ci) =>
          ri === r && ci === c
            ? { ...note, active: !note.active }
            : note
        )
      )
    );
  };

  return (
    <div>
      <button
        onClick={handleGenerateGrid}
        style={{
          marginBottom: "1rem",
          padding: "0.5rem 1rem",
          border: "1px solid #ccc",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        Generate Grid
      </button>

      <button
        onClick={() => setScaleHighlight(prev => !prev)}
        style={{
          marginBottom: "1rem",
          marginLeft: "1rem",
          padding: "0.5rem 1rem",
          border: "1px solid #ccc",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        {scaleHighlight ? "Key Highlight On" : "Key Highlight Off"}
      </button>

      <button
        onClick={() => setShowOctaves(prev => !prev)}
        style={{
          marginBottom: "1rem",
          marginLeft: "1rem",
          padding: "0.5rem 1rem",
          border: "1px solid #ccc",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        {showOctaves ? "Octaves On" : "Octaves Off"}
      </button>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "60vh",
          width: "100vw",
        }}
      >
        {/* Fret numbers */}
        <div
          style={{
            position: "relative",
            width: lastDimensions.current.cols * cellSize + 1,
            height: 30,
            marginBottom: "0.5rem",
          }}
        >
          {Array.from({ length: lastDimensions.current.cols }, (_, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                left: i * cellSize,
                top: 0,
                width: cellSize,
                textAlign: "center",
                fontSize: "14px",
                fontWeight: "bold",
                color: "#ccc",
              }}
            >
              {i + 1}
            </div>
          ))}
        </div>

        <div
          style={{
            position: "relative",
            width: lastDimensions.current.cols * cellSize + 1,
            height: lastDimensions.current.rows * cellSize + 1,
            backgroundImage: `
              linear-gradient(to right, ${lineColor} 1px, transparent 1px),
              linear-gradient(to bottom, ${lineColor} 1px, transparent 1px)
            `,
            backgroundSize: `${cellSize}px ${cellSize}px`,
          }}
        >
          {notes.map((row, r) =>
            row.map((note, c) => {
              const isOpenNote = c === 0;
              const x = isOpenNote ? -cellSize / 2 : (c - 1) * cellSize + cellSize / 2;
              const y = r * cellSize;

              // Compute color dynamically
              const backgroundColor =
                scaleHighlight && scale.includes(note.pitch)
                  ? "#4caf50"
                  : note.active
                  ? "#4caf50"
                  : "#242424";

              return (
                <div
                  key={`${r}-${c}`}
                  title={`${note.pitch}${note.octave}`}
                  onClick={() => toggleNote(r, c)}
                  style={{
                    position: "absolute",
                    left: x,
                    top: y,
                    width: cellSize - 30,
                    height: cellSize - 30,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: backgroundColor,
                    border: "1px solid #ccc",
                    borderRadius: 12,
                    transform: "translate(-50%, -50%)",
                    cursor: "pointer",
                    transition: "background 0.2s ease",
                    fontSize: "14px",
                    fontWeight: "bold",
                    color: "#fff",
                  }}
                >
                  {note.pitch}
                  {showOctaves && (
                    <span style={{ fontSize: "9px", opacity: 0.7, marginLeft: "2px" }}>{note.octave}</span>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default Grid;

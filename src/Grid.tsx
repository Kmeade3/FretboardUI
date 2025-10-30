import React, { useState, useRef } from "react";

interface Note {
  active: boolean;
  color: string;
  pitch: string;
}

interface GridProps {
  rows: number;
  cols: number;
}

const Grid: React.FC<GridProps> = ({ rows, cols }) => {
  const cellSize = 60;
  const lineColor = "#ccc";

  const generateGrid = (r: number, c: number): Note[][] =>
    Array.from({ length: r + 1}, (_, row) =>
      Array.from({ length: c }, (_, col) => ({
        active: false,
        color: "#999",
        pitch: `Note-${row}-${col}`,
      }))
    );

  // ✅ Store the last used grid dimensions
  const lastDimensions = useRef({ rows, cols });

  // ✅ Initialize once using the starting props
  const [notes, setNotes] = useState<Note[][]>(() =>
    generateGrid(rows, cols)
  );

  // ✅ Only regenerate when the button is pressed
  const handleGenerateGrid = () => {
    setNotes(generateGrid(rows, cols));
    lastDimensions.current = { rows, cols };
  };

  // ✅ Modify notes without regenerating
  const toggleNote = (r: number, c: number) => {
    setNotes(prev =>
      prev.map((row, ri) =>
        row.map((note, ci) =>
          ri === r && ci === c
            ? { ...note, active: !note.active, color: note.active ? "#999" : "#4caf50" }
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
            const x = c * cellSize + cellSize / 2;
            const y = r * cellSize;

            return (
              <div
                key={`${r}-${c}`}
                title={note.pitch}
                onClick={() => toggleNote(r, c)}
                style={{
                  position: "absolute",
                  left: x,
                  top: y,
                  width: 12,
                  height: 12,
                  background: note.color,
                  borderRadius: "50%",
                  transform: "translate(-50%, -50%)",
                  cursor: "pointer",
                  transition: "background 0.2s ease",
                }}
              />
            );
          })
        )}
      </div>
    </div>
  );
};

export default Grid;

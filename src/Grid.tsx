import React, { useState } from "react";

interface Note {
  active: boolean;
  color: string;
  pitch: string; // e.g. "C4", "D#4", etc.
}

interface GridProps {
  rows: number;
  cols: number;
}

const Grid: React.FC<GridProps> = ({ rows, cols }) => {
  const cellSize = 60;
  const lineColor = "#ccc";

  // Initialize notes as a 2D array
  const [notes, setNotes] = useState<Note[][]>(
    Array.from({ length: rows }, (_, row) =>
      Array.from({ length: cols }, (_, col) => ({
        active: false,
        color: "#999",
        pitch: `Note-${row}-${col}`,
      }))
    )
  );

  // Toggle note when clicked
  const toggleNote = (r: number, c: number) => {
    setNotes((prev) =>
      prev.map((row, rowIdx) =>
        row.map((note, colIdx) =>
          rowIdx === r && colIdx === c
            ? {
                ...note,
                active: !note.active,
                color: note.active ? "#999" : "#4caf50", // gray → green toggle
              }
            : note
        )
      )
    );
  };

  return (
    <div
      style={{
        position: "relative",
        width: cols * cellSize + 1,
        height: rows * cellSize + 1,
        backgroundImage: `
          linear-gradient(to right, ${lineColor} 1px, transparent 1px),
          linear-gradient(to bottom, ${lineColor} 1px, transparent 1px)
        `,
        backgroundSize: `${cellSize}px ${cellSize}px`,
      }}
    >
      {notes.map((row, r) =>
        row.map((note, c) => {
          const x = c * cellSize + cellSize / 2; // between vertical lines
          const y = r * cellSize;                // on horizontal line

          return (
            <div
              key={`${r}-${c}`}
              onClick={() => toggleNote(r, c)}
              title={note.pitch}
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
  );
};

export default Grid;

# Project Structure

## Directory Organization

```
/
├── src/                    # Source code
│   ├── App.tsx            # Main application component with state and logic
│   ├── Grid.tsx           # Fretboard grid visualization component
│   ├── main.tsx           # React entry point
│   ├── index.css          # Global styles
│   ├── App.css            # App-specific styles
│   └── assets/            # Static assets (images, icons)
├── public/                # Public static files
├── .kiro/                 # Kiro AI assistant configuration
│   └── steering/          # AI steering rules
├── node_modules/          # Dependencies
└── dist/                  # Build output (generated)
```

## Code Organization Patterns

### Component Structure

- **App.tsx**: Container component managing application state
  - Tuning configuration (strings, tuning, frets)
  - Scale selection (root note, scale type)
  - Fretboard generation logic
  - Scale calculation utilities
  
- **Grid.tsx**: Presentational component for fretboard rendering
  - Grid generation and rendering
  - Note interaction (click to toggle)
  - Scale highlighting toggle
  - Visual layout with absolute positioning

### Data Models

- Musical data (tunings, scales) defined as constants in App.tsx
- Note interface: `{ active: boolean, pitch: string }`
- Grid props: `{ rows, cols, pitches, scale }`

### Styling Approach

- Inline styles using React style objects
- No CSS modules or styled-components
- Dynamic styling based on state (active notes, scale highlighting)
- Responsive layout using flexbox

## Configuration Files

- `tsconfig.json` - TypeScript project references
- `tsconfig.app.json` - App-specific TypeScript config
- `tsconfig.node.json` - Node/build TypeScript config
- `vite.config.ts` - Vite build configuration
- `eslint.config.js` - ESLint rules
- `package.json` - Dependencies and scripts

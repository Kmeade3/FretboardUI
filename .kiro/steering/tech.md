# Technology Stack

## Core Technologies

- **Framework**: React 19.1.1 with TypeScript
- **Build Tool**: Vite 7.1.7
- **Language**: TypeScript 5.9.3
- **Styling**: Inline styles (no CSS framework)

## Development Tools

- **Linting**: ESLint 9.36.0 with TypeScript ESLint
- **Type Checking**: TypeScript with strict mode
- **Dev Server**: Vite with HMR (Hot Module Replacement)

## Common Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Run linter
npm run lint

# Preview production build
npm run preview
```

## Build Configuration

- Uses `@vitejs/plugin-react` for Fast Refresh
- Module type: ES modules
- TypeScript project references for app and node configs
- Output directory: `dist/`

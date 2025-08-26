# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Build**: `npm run build` - Compiles TypeScript to `dist/` directory
- **Development**: `npm run dev` - Runs TypeScript compiler in watch mode
- **Testing**: `npm run test` - Runs full test suite (Prettier, XO linter, and AVA tests)
- **Run game**: `npm start` or `node dist/cli.js` after building

## Architecture

This is a terminal-based Snake game built with React and Ink. The architecture follows these key patterns:

### Core Components
- **App** (`source/app.tsx`) - Main game component containing all game logic, state management, and rendering
- **CLI** (`source/cli.tsx`) - Entry point that renders the App component
- **useInterval** (`source/useInterval.ts`) - Custom React hook for game loop timing

### Game Architecture
- Game runs on 16x16 grid with coordinate-based positioning
- Snake movement controlled by arrow keys, game loop runs at 100ms intervals
- State managed through React hooks: snake segments, food position, direction, score
- Game ends when snake collides with itself
- Uses Ink's Box and Text components for terminal UI rendering

### Code Style
- Uses XO linter with React extensions and Prettier formatting
- TypeScript with ES modules
- Follows React functional component patterns with hooks
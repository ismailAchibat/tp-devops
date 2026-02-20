# DevOps Wordle - Frontend

A modern, responsive Wordle-style game built with Next.js 15, React 19, and Tailwind CSS 4, featuring DevOps terminology.

## Features

- 🎮 Classic Wordle gameplay
- 🎨 Modern, gradient UI design
- 🌓 Dark mode support
- ⌨️ Physical and on-screen keyboard support
- 📱 Fully responsive design
- 🏗️ Clean architecture with separated concerns
- 🎯 Type-safe with TypeScript

## Architecture

### Directory Structure

```
frontend/
├── app/
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout with metadata
│   └── page.tsx             # Main game page
├── components/
│   ├── WordleGame.tsx       # Main game container
│   ├── GuessRow.tsx         # Individual guess row component
│   ├── Keyboard.tsx         # On-screen keyboard
│   └── GameModal.tsx        # Game over modal
├── hooks/
│   └── useWordleGame.ts     # Game logic & state management
├── lib/
│   └── api.ts               # API service layer
└── types/
    └── game.ts              # TypeScript type definitions
```

### Clean Architecture

1. **Separation of Concerns**
   - `lib/api.ts`: All backend API calls isolated
   - `hooks/useWordleGame.ts`: Game state management & business logic
   - `components/`: Pure UI components
   - `types/`: Shared type definitions

2. **Type Safety**
   - Complete TypeScript type definitions
   - Strong typing across all layers

3. **Component Design**
   - Reusable, composable components
   - Props-driven interfaces
   - Single responsibility principle

## Setup & Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

Server runs on `http://localhost:3000`

## Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## How to Play

1. **Objective**: Guess a 5-letter DevOps term in 6 tries
2. **Guess**: Type or click letters to form a word
3. **Submit**: Press Enter or click ENTER
4. **Feedback Colors**:
   - 🟩 **Green**: Correct letter in correct position
   - 🟨 **Yellow**: Correct letter in wrong position
   - ⬛ **Gray**: Letter not in the word

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **UI Library**: React 19
- **Styling**: Tailwind CSS 4
- **Language**: TypeScript 5
- **State Management**: React Hooks
- **API Client**: Fetch API

## Key Components

### WordleGame

Main game container that orchestrates all components and manages game state through the `useWordleGame` hook.

### useWordleGame Hook

Custom hook that handles:

- Game state management
- API communications
- Keyboard input handling
- Letter status tracking

### GuessRow

Displays a single guess with color-coded letter boxes. Supports both completed guesses and the current input.

### Keyboard

On-screen keyboard with color-coded keys based on letter status. Fully accessible and responsive.

### GameModal

Modal dialog shown at game end, displaying results and offering replay option.

## API Integration

The frontend communicates with the backend through the `GameApiService` class:

```typescript
// Start new game
const game = await GameApiService.startNewGame();

// Submit guess
const result = await GameApiService.submitGuess(gameId, word);

// Get game status
const status = await GameApiService.getGameStatus(gameId);
```

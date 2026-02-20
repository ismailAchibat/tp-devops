# DevOps Wordle Backend

Simple Node.js/Express backend for a DevOps-themed Wordle game.

## Features

- 40+ DevOps-related 5-letter words
- RESTful API for game management
- In-memory game sessions
- Wordle-style guess validation

## Setup

```bash
npm install
npm start
```

Server runs on `http://localhost:3001`

## API Endpoints

### Start a New Game
```
POST /api/game/new
Response: { gameId, maxGuesses, message }
```

### Submit a Guess
```
POST /api/game/:gameId/guess
Body: { word: "AZURE" }
Response: { guess, result, gameOver, won, guessesRemaining, targetWord? }
```

Result array values:
- `"correct"` - letter is in the right position
- `"present"` - letter is in the word but wrong position
- `"absent"` - letter is not in the word

### Get Game Status
```
GET /api/game/:gameId
Response: { gameId, guesses, maxGuesses, gameOver, won, targetWord? }
```

### Get All Words (Testing)
```
GET /api/words
Response: { count, words }
```

### Health Check
```
GET /health
Response: { status, timestamp }
```

## Example Usage

```javascript
// Start a new game
const response = await fetch('http://localhost:3001/api/game/new', {
  method: 'POST'
});
const { gameId } = await response.json();

// Make a guess
const guessResponse = await fetch(`http://localhost:3001/api/game/${gameId}/guess`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ word: 'AZURE' })
});
const result = await guessResponse.json();
```

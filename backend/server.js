const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS middleware for frontend communication
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept",
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

// Load words from JSON file
const wordsData = JSON.parse(
  fs.readFileSync(path.join(__dirname, "words.json"), "utf-8"),
);
const wordsByLength = wordsData.words;
const availableLengths = Object.keys(wordsByLength).map(Number).sort();

// Get a random word
function getRandomWord() {
  const randomLength =
    availableLengths[Math.floor(Math.random() * availableLengths.length)];
  const wordsOfLength = wordsByLength[randomLength];
  return {
    word: wordsOfLength[Math.floor(Math.random() * wordsOfLength.length)],
    length: randomLength,
  };
}

// Check if word exists in word lists
function isValidWord(word, length) {
  const wordsOfLength = wordsByLength[length];
  return wordsOfLength && wordsOfLength.includes(word.toUpperCase());
}

// Store game sessions (in-memory, resets on server restart)
const gameSessions = new Map();

// Generate a unique game ID
function generateGameId() {
  return Math.random().toString(36).substring(2, 15);
}

// Routes

// Get all words (for testing/admin)
app.get("/api/words", (req, res) => {
  const totalWords = Object.values(wordsByLength).reduce(
    (sum, arr) => sum + arr.length,
    0,
  );
  res.json({ count: totalWords, words: wordsByLength, availableLengths });
});

// Start a new game
app.post("/api/game/new", (req, res) => {
  const gameId = generateGameId();
  const { word, length } = getRandomWord();

  gameSessions.set(gameId, {
    targetWord: word,
    wordLength: length,
    guesses: [],
    maxGuesses: 6,
    gameOver: false,
    won: false,
    createdAt: new Date(),
  });

  res.json({
    gameId,
    wordLength: length,
    maxGuesses: 6,
    message: "New game started!",
  });
});

// Get game status
app.get("/api/game/:gameId", (req, res) => {
  const { gameId } = req.params;
  const game = gameSessions.get(gameId);

  if (!game) {
    return res.status(404).json({ error: "Game not found" });
  }

  res.json({
    gameId,
    guesses: game.guesses,
    maxGuesses: game.maxGuesses,
    gameOver: game.gameOver,
    won: game.won,
    targetWord: game.gameOver ? game.targetWord : undefined,
  });
});

// Submit a guess
app.post("/api/game/:gameId/guess", (req, res) => {
  const { gameId } = req.params;
  const { word } = req.body;

  const game = gameSessions.get(gameId);

  if (!game) {
    return res.status(404).json({ error: "Game not found" });
  }

  if (game.gameOver) {
    return res.status(400).json({ error: "Game already over" });
  }

  if (!word || word.length !== game.wordLength) {
    return res
      .status(400)
      .json({ error: `Word must be ${game.wordLength} letters` });
  }

  const guess = word.toUpperCase();

  // Check if word is in the word list
  if (!isValidWord(guess, game.wordLength)) {
    return res.status(400).json({ error: "Word not in list" });
  }

  // Check the guess against the target word
  const result = checkGuess(guess, game.targetWord);

  game.guesses.push({
    word: guess,
    result,
  });

  // Check win condition
  if (guess === game.targetWord) {
    game.won = true;
    game.gameOver = true;
  } else if (game.guesses.length >= game.maxGuesses) {
    game.gameOver = true;
  }

  res.json({
    guess,
    result,
    gameOver: game.gameOver,
    won: game.won,
    guessesRemaining: game.maxGuesses - game.guesses.length,
    targetWord: game.gameOver ? game.targetWord : undefined,
  });
});

// Check guess against target word
function checkGuess(guess, target) {
  const result = [];
  const targetLetters = target.split("");
  const guessLetters = guess.split("");
  const used = new Array(5).fill(false);

  // First pass: mark correct positions
  for (let i = 0; i < 5; i++) {
    if (guessLetters[i] === targetLetters[i]) {
      result[i] = "correct";
      used[i] = true;
    }
  }

  // Second pass: mark present but wrong position
  for (let i = 0; i < 5; i++) {
    if (result[i] === "correct") continue;

    let found = false;
    for (let j = 0; j < 5; j++) {
      if (!used[j] && guessLetters[i] === targetLetters[j]) {
        result[i] = "present";
        used[j] = true;
        found = true;
        break;
      }
    }

    if (!found) {
      result[i] = "absent";
    }
  }

  return result;
}

app.get("/api/word-of-the-day", (req, res) => {
  const today = new Date().toISOString().split("T")[0];
  const seed = today.split("-").reduce((acc, val) => acc + parseInt(val), 0);
  const index = seed % words.length;

  res.json({
    date: today,
    message: "Word of the day is set!",
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});

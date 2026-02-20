export type LetterStatus = "correct" | "present" | "absent" | "empty";

export interface GuessResult {
  word: string;
  result: LetterStatus[];
}

export interface GameState {
  gameId: string | null;
  guesses: GuessResult[];
  currentGuess: string;
  maxGuesses: number;
  wordLength: number;
  gameOver: boolean;
  won: boolean;
  targetWord?: string;
}

export interface NewGameResponse {
  gameId: string;
  wordLength: number;
  maxGuesses: number;
  message: string;
}

export interface GuessResponse {
  guess: string;
  result: LetterStatus[];
  gameOver: boolean;
  won: boolean;
  guessesRemaining: number;
  targetWord?: string;
}

export interface GameStatusResponse {
  gameId: string;
  guesses: GuessResult[];
  maxGuesses: number;
  wordLength: number;
  gameOver: boolean;
  won: boolean;
  targetWord?: string;
}

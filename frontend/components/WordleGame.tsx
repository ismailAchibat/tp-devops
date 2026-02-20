"use client";

import { GuessRow } from "./GuessRow";
import { Keyboard } from "./Keyboard";
import { GameModal } from "./GameModal";
import { useWordleGame } from "@/hooks/useWordleGame";
import { useEffect } from "react";

export function WordleGame() {
  const {
    gameState,
    error,
    loading,
    letterStatuses,
    startNewGame,
    submitGuess,
    addLetter,
    removeLetter,
  } = useWordleGame();

  // Start game on mount
  useEffect(() => {
    startNewGame();
  }, [startNewGame]);

  const emptyRows =
    gameState.maxGuesses -
    gameState.guesses.length -
    (gameState.gameOver ? 0 : 1);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-linear-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4">
      {/* Header */}
      <div className="w-full max-w-lg mb-8">
        <h1 className="text-5xl font-black text-center bg-clip-text text-transparent bg-linear-to-r from-blue-600 to-green-600 dark:from-blue-400 dark:to-green-400 mb-2">
          DevOps Wordle
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-400 text-sm">
          Guess the 5-letter DevOps term in 6 tries
        </p>
      </div>

      {/* Game Board */}
      <div className="mb-8 space-y-2">
        {/* Previous guesses */}
        {gameState.guesses.map((guess, index) => (
          <GuessRow key={index} guess={guess.word} result={guess.result} />
        ))}

        {/* Current guess */}
        {!gameState.gameOver && (
          <GuessRow guess={gameState.currentGuess} isCurrentGuess />
        )}

        {/* Empty rows */}
        {Array.from({ length: emptyRows }).map((_, index) => (
          <GuessRow key={`empty-${index}`} guess="" />
        ))}
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-4 px-4 py-2 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded-lg text-sm font-medium animate-in fade-in slide-in-from-top-2 duration-200">
          {error}
        </div>
      )}

      {/* Loading Indicator */}
      {loading && !gameState.gameOver && (
        <div className="mb-4 text-gray-600 dark:text-gray-400 text-sm">
          Processing...
        </div>
      )}

      {/* Keyboard */}
      <Keyboard
        onKeyPress={addLetter}
        onEnter={submitGuess}
        onBackspace={removeLetter}
        letterStatuses={letterStatuses}
        disabled={gameState.gameOver || loading}
      />

      {/* Stats */}
      <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
        <p>
          Guesses: {gameState.guesses.length} / {gameState.maxGuesses}
        </p>
      </div>

      {/* New Game Button */}
      {!gameState.gameOver && gameState.gameId && (
        <button
          onClick={startNewGame}
          className="mt-4 px-6 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg font-medium transition-colors duration-200"
        >
          New Game
        </button>
      )}

      {/* Game Over Modal */}
      <GameModal
        isOpen={gameState.gameOver}
        won={gameState.won}
        targetWord={gameState.targetWord}
        guessCount={gameState.guesses.length}
        onPlayAgain={startNewGame}
      />
    </div>
  );
}

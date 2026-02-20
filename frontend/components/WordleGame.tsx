"use client";

import { GuessRow } from "./GuessRow";
import { Keyboard } from "./Keyboard";
import { GameModal } from "./GameModal";
import { HelpSection } from "./HelpSection";
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
    <div className="relative h-screen bg-linear-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4 overflow-hidden flex items-center justify-center">
      {/* Help Section - Left Sidebar (hidden on small screens) */}
      <div className="hidden lg:block absolute left-4 top-1/2 -translate-y-1/2">
        <HelpSection />
      </div>

      {/* Main Game Section - Centered */}
      <div className="flex flex-col items-center justify-center w-full h-full">
        {/* Header */}
        <div className="mb-4">
          <h1 className="text-5xl font-black text-center bg-clip-text text-transparent bg-linear-to-r from-blue-600 to-green-600 dark:from-blue-400 dark:to-green-400 mb-2">
            DevOps Wordle
          </h1>
          <p className="text-center text-gray-600 dark:text-gray-400 text-sm">
            Devinez un terme de {gameState.wordLength} lettres en 6 tentatives
          </p>
        </div>

        {/* Game Board - Compact */}
        <div className="mb-4 space-y-1 flex-shrink-0">
          {/* Previous guesses */}
          {gameState.guesses.map((guess, index) => (
            <GuessRow
              key={index}
              guess={guess.word}
              result={guess.result}
              wordLength={gameState.wordLength}
            />
          ))}

          {/* Current guess */}
          {!gameState.gameOver && (
            <GuessRow
              guess={gameState.currentGuess}
              isCurrentGuess
              wordLength={gameState.wordLength}
            />
          )}

          {/* Empty rows */}
          {Array.from({ length: emptyRows }).map((_, index) => (
            <GuessRow
              key={`empty-${index}`}
              guess=""
              wordLength={gameState.wordLength}
            />
          ))}
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-2 px-3 py-1 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded text-xs font-medium animate-in fade-in slide-in-from-top-2 duration-200">
            {error}
          </div>
        )}

        {/* Loading Indicator */}
        {loading && !gameState.gameOver && (
          <div className="mb-2 text-gray-600 dark:text-gray-400 text-xs">
            Processing...
          </div>
        )}

        {/* Keyboard */}
        <div className="flex-shrink-0 mb-3">
          <Keyboard
            onKeyPress={addLetter}
            onEnter={submitGuess}
            onBackspace={removeLetter}
            letterStatuses={letterStatuses}
            disabled={gameState.gameOver || loading}
          />
        </div>

        {/* Stats */}
        <div className="text-xs text-gray-600 dark:text-gray-400 mb-2">
          <p>
            Tentatives: {gameState.guesses.length} / {gameState.maxGuesses}
          </p>
        </div>

        {/* New Game Button */}
        {!gameState.gameOver && gameState.gameId && (
          <button
            onClick={startNewGame}
            className="px-4 py-1 text-sm bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded font-medium transition-colors duration-200 flex-shrink-0"
          >
            Nouveau Jeu
          </button>
        )}
      </div>

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

"use client";

import { useState, useEffect, useCallback } from "react";
import type { GameState, LetterStatus } from "@/types/game";
import { GameApiService } from "@/lib/api";

export function useWordleGame() {
  const [gameState, setGameState] = useState<GameState>({
    gameId: null,
    guesses: [],
    currentGuess: "",
    maxGuesses: 6,
    gameOver: false,
    won: false,
  });

  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [letterStatuses, setLetterStatuses] = useState<
    Map<string, LetterStatus>
  >(new Map());

  // Start a new game
  const startNewGame = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const response = await GameApiService.startNewGame();
      setGameState({
        gameId: response.gameId,
        guesses: [],
        currentGuess: "",
        maxGuesses: response.maxGuesses,
        gameOver: false,
        won: false,
      });
      setLetterStatuses(new Map());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to start game");
    } finally {
      setLoading(false);
    }
  }, []);

  // Update letter statuses based on guesses
  const updateLetterStatuses = useCallback(
    (word: string, result: LetterStatus[]) => {
      setLetterStatuses((prev) => {
        const newStatuses = new Map(prev);
        word.split("").forEach((letter, index) => {
          const currentStatus = newStatuses.get(letter);
          const newStatus = result[index];

          // Priority: correct > present > absent
          if (newStatus === "correct") {
            newStatuses.set(letter, "correct");
          } else if (newStatus === "present" && currentStatus !== "correct") {
            newStatuses.set(letter, "present");
          } else if (!currentStatus) {
            newStatuses.set(letter, newStatus);
          }
        });
        return newStatuses;
      });
    },
    [],
  );

  // Submit a guess
  const submitGuess = useCallback(async () => {
    if (!gameState.gameId || gameState.currentGuess.length !== 5) {
      return;
    }

    setLoading(true);
    setError("");
    try {
      const response = await GameApiService.submitGuess(
        gameState.gameId,
        gameState.currentGuess,
      );

      updateLetterStatuses(response.guess, response.result);

      setGameState((prev) => ({
        ...prev,
        guesses: [
          ...prev.guesses,
          { word: response.guess, result: response.result },
        ],
        currentGuess: "",
        gameOver: response.gameOver,
        won: response.won,
        targetWord: response.targetWord,
      }));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid guess");
    } finally {
      setLoading(false);
    }
  }, [gameState.gameId, gameState.currentGuess, updateLetterStatuses]);

  // Add letter to current guess
  const addLetter = useCallback(
    (letter: string) => {
      if (gameState.currentGuess.length < 5 && !gameState.gameOver) {
        setGameState((prev) => ({
          ...prev,
          currentGuess: prev.currentGuess + letter,
        }));
      }
    },
    [gameState.currentGuess.length, gameState.gameOver],
  );

  // Remove last letter
  const removeLetter = useCallback(() => {
    setGameState((prev) => ({
      ...prev,
      currentGuess: prev.currentGuess.slice(0, -1),
    }));
  }, []);

  // Handle keyboard input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameState.gameOver || loading) return;

      if (e.key === "Enter") {
        submitGuess();
      } else if (e.key === "Backspace") {
        removeLetter();
      } else if (/^[a-zA-Z]$/.test(e.key)) {
        addLetter(e.key.toUpperCase());
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [gameState.gameOver, loading, submitGuess, removeLetter, addLetter]);

  return {
    gameState,
    error,
    loading,
    letterStatuses,
    startNewGame,
    submitGuess,
    addLetter,
    removeLetter,
  };
}

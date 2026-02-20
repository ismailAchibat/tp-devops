import type {
  NewGameResponse,
  GuessResponse,
  GameStatusResponse,
} from "@/types/game";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export class GameApiService {
  /**
   * Start a new game
   */
  static async startNewGame(): Promise<NewGameResponse> {
    const response = await fetch(`${API_BASE_URL}/api/game/new`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to start new game");
    }

    return response.json();
  }

  /**
   * Submit a guess for the current game
   */
  static async submitGuess(
    gameId: string,
    word: string,
  ): Promise<GuessResponse> {
    const response = await fetch(`${API_BASE_URL}/api/game/${gameId}/guess`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ word }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to submit guess");
    }

    return response.json();
  }

  /**
   * Get the current game status
   */
  static async getGameStatus(gameId: string): Promise<GameStatusResponse> {
    const response = await fetch(`${API_BASE_URL}/api/game/${gameId}`);

    if (!response.ok) {
      throw new Error("Failed to get game status");
    }

    return response.json();
  }

  /**
   * Health check
   */
  static async healthCheck(): Promise<{ status: string; timestamp: string }> {
    const response = await fetch(`${API_BASE_URL}/health`);

    if (!response.ok) {
      throw new Error("Backend health check failed");
    }

    return response.json();
  }
}

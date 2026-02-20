interface GameModalProps {
  isOpen: boolean;
  won: boolean;
  targetWord?: string;
  guessCount: number;
  onPlayAgain: () => void;
}

export function GameModal({
  isOpen,
  won,
  targetWord,
  guessCount,
  onPlayAgain,
}: GameModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 max-w-md w-full animate-in fade-in slide-in-from-bottom-4 duration-300">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">
            {won ? "🎉 Bravo!" : "😔 Jeu Terminé"}
          </h2>

          <p className="text-xl mb-6 text-gray-700 dark:text-gray-300">
            {won
              ? `Vous avez trouvé le mot en ${guessCount} ${guessCount === 1 ? "tentative" : "tentatives"}!`
              : `Le mot était:`}
          </p>

          {targetWord && (
            <div className="text-4xl font-bold mb-8 text-green-600 dark:text-green-400 uppercase tracking-wider">
              {targetWord}
            </div>
          )}

          <button
            onClick={onPlayAgain}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-200 w-full"
          >
            Rejouer
          </button>
        </div>
      </div>
    </div>
  );
}

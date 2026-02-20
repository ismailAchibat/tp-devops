import type { LetterStatus } from "@/types/game";

interface LetterBoxProps {
  letter: string;
  status: LetterStatus;
  index: number;
}

export function LetterBox({ letter, status, index }: LetterBoxProps) {
  const getStatusColor = () => {
    switch (status) {
      case "correct":
        return "bg-green-600 border-green-600 text-white";
      case "present":
        return "bg-yellow-500 border-yellow-500 text-white";
      case "absent":
        return "bg-gray-600 border-gray-600 text-white";
      default:
        return "bg-white border-gray-300 text-black dark:bg-gray-800 dark:border-gray-600 dark:text-white";
    }
  };

  return (
    <div
      className={`
        w-12 h-12 border-2 flex items-center justify-center
        text-xl font-bold uppercase rounded-md
        transition-all duration-300 ease-in-out
        ${getStatusColor()}
        ${letter && status === "empty" ? "border-gray-500 dark:border-gray-400 scale-105" : ""}
      `}
      style={{
        animationDelay: `${index * 100}ms`,
      }}
    >
      {letter}
    </div>
  );
}

interface GuessRowProps {
  guess: string;
  result?: LetterStatus[];
  wordLength: number;
  isCurrentGuess?: boolean;
}

export function GuessRow({
  guess,
  result,
  wordLength,
  isCurrentGuess = false,
}: GuessRowProps) {
  const letters = guess.padEnd(wordLength, " ").split("");
  const statuses: LetterStatus[] = result || Array(wordLength).fill("empty");

  return (
    <div className="flex gap-1.5 justify-center">
      {letters.map((letter, index) => (
        <LetterBox
          key={index}
          letter={letter.trim()}
          status={statuses[index]}
          index={index}
        />
      ))}
    </div>
  );
}

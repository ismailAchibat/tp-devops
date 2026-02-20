import { LetterStatus } from "@/types/game";

interface KeyboardProps {
  onKeyPress: (key: string) => void;
  onEnter: () => void;
  onBackspace: () => void;
  letterStatuses: Map<string, LetterStatus>;
  disabled?: boolean;
}

const KEYBOARD_ROWS = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "BACK"],
];

export function Keyboard({
  onKeyPress,
  onEnter,
  onBackspace,
  letterStatuses,
  disabled = false,
}: KeyboardProps) {
  const getKeyColor = (key: string) => {
    if (key === "ENTER" || key === "BACK") {
      return "bg-gray-400 hover:bg-gray-500 text-white dark:bg-gray-600 dark:hover:bg-gray-500";
    }

    const status = letterStatuses.get(key);
    switch (status) {
      case "correct":
        return "bg-green-600 hover:bg-green-700 text-white";
      case "present":
        return "bg-yellow-500 hover:bg-yellow-600 text-white";
      case "absent":
        return "bg-gray-400 hover:bg-gray-500 text-white";
      default:
        return "bg-gray-300 hover:bg-gray-400 text-black dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white";
    }
  };

  const handleClick = (key: string) => {
    if (disabled) return;

    if (key === "ENTER") {
      onEnter();
    } else if (key === "BACK") {
      onBackspace();
    } else {
      onKeyPress(key);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      {KEYBOARD_ROWS.map((row, rowIndex) => (
        <div key={rowIndex} className="flex gap-1 justify-center mb-2">
          {row.map((key) => {
            const isSpecial = key === "ENTER" || key === "BACK";
            return (
              <button
                key={key}
                onClick={() => handleClick(key)}
                disabled={disabled}
                className={`
                  ${isSpecial ? "px-4" : "px-3"} py-4
                  ${getKeyColor(key)}
                  rounded font-bold text-sm
                  transition-all duration-200
                  disabled:opacity-50 disabled:cursor-not-allowed
                  active:scale-95
                  min-w-10
                `}
              >
                {key === "BACK" ? "⌫" : key}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}

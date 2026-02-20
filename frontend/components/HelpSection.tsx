export function HelpSection() {
  return (
    <div className="w-56 flex-shrink-0">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-3 h-full overflow-y-auto">


        <div className="space-y-2">
          {/* Green */}
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <div className="w-7 h-7 bg-green-600 rounded flex items-center justify-center text-white text-xs font-bold">
                L
              </div>
              <span className="font-medium text-gray-900 dark:text-white text-xs">
                Correct
              </span>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400 ml-9">
              Lettre à la bonne position
            </p>
          </div>

          {/* Yellow */}
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <div className="w-7 h-7 bg-yellow-500 rounded flex items-center justify-center text-white text-xs font-bold">
                L
              </div>
              <span className="font-medium text-gray-900 dark:text-white text-xs">
                Présent
              </span>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400 ml-9">
              Lettre ailleurs dans le mot
            </p>
          </div>

          {/* Gray */}
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <div className="w-7 h-7 bg-gray-400 rounded flex items-center justify-center text-white text-xs font-bold">
                L
              </div>
              <span className="font-medium text-gray-900 dark:text-white text-xs">
                Absent
              </span>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400 ml-9">
              Lettre n'existe pas
            </p>
          </div>

          {/* Divider */}
          <hr className="my-1.5 dark:border-gray-700" />

          {/* Instructions */}
          <div>
            <h3 className="font-medium text-gray-900 dark:text-white text-xs mb-0.5">
              Comment jouer
            </h3>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              Trouvez le terme DevOps en 6 tentatives. Chaque supposition doit
              être un mot valide de 5 lettres.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

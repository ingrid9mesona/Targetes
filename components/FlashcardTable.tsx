
import React from 'react';
import type { Flashcard } from '../types';

interface FlashcardTableProps {
  flashcards: Flashcard[];
}

export const FlashcardTable: React.FC<FlashcardTableProps> = ({ flashcards }) => {
  return (
    <div className="overflow-x-auto bg-white dark:bg-slate-800/50 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
      <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
        <thead className="bg-slate-100 dark:bg-slate-800">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider w-1/4">
              1️⃣ Concepte
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider w-1/2">
              2️⃣ Explicació
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider w-1/4">
              3️⃣ Descripció d'imatge
            </th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-slate-800/50 divide-y divide-slate-200 dark:divide-slate-700">
          {flashcards.map((card, index) => (
            <tr key={index} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors duration-150">
              <td className="px-6 py-4 whitespace-normal align-top">
                <div className="text-sm font-semibold text-slate-900 dark:text-white">{card.concepte}</div>
              </td>
              <td className="px-6 py-4 whitespace-normal align-top">
                <div className="text-sm text-slate-600 dark:text-slate-300">{card.explicacio}</div>
              </td>
              <td className="px-6 py-4 whitespace-normal align-top">
                <div className="text-sm text-slate-500 dark:text-slate-400 italic">{card.descripcioImatge}</div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

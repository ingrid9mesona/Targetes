
import React, { useState } from 'react';
import { InputForm } from './components/InputForm';
import { FlashcardTable } from './components/FlashcardTable';
import { Loader } from './components/Loader';
import { generateFlashcards } from './services/geminiService';
import type { Flashcard } from './types';
import { SparklesIcon } from './components/icons/SparklesIcon';

const App: React.FC = () => {
  const [flashcards, setFlashcards] = useState<Flashcard[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [currentTopic, setCurrentTopic] = useState<string>('');

  const handleGenerate = async (topic: string) => {
    if (!topic || isLoading) return;

    setIsLoading(true);
    setError(null);
    setFlashcards(null);
    setCurrentTopic(topic);

    try {
      const generatedData = await generateFlashcards(topic);
      setFlashcards(generatedData);
    } catch (err) {
      setError('Hi ha hagut un error en generar les fitxes. Si us plau, intenta-ho de nou.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-sans p-4 sm:p-6 lg:p-8">
      <main className="max-w-5xl mx-auto">
        <header className="text-center py-8">
          <div className="inline-flex items-center gap-3 bg-slate-200 dark:bg-slate-800/50 rounded-full px-4 py-2 mb-4 border border-slate-300 dark:border-slate-700">
             <SparklesIcon className="w-5 h-5 text-blue-500"/>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              Generador de Fitxes Visuals
            </h1>
          </div>
          <p className="max-w-2xl mx-auto text-slate-600 dark:text-slate-400 mt-2">
            Introdueix una temàtica i crearem una sèrie de fitxes de repàs amb conceptes clau, explicacions senzilles i idees per a imatges representatives.
          </p>
        </header>

        <section className="bg-white dark:bg-slate-800/50 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 md:p-8 sticky top-4 z-10 backdrop-blur-sm">
          <InputForm onSubmit={handleGenerate} isLoading={isLoading} />
        </section>

        <section className="mt-8">
          {isLoading && (
            <div className="flex flex-col items-center justify-center text-center p-8">
              <Loader />
              <p className="mt-4 text-slate-600 dark:text-slate-400">Generant fitxes per a "{currentTopic}"...</p>
            </div>
          )}
          {error && (
            <div className="bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-600 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg text-center" role="alert">
              <strong className="font-bold">Error: </strong>
              <span className="block sm:inline">{error}</span>
            </div>
          )}
          {flashcards && flashcards.length > 0 && (
            <>
              <h2 className="text-2xl font-bold text-center mb-6 text-slate-900 dark:text-white">Fitxes de Repàs sobre "{currentTopic}"</h2>
              <FlashcardTable flashcards={flashcards} />
            </>
          )}
          {!isLoading && !flashcards && !error && (
            <div className="text-center py-16 px-6 bg-slate-100 dark:bg-slate-800/50 rounded-lg border border-dashed border-slate-300 dark:border-slate-700">
                <h3 className="text-lg font-medium text-slate-700 dark:text-slate-300">A punt per començar?</h3>
                <p className="text-slate-500 dark:text-slate-400 mt-1">Escriu un tema a la capsa de text de dalt per crear les teves primeres fitxes.</p>
            </div>
          )}
        </section>
        
        <footer className="text-center mt-12 py-6 border-t border-slate-200 dark:border-slate-800">
            <p className="text-sm text-slate-500 dark:text-slate-400">Una eina educativa amb el suport de la IA de Gemini.</p>
        </footer>
      </main>
    </div>
  );
};

export default App;

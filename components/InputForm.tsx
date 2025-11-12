
import React, { useState } from 'react';
import { SparklesIcon } from './icons/SparklesIcon';

interface InputFormProps {
  onSubmit: (topic: string) => void;
  isLoading: boolean;
}

export const InputForm: React.FC<InputFormProps> = ({ onSubmit, isLoading }) => {
  const [topic, setTopic] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(topic);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="topic-input" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
        Temàtica per a les fitxes
      </label>
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          id="topic-input"
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Ex: El sistema solar, la cèl·lula, la Revolució Francesa..."
          disabled={isLoading}
          className="flex-grow w-full px-4 py-2 text-slate-900 dark:text-white bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={isLoading || !topic.trim()}
          className="inline-flex items-center justify-center gap-2 px-6 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-50 dark:focus:ring-offset-slate-900 focus:ring-blue-500 transition duration-150 ease-in-out disabled:bg-slate-400 dark:disabled:bg-slate-600 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            'Generant...'
          ) : (
            <>
              <SparklesIcon className="w-5 h-5" />
              Generar Fitxes
            </>
          )}
        </button>
      </div>
    </form>
  );
};

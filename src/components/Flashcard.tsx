import { useState } from 'react';
import type { Flashcard as FlashcardType } from '../content/units';

export default function Flashcard({ card }: { card: FlashcardType }) {
  const [volteada, setVolteada] = useState(false);

  return (
    <button
      type="button"
      onClick={() => setVolteada((v) => !v)}
      className="flex w-full flex-col rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition active:scale-[0.99] dark:border-slate-800 dark:bg-slate-900"
    >
      <span
        className={`text-xs font-semibold uppercase tracking-wider ${
          volteada ? 'text-emerald-600 dark:text-emerald-400' : 'text-blue-600 dark:text-blue-400'
        }`}
      >
        {volteada ? 'Respuesta' : 'Pregunta'}
      </span>
      <span className="mt-2 text-[15px] leading-relaxed text-slate-800 dark:text-slate-100">
        {volteada ? card.respuesta : card.pregunta}
      </span>
      <span className="mt-3 text-xs text-slate-400 dark:text-slate-500">Toca para voltear</span>
    </button>
  );
}

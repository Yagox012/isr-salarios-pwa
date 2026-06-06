import { useState } from 'react';
import type { Flashcard as FlashcardType } from '../content/units';
import { SpringCard } from './SpringCard';

export default function Flashcard({ card }: { card: FlashcardType }) {
  const [volteada, setVolteada] = useState(false);

  return (
    <SpringCard
      as="button"
      type="button"
      onClick={() => setVolteada((v) => !v)}
      className="flex w-full flex-col rounded-2xl border border-white/75 bg-white/72 p-5 text-left backdrop-blur-xl shadow-[0_2px_20px_rgba(0,0,0,0.07),0_1px_0_rgba(255,255,255,0.88)_inset] dark:border-slate-700/40 dark:bg-slate-900/65 dark:shadow-[0_2px_20px_rgba(0,0,0,0.28)]"
    >
      <span
        className={`text-xs font-semibold uppercase tracking-wider ${
          volteada ? 'text-emerald-600 dark:text-emerald-400' : 'text-blue-600 dark:text-blue-400'
        }`}
      >
        {volteada ? 'Respuesta' : 'Pregunta'}
      </span>
      <span className="mt-2 text-sm leading-relaxed text-slate-800 dark:text-slate-100">
        {volteada ? card.respuesta : card.pregunta}
      </span>
      <span className="mt-3 text-xs text-slate-400 dark:text-slate-500">Toca para voltear</span>
    </SpringCard>
  );
}

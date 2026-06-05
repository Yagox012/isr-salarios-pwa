import { useState } from 'react';
import { unidades } from '../content/units';
import Quiz from '../components/Quiz';

export default function Quizzes() {
  const [unidadActiva, setUnidadActiva] = useState<string | null>(null);
  const unidad = unidades.find((u) => u.id === unidadActiva);

  if (unidad) {
    const reactivos = unidad.temas.flatMap((t) => t.quiz);
    return (
      <div key={unidad.id} className="section-enter text-slate-800 dark:text-slate-100">
        <header className="bg-blue-900 px-5 pb-5 pt-[max(1.5rem,env(safe-area-inset-top))] text-white">
          <button type="button" onClick={() => setUnidadActiva(null)} className="text-sm text-blue-300">‹ Quizzes</button>
          <h1 className="mt-1 text-xl font-bold leading-tight">Examen · Unidad {unidad.numero}</h1>
          <p className="mt-1 text-xs text-blue-200">{reactivos.length} reactivos</p>
        </header>
        <main className="mx-auto max-w-md px-5 py-6">
          <Quiz reactivos={reactivos} onFinish={() => { /* examen informativo */ }} />
        </main>
      </div>
    );
  }

  return (
    <div className="text-slate-800 dark:text-slate-100">
      <header className="bg-blue-900 px-5 pb-6 pt-[max(1.5rem,env(safe-area-inset-top))] text-white">
        <p className="text-xs font-medium uppercase tracking-widest text-blue-300">Evaluación</p>
        <h1 className="mt-1 text-2xl font-bold leading-tight">Quizzes</h1>
        <p className="mt-1 text-sm text-blue-200">Examen por unidad con calificación.</p>
      </header>
      <main className="mx-auto max-w-md space-y-3 px-5 py-6">
        {unidades.map((u) => {
          const numReactivos = u.temas.reduce((acc, t) => acc + t.quiz.length, 0);
          return (
            <button
              key={u.id}
              type="button"
              onClick={() => setUnidadActiva(u.id)}
              className="flex w-full items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 text-left shadow-sm transition active:scale-[0.99] dark:border-slate-800 dark:bg-slate-900"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                U{u.numero}
              </span>
              <span className="flex-1">
                <span className="block text-sm font-semibold text-slate-800 dark:text-slate-100">{u.titulo}</span>
                <span className="block text-xs text-slate-400 dark:text-slate-500">{numReactivos} reactivos</span>
              </span>
              <span className="text-slate-300 dark:text-slate-600">›</span>
            </button>
          );
        })}
      </main>
    </div>
  );
}

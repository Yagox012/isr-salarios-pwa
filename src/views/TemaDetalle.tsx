import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { unidades } from '../content/units';
import { useProgress } from '../hooks/useProgress';
import Flashcard from '../components/Flashcard';
import Quiz from '../components/Quiz';
import { SpringCard } from '../components/SpringCard';

type Seccion = 'teoria' | 'flashcards' | 'quiz';

export default function TemaDetalle() {
  const { unidadId, temaId } = useParams();
  const unidad = unidades.find((u) => u.id === unidadId);
  const tema   = unidad?.temas.find((t) => t.id === temaId);

  const [seccion, setSeccion] = useState<Seccion>('teoria');
  const { getProgresoTema, marcarTeoriaLeida, marcarFlashcardsRepasadas, registrarQuiz } = useProgress();

  if (!tema || !unidad) {
    return (
      <div className="p-8 text-center text-slate-500 dark:text-slate-400">
        <p>Tema no encontrado.</p>
        <Link to="/unidades" className="mt-3 inline-block text-blue-700 underline dark:text-blue-400">
          Volver a Unidades
        </Link>
      </div>
    );
  }

  const prog = getProgresoTema(tema.id);

  const tabs: { id: Seccion; label: string }[] = [
    { id: 'teoria',     label: 'Teoría'     },
    { id: 'flashcards', label: 'Flashcards' },
    { id: 'quiz',       label: 'Quiz'       },
  ];

  return (
    <div className="text-slate-800 dark:text-slate-100">
      <header className="bg-blue-900 px-5 pb-5 pt-[calc(env(safe-area-inset-top)+1.25rem)] text-white">
        <SpringCard as={Link} to="/unidades" className="inline-block text-sm text-blue-300">
          ‹ Unidad {unidad.numero}
        </SpringCard>
        <h1 className="mt-1 text-xl font-bold leading-tight">{tema.titulo}</h1>
        <p className="mt-1 text-xs text-blue-200">{tema.articulosReferencia.join(' · ')}</p>
      </header>

      <div className="sticky top-0 z-10 border-b border-slate-200/60 bg-white/80 backdrop-blur-md dark:border-slate-800/60 dark:bg-slate-950/80">
        <div className="mx-auto flex max-w-md">
          {tabs.map((t) => (
            <SpringCard
              key={t.id}
              as="button"
              type="button"
              onClick={() => setSeccion(t.id)}
              className={`flex-1 border-b-2 py-3 text-sm font-medium transition-colors ${
                seccion === t.id
                  ? 'border-blue-700 text-blue-700 dark:border-blue-400 dark:text-blue-400'
                  : 'border-transparent text-slate-400 dark:text-slate-500'
              }`}
            >
              {t.label}
            </SpringCard>
          ))}
        </div>
      </div>

      <main className="mx-auto max-w-md px-5 py-6">
        <div key={seccion} className="section-enter">
          {seccion === 'teoria' && (
            <div className="space-y-4">
              {tema.teoria.map((parrafo, i) => (
                <p key={i} className="text-[15px] leading-relaxed text-slate-700 dark:text-slate-300">{parrafo}</p>
              ))}
              <SpringCard
                as="button"
                type="button"
                onClick={() => marcarTeoriaLeida(tema.id)}
                disabled={prog.teoriaLeida}
                className="mt-2 w-full rounded-xl bg-blue-700 py-3 text-sm font-semibold text-white disabled:bg-emerald-600 disabled:opacity-100"
              >
                {prog.teoriaLeida ? '✓ Teoría leída' : 'Marcar teoría como leída'}
              </SpringCard>
            </div>
          )}

          {seccion === 'flashcards' && (
            <div className="space-y-3">
              {tema.flashcards.map((c) => (
                <Flashcard key={c.id} card={c} />
              ))}
              <SpringCard
                as="button"
                type="button"
                onClick={() => marcarFlashcardsRepasadas(tema.id)}
                disabled={prog.flashcardsRepasadas}
                className="mt-2 w-full rounded-xl bg-blue-700 py-3 text-sm font-semibold text-white disabled:bg-emerald-600 disabled:opacity-100"
              >
                {prog.flashcardsRepasadas ? '✓ Flashcards repasadas' : 'Marcar flashcards como repasadas'}
              </SpringCard>
            </div>
          )}

          {seccion === 'quiz' && (
            <Quiz reactivos={tema.quiz} onFinish={(pct) => registrarQuiz(tema.id, pct)} />
          )}
        </div>
      </main>
    </div>
  );
}

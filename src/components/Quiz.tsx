import { useState } from 'react';
import type { QuizReactivo } from '../content/units';
import { SpringCard } from './SpringCard';

interface QuizProps {
  reactivos: QuizReactivo[];
  onFinish: (porcentaje: number) => void;
}

export default function Quiz({ reactivos, onFinish }: QuizProps) {
  const [respuestas, setRespuestas] = useState<Record<string, number>>({});
  const [calificado, setCalificado] = useState(false);

  const total      = reactivos.length;
  const contestadas = Object.keys(respuestas).length;

  const aciertos = reactivos.reduce((acc, r) => {
    const elegida = respuestas[r.id];
    return elegida != null && r.opciones[elegida]?.correcta ? acc + 1 : acc;
  }, 0);
  const porcentaje = total > 0 ? Math.round((aciertos / total) * 100) : 0;

  const calificar  = () => { setCalificado(true); onFinish(porcentaje); };
  const reintentar = () => { setRespuestas({}); setCalificado(false); };

  return (
    <div>
      <ol className="space-y-5">
        {reactivos.map((r, i) => {
          const elegida = respuestas[r.id];
          return (
            <li
              key={r.id}
              className="spring-enter rounded-2xl border border-white/75 bg-white/72 p-4 backdrop-blur-xl shadow-[0_2px_20px_rgba(0,0,0,0.07),0_1px_0_rgba(255,255,255,0.88)_inset] dark:border-slate-700/40 dark:bg-slate-900/65"
              style={{ animationDelay: `${i * 0.07}s` }}
            >
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                {i + 1}. {r.pregunta}
              </p>
              <div className="mt-3 space-y-2">
                {r.opciones.map((op, idx) => {
                  const seleccionada = elegida === idx;
                  let estilo = 'border-slate-200 bg-white/60 text-slate-700 dark:border-slate-700 dark:bg-slate-800/60 dark:text-slate-200';
                  if (calificado) {
                    if (op.correcta)       estilo = 'border-emerald-400 bg-emerald-50 text-emerald-800 dark:border-emerald-500 dark:bg-emerald-950 dark:text-emerald-300';
                    else if (seleccionada) estilo = 'border-rose-300 bg-rose-50 text-rose-700 dark:border-rose-500 dark:bg-rose-950 dark:text-rose-300';
                  } else if (seleccionada) {
                    estilo = 'border-blue-500 bg-blue-50 text-blue-800 dark:border-blue-500 dark:bg-blue-950 dark:text-blue-300';
                  }
                  return (
                    <SpringCard
                      key={idx}
                      as="button"
                      type="button"
                      disabled={calificado}
                      onClick={() => setRespuestas((prev) => ({ ...prev, [r.id]: idx }))}
                      className={`w-full rounded-xl border px-4 py-2.5 text-left text-sm ${estilo}`}
                    >
                      {op.texto}
                    </SpringCard>
                  );
                })}
              </div>
              {calificado && (
                <p className="mt-3 rounded-lg bg-slate-50/80 p-3 text-xs leading-relaxed text-slate-600 dark:bg-slate-800/80 dark:text-slate-300">
                  <span className="font-semibold text-slate-700 dark:text-slate-200">Explicación: </span>
                  {r.explicacion}
                </p>
              )}
            </li>
          );
        })}
      </ol>

      {!calificado ? (
        <SpringCard
          as="button"
          type="button"
          onClick={calificar}
          disabled={contestadas < total}
          className="mt-5 w-full rounded-xl bg-blue-700 py-3 text-sm font-semibold text-white shadow-sm disabled:opacity-40"
        >
          {contestadas < total ? `Responde todas (${contestadas}/${total})` : 'Calificar'}
        </SpringCard>
      ) : (
        <div className="mt-5 rounded-2xl border border-blue-700/40 p-5 text-center text-white"
          style={{
            background: 'linear-gradient(135deg,#1e3a8a 0%,#1d4ed8 60%,#2563eb 100%)',
            boxShadow: '0 6px 32px rgba(30,58,138,0.4)',
          }}
        >
          <p className="text-xs uppercase tracking-wider text-blue-300">Tu resultado</p>
          <p className="mt-1 text-4xl font-bold">{porcentaje}%</p>
          <p className="mt-1 text-sm text-blue-200">
            {aciertos} de {total} correctas {porcentaje >= 80 ? '· ¡Aprobado!' : '· Necesitas ≥ 80%'}
          </p>
          <SpringCard
            as="button"
            type="button"
            onClick={reintentar}
            className="mt-4 rounded-lg bg-white/10 px-4 py-2 text-sm font-medium text-white"
          >
            Reintentar
          </SpringCard>
        </div>
      )}
    </div>
  );
}

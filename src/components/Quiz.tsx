import { useState } from 'react';
import type { QuizReactivo } from '../content/units';

interface QuizProps {
  reactivos: QuizReactivo[];
  onFinish: (porcentaje: number) => void;
}

export default function Quiz({ reactivos, onFinish }: QuizProps) {
  const [respuestas, setRespuestas] = useState<Record<string, number>>({});
  const [calificado, setCalificado] = useState(false);

  const total = reactivos.length;
  const contestadas = Object.keys(respuestas).length;

  const aciertos = reactivos.reduce((acc, r) => {
    const elegida = respuestas[r.id];
    return elegida != null && r.opciones[elegida]?.correcta ? acc + 1 : acc;
  }, 0);
  const porcentaje = total > 0 ? Math.round((aciertos / total) * 100) : 0;

  const calificar = () => {
    setCalificado(true);
    onFinish(porcentaje);
  };

  const reintentar = () => {
    setRespuestas({});
    setCalificado(false);
  };

  return (
    <div>
      <ol className="space-y-5">
        {reactivos.map((r, i) => {
          const elegida = respuestas[r.id];
          return (
            <li key={r.id} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                {i + 1}. {r.pregunta}
              </p>
              <div className="mt-3 space-y-2">
                {r.opciones.map((op, idx) => {
                  const seleccionada = elegida === idx;
                  let estilo = 'border-slate-200 bg-white text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200';
                  if (calificado) {
                    if (op.correcta) estilo = 'border-emerald-400 bg-emerald-50 text-emerald-800 dark:border-emerald-500 dark:bg-emerald-950 dark:text-emerald-300';
                    else if (seleccionada) estilo = 'border-rose-300 bg-rose-50 text-rose-700 dark:border-rose-500 dark:bg-rose-950 dark:text-rose-300';
                  } else if (seleccionada) {
                    estilo = 'border-blue-500 bg-blue-50 text-blue-800 dark:border-blue-500 dark:bg-blue-950 dark:text-blue-300';
                  }
                  return (
                    <button
                      key={idx}
                      type="button"
                      disabled={calificado}
                      onClick={() => setRespuestas((prev) => ({ ...prev, [r.id]: idx }))}
                      className={`w-full rounded-xl border px-4 py-2.5 text-left text-sm transition ${estilo}`}
                    >
                      {op.texto}
                    </button>
                  );
                })}
              </div>
              {calificado && (
                <p className="mt-3 rounded-lg bg-slate-50 p-3 text-xs leading-relaxed text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                  <span className="font-semibold text-slate-700 dark:text-slate-200">Explicación: </span>
                  {r.explicacion}
                </p>
              )}
            </li>
          );
        })}
      </ol>

      {!calificado ? (
        <button
          type="button"
          onClick={calificar}
          disabled={contestadas < total}
          className="mt-5 w-full rounded-xl bg-blue-700 py-3 text-sm font-semibold text-white shadow-sm transition disabled:opacity-40"
        >
          {contestadas < total ? `Responde todas (${contestadas}/${total})` : 'Calificar'}
        </button>
      ) : (
        <div className="mt-5 rounded-2xl bg-blue-900 p-5 text-center text-white">
          <p className="text-xs uppercase tracking-wider text-blue-300">Tu resultado</p>
          <p className="mt-1 text-4xl font-bold">{porcentaje}%</p>
          <p className="mt-1 text-sm text-blue-200">
            {aciertos} de {total} correctas {porcentaje >= 80 ? '· ¡Aprobado!' : '· Necesitas ≥ 80%'}
          </p>
          <button
            type="button"
            onClick={reintentar}
            className="mt-4 rounded-lg bg-white/10 px-4 py-2 text-sm font-medium"
          >
            Reintentar
          </button>
        </div>
      )}
    </div>
  );
}

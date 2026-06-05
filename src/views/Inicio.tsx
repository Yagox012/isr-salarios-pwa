import { Link } from 'react-router-dom';
import { unidades } from '../content/units';
import { useProgress } from '../hooks/useProgress';

export default function Inicio() {
  const { estadoTema } = useProgress();

  const todosLosTemas = unidades.flatMap((u) => u.temas);
  const total = todosLosTemas.length;
  const completados = todosLosTemas.filter((t) => estadoTema(t.id) === 'completado').length;
  const enProgreso = todosLosTemas.filter((t) => estadoTema(t.id) === 'pendiente').length;
  const noIniciados = total - completados - enProgreso;
  const pct = total > 0 ? Math.round((completados / total) * 100) : 0;

  let siguiente: { unidadId: string; temaId: string; titulo: string } | null = null;
  for (const u of unidades) {
    for (const t of u.temas) {
      if (estadoTema(t.id) !== 'completado') {
        siguiente = { unidadId: u.id, temaId: t.id, titulo: t.titulo };
        break;
      }
    }
    if (siguiente) break;
  }

  return (
    <div className="text-slate-800 dark:text-slate-100">
      <header className="bg-blue-900 px-5 pb-6 pt-[calc(env(safe-area-inset-top)+1.25rem)] text-white">
        <p className="text-xs font-medium uppercase tracking-widest text-blue-300">ISR a salarios · 2534</p>
        <h1 className="mt-1 text-2xl font-bold leading-tight">Tu panel de estudio</h1>
      </header>

      <main className="mx-auto max-w-md space-y-6 px-5 py-6">
        <section className="rounded-2xl bg-blue-900 p-5 text-white shadow-lg">
          <p className="text-xs font-medium uppercase tracking-wider text-blue-300">Avance general</p>
          <p className="mt-1 text-4xl font-bold">{pct}%</p>
          <p className="text-sm text-blue-200">{completados} de {total} temas completados</p>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-blue-800">
            <div className="h-full rounded-full bg-emerald-400 transition-all" style={{ width: `${pct}%` }} />
          </div>
          <div className="mt-4 flex justify-between text-center text-xs">
            <div className="flex-1">
              <p className="text-lg font-bold text-emerald-400">{completados}</p>
              <p className="text-blue-200">Completados</p>
            </div>
            <div className="flex-1">
              <p className="text-lg font-bold text-amber-300">{enProgreso}</p>
              <p className="text-blue-200">En progreso</p>
            </div>
            <div className="flex-1">
              <p className="text-lg font-bold text-rose-300">{noIniciados}</p>
              <p className="text-blue-200">Sin iniciar</p>
            </div>
          </div>
        </section>

        {siguiente ? (
          <Link
            to={`/unidades/${siguiente.unidadId}/${siguiente.temaId}`}
            className="block rounded-2xl border border-blue-200 bg-blue-50 p-5 shadow-sm transition active:scale-[0.99] dark:border-blue-900 dark:bg-blue-950/40"
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">Continuar estudiando</p>
            <p className="mt-1 text-sm font-medium text-slate-800 dark:text-slate-100">{siguiente.titulo}</p>
          </Link>
        ) : (
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-center dark:border-emerald-900 dark:bg-emerald-950/40">
            <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-400">¡Completaste todos los temas! 🎉</p>
          </div>
        )}

        <section>
          <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">Por unidad</h2>
          <div className="space-y-2">
            {unidades.map((u) => {
              const comp = u.temas.filter((t) => estadoTema(t.id) === 'completado').length;
              const p = u.temas.length > 0 ? Math.round((comp / u.temas.length) * 100) : 0;
              return (
                <Link
                  key={u.id}
                  to="/unidades"
                  className="block rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition active:scale-[0.99] dark:border-slate-800 dark:bg-slate-900"
                >
                  <div className="flex items-baseline justify-between">
                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">Unidad {u.numero}</p>
                    <p className="text-xs text-slate-400 dark:text-slate-500">{comp}/{u.temas.length}</p>
                  </div>
                  <p className="mt-0.5 text-xs text-slate-500 line-clamp-1 dark:text-slate-400">{u.titulo}</p>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                    <div className="h-full rounded-full bg-blue-600 transition-all" style={{ width: `${p}%` }} />
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        <Link
          to="/calculadoras"
          className="block rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition active:scale-[0.99] dark:border-slate-800 dark:bg-slate-900"
        >
          <p className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">Herramienta</p>
          <p className="mt-1 text-sm font-medium text-slate-800 dark:text-slate-100">Calculadora de ISR mensual</p>
          <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">Calcula la retención con su procedimiento paso a paso.</p>
        </Link>
      </main>
    </div>
  );
}

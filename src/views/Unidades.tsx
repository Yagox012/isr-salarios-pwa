import { Link } from 'react-router-dom';
import { unidades } from '../content/units';
import { useProgress, type EstadoTema } from '../hooks/useProgress';
import { SpringCard, glassCard } from '../components/SpringCard';

const semaforo: Record<EstadoTema, { color: string; etiqueta: string }> = {
  completado: { color: 'bg-emerald-500', etiqueta: 'Completado' },
  pendiente:  { color: 'bg-amber-400',   etiqueta: 'Pendiente'  },
  no_iniciado:{ color: 'bg-rose-400',    etiqueta: 'No iniciado'},
};

export default function Unidades() {
  const { estadoTema } = useProgress();

  return (
    <div className="text-slate-800 dark:text-slate-100">
      <header className="bg-blue-900 px-5 pb-6 pt-[calc(env(safe-area-inset-top)+1.25rem)] text-white">
        <p className="text-xs font-medium uppercase tracking-widest text-blue-300">Temario · 2534</p>
        <h1 className="mt-1 text-2xl font-bold leading-tight">Unidades</h1>
      </header>

      <main className="mx-auto max-w-md space-y-6 px-5 py-6">
        {unidades.map((u) => (
          <section key={u.id}>
            <div className="mb-2 flex items-baseline justify-between">
              <h2 className="text-sm font-bold text-slate-800 dark:text-slate-100">Unidad {u.numero}</h2>
              <span className="text-xs text-slate-400 dark:text-slate-500">{u.horasTeoricas} h</span>
            </div>
            <p className="mb-3 text-sm text-slate-500 dark:text-slate-400">{u.titulo}</p>

            <ul className="space-y-2">
              {u.temas.map((t) => {
                const estado = estadoTema(t.id);
                const s = semaforo[estado];
                return (
                  <li key={t.id}>
                    <SpringCard
                      as={Link}
                      to={`/unidades/${u.id}/${t.id}`}
                      className={`flex items-center gap-3 ${glassCard} !p-4`}
                    >
                      <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${s.color}`} aria-hidden />
                      <span className="flex-1 text-sm font-medium text-slate-800 dark:text-slate-100">{t.titulo}</span>
                      <span className="text-slate-300 dark:text-slate-600">›</span>
                    </SpringCard>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </main>
    </div>
  );
}

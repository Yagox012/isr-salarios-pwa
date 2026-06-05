import { useState, type ComponentPropsWithoutRef, type ElementType } from 'react';
import { Link } from 'react-router-dom';
import { unidades } from '../content/units';
import { useProgress } from '../hooks/useProgress';

/* ──────────────────────────────────────────
   SpringCard — física de resorte al presionar
   Comprime rápido (0.08s) → rebote al soltar (cubic-bezier con overshoot)
────────────────────────────────────────── */
function SpringCard<T extends ElementType = 'div'>({
  as,
  children,
  style,
  ...props
}: { as?: T; children: React.ReactNode; style?: React.CSSProperties }
  & Omit<ComponentPropsWithoutRef<T>, 'as' | 'children' | 'style'>) {
  const [pressed, setPressed] = useState(false);
  const Tag = (as ?? 'div') as ElementType;
  return (
    <Tag
      {...props}
      style={{
        ...style,
        transform: pressed ? 'scale(0.964)' : 'scale(1)',
        transition: pressed
          ? 'transform 0.08s ease-out'
          : 'transform 0.52s cubic-bezier(0.34,1.56,0.64,1)',
      }}
      onTouchStart={() => setPressed(true)}
      onTouchEnd={() => setPressed(false)}
      onTouchCancel={() => setPressed(false)}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
    >
      {children}
    </Tag>
  );
}

/* Estilos reutilizables para tarjetas Liquid Glass */
const glassCard =
  'rounded-2xl border border-white/75 bg-white/72 p-5 backdrop-blur-xl ' +
  'shadow-[0_2px_20px_rgba(0,0,0,0.07),0_1px_0_rgba(255,255,255,0.88)_inset] ' +
  'dark:border-slate-700/40 dark:bg-slate-900/65 ' +
  'dark:shadow-[0_2px_20px_rgba(0,0,0,0.28),0_1px_0_rgba(255,255,255,0.04)_inset]';

export default function Inicio() {
  const { estadoTema } = useProgress();

  const todosLosTemas = unidades.flatMap((u) => u.temas);
  const total       = todosLosTemas.length;
  const completados = todosLosTemas.filter((t) => estadoTema(t.id) === 'completado').length;
  const enProgreso  = todosLosTemas.filter((t) => estadoTema(t.id) === 'pendiente').length;
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

      <main className="mx-auto max-w-md space-y-4 px-5 py-6">

        {/* ── Tarjeta de avance general ── */}
        <SpringCard
          className="spring-enter rounded-2xl border border-blue-700/40 p-5 text-white"
          style={{
            animationDelay: '0.04s',
            background: 'linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 60%, #2563eb 100%)',
            boxShadow: '0 6px 32px rgba(30,58,138,0.45), 0 1px 0 rgba(255,255,255,0.12) inset',
          }}
        >
          <p className="text-xs font-medium uppercase tracking-wider text-blue-300">Avance general</p>
          <p className="mt-1 text-4xl font-bold">{pct}%</p>
          <p className="text-sm text-blue-200">{completados} de {total} temas completados</p>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-blue-800/70">
            <div
              className="h-full rounded-full bg-emerald-400"
              style={{ width: `${pct}%`, transition: 'width 0.6s cubic-bezier(0.34,1.56,0.64,1)' }}
            />
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
        </SpringCard>

        {/* ── Continuar / completado ── */}
        {siguiente ? (
          <SpringCard
            as={Link}
            to={`/unidades/${siguiente.unidadId}/${siguiente.temaId}`}
            className={`spring-enter block ${glassCard}`}
            style={{ animationDelay: '0.11s' }}
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Continuar estudiando
            </p>
            <p className="mt-1 text-sm font-medium text-slate-800 dark:text-slate-100">
              {siguiente.titulo}
            </p>
          </SpringCard>
        ) : (
          <div
            className="spring-enter rounded-2xl border border-emerald-200/70 bg-emerald-50/80 p-5 text-center backdrop-blur-xl dark:border-emerald-800/40 dark:bg-emerald-950/40"
            style={{ animationDelay: '0.11s' }}
          >
            <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-400">
              ¡Completaste todos los temas! 🎉
            </p>
          </div>
        )}

        {/* ── Por unidad ── */}
        <section className="spring-enter space-y-2" style={{ animationDelay: '0.18s' }}>
          <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
            Por unidad
          </h2>
          {unidades.map((u, i) => {
            const comp = u.temas.filter((t) => estadoTema(t.id) === 'completado').length;
            const p    = u.temas.length > 0 ? Math.round((comp / u.temas.length) * 100) : 0;
            return (
              <SpringCard
                key={u.id}
                as={Link}
                to="/unidades"
                className={`block ${glassCard}`}
                style={{ animationDelay: `${0.22 + i * 0.06}s` } as React.CSSProperties}
              >
                <div className="flex items-baseline justify-between">
                  <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                    Unidad {u.numero}
                  </p>
                  <p className="text-xs text-slate-400 dark:text-slate-500">{comp}/{u.temas.length}</p>
                </div>
                <p className="mt-0.5 line-clamp-1 text-xs text-slate-500 dark:text-slate-400">
                  {u.titulo}
                </p>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                  <div
                    className="h-full rounded-full bg-blue-600"
                    style={{
                      width: `${p}%`,
                      transition: 'width 0.6s cubic-bezier(0.34,1.56,0.64,1)',
                    }}
                  />
                </div>
              </SpringCard>
            );
          })}
        </section>

        {/* ── Calculadora ── */}
        <SpringCard
          as={Link}
          to="/calculadoras"
          className={`spring-enter block ${glassCard}`}
          style={{ animationDelay: `${0.22 + unidades.length * 0.06}s` }}
        >
          <p className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            Herramienta
          </p>
          <p className="mt-1 text-sm font-medium text-slate-800 dark:text-slate-100">
            Calculadora de ISR mensual
          </p>
          <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
            Calcula la retención con su procedimiento paso a paso.
          </p>
        </SpringCard>

      </main>
    </div>
  );
}

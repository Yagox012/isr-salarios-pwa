import { useState } from 'react';
import { fiscalConfig } from '../content/fiscalConfig';
import { useProgress } from '../hooks/useProgress';
import { useTheme, type Tema } from '../hooks/useTheme';
import { SpringCard, glassCard } from '../components/SpringCard';

const mxn = (n: number) =>
  n.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' });

const opcionesTema: { id: Tema; label: string }[] = [
  { id: 'claro',   label: 'Claro'  },
  { id: 'oscuro',  label: 'Oscuro' },
  { id: 'sistema', label: 'Sistema'},
];

export default function Ajustes() {
  const { reiniciar } = useProgress();
  const { tema, setTema } = useTheme();
  const [confirmando, setConfirmando] = useState(false);

  const cifras: { etiqueta: string; valor: string }[] = [
    { etiqueta: 'UMA diaria', valor: mxn(fiscalConfig.uma.diario) },
    { etiqueta: 'UMA mensual', valor: mxn(fiscalConfig.uma.mensual) },
    { etiqueta: 'Salario mínimo general (diario)', valor: mxn(fiscalConfig.salarioMinimo.generalDiario) },
    { etiqueta: 'Subsidio para el empleo (máx. mensual)', valor: mxn(fiscalConfig.subsidioEmpleo.montoMensualMaximo) },
    { etiqueta: 'ISN CDMX (tasa general)', valor: `${fiscalConfig.impuestoSobreNominas.cdmx.tasaGeneral}%` },
    { etiqueta: 'ISN Estado de México', valor: `${fiscalConfig.impuestoSobreNominas.edomex.tasaGeneral}%` },
  ];

  return (
    <div className="text-slate-800 dark:text-slate-100">
      <header className="bg-blue-900 px-5 pb-6 pt-[calc(env(safe-area-inset-top)+1.25rem)] text-white">
        <p className="text-xs font-medium uppercase tracking-widest text-blue-300">Configuración</p>
        <h1 className="mt-1 text-2xl font-bold leading-tight">Ajustes</h1>
      </header>

      <main className="mx-auto max-w-md space-y-4 px-5 py-6">
        {/* Apariencia */}
        <section className={glassCard}>
          <h2 className="text-sm font-bold text-slate-800 dark:text-slate-100">Apariencia</h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Elige el tema de la app.</p>
          <div className="mt-3 flex gap-1 rounded-xl bg-slate-100/80 p-1 dark:bg-slate-800/80">
            {opcionesTema.map((o) => (
              <SpringCard
                key={o.id}
                as="button"
                type="button"
                onClick={() => setTema(o.id)}
                className={`flex-1 rounded-lg py-2 text-sm font-medium transition-colors ${
                  tema === o.id
                    ? 'bg-white text-blue-700 shadow-sm dark:bg-slate-700 dark:text-blue-300'
                    : 'text-slate-500 dark:text-slate-400'
                }`}
              >
                {o.label}
              </SpringCard>
            ))}
          </div>
        </section>

        {/* Cifras fiscales */}
        <section className={glassCard}>
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-800 dark:text-slate-100">Cifras fiscales</h2>
            <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-700 dark:bg-blue-950 dark:text-blue-300">
              Vigencia {fiscalConfig.vigencia}
            </span>
          </div>
          <dl className="mt-3 divide-y divide-slate-100/80 dark:divide-slate-800/80">
            {cifras.map((c) => (
              <div key={c.etiqueta} className="flex items-center justify-between py-2">
                <dt className="text-sm text-slate-500 dark:text-slate-400">{c.etiqueta}</dt>
                <dd className="text-sm font-semibold tabular-nums text-slate-800 dark:text-slate-100">{c.valor}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-3 text-xs text-slate-400 dark:text-slate-500">
            Las cifras se actualizan editando un solo archivo. Consulta ACTUALIZAR_CIFRAS.md.
          </p>
        </section>

        {/* Reiniciar progreso */}
        <section className={glassCard}>
          <h2 className="text-sm font-bold text-slate-800 dark:text-slate-100">Progreso</h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Borra el avance de todos los temas (teoría, flashcards y quizzes). No se puede deshacer.
          </p>
          {!confirmando ? (
            <SpringCard
              as="button"
              type="button"
              onClick={() => setConfirmando(true)}
              className="mt-3 w-full rounded-xl border border-rose-200 bg-rose-50/80 py-3 text-sm font-semibold text-rose-700 backdrop-blur-sm dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-400"
            >
              Reiniciar mi progreso
            </SpringCard>
          ) : (
            <div className="mt-3 space-y-2">
              <p className="text-sm font-medium text-rose-700 dark:text-rose-400">¿Seguro? Esto borra todo tu avance.</p>
              <div className="flex gap-2">
                <SpringCard
                  as="button"
                  type="button"
                  onClick={() => setConfirmando(false)}
                  className="flex-1 rounded-xl border border-slate-200 py-3 text-sm font-medium text-slate-600 dark:border-slate-700 dark:text-slate-300"
                >
                  Cancelar
                </SpringCard>
                <SpringCard
                  as="button"
                  type="button"
                  onClick={() => { reiniciar(); setConfirmando(false); }}
                  className="flex-1 rounded-xl bg-rose-600 py-3 text-sm font-semibold text-white"
                >
                  Sí, borrar
                </SpringCard>
              </div>
            </div>
          )}
        </section>

        {/* Acerca de */}
        <section className={glassCard}>
          <h2 className="text-sm font-bold text-slate-800 dark:text-slate-100">Acerca de</h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            App de estudio de la asignatura "ISR a salarios, seguridad social e impuestos locales sobre nóminas" (clave 2534). Tu progreso se guarda localmente en este dispositivo.
          </p>
        </section>
      </main>
    </div>
  );
}

import { useState, useMemo } from 'react';
import { calcularIsrMensual } from '../../lib/isr';
import { fiscalConfig } from '../../content/fiscalConfig';
import { SpringCard, glassCard } from '../../components/SpringCard';

const mxn = (n: number) =>
  n.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' });

export default function IsrMensualCalculator() {
  const [sueldoTexto, setSueldoTexto] = useState('');

  const sueldo  = parseFloat(sueldoTexto);
  const valido  = !Number.isNaN(sueldo) && sueldo > 0;
  const resultado = useMemo(
    () => (valido ? calcularIsrMensual(sueldo) : null),
    [sueldo, valido],
  );

  return (
    <div className="text-slate-800 dark:text-slate-100">
      <header className="bg-blue-900 px-5 pb-6 pt-[calc(env(safe-area-inset-top)+1.25rem)] text-white">
        <p className="text-xs font-medium uppercase tracking-widest text-blue-300">Calculadora · Unidad 1</p>
        <h1 className="mt-1 text-2xl font-bold leading-tight">ISR mensual de sueldos</h1>
        <p className="mt-1 text-sm text-blue-200">Art. 96 LISR · cifras vigentes {fiscalConfig.vigencia}</p>
      </header>

      <main className="mx-auto max-w-md px-5 py-6">
        <label className="block">
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Ingreso mensual gravado</span>
          <div className="mt-2 flex items-center rounded-xl border border-white/75 bg-white/72 px-4 backdrop-blur-xl shadow-[0_2px_20px_rgba(0,0,0,0.07)] focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 dark:border-slate-700/40 dark:bg-slate-900/65 dark:focus-within:ring-blue-900">
            <span className="text-lg text-slate-400">$</span>
            <input
              type="number"
              inputMode="decimal"
              value={sueldoTexto}
              onChange={(e) => setSueldoTexto(e.target.value)}
              placeholder="0.00"
              className="w-full bg-transparent px-2 py-3 text-lg tabular-nums text-slate-800 outline-none dark:text-slate-100"
            />
          </div>
          <p className="mt-1.5 text-xs text-slate-400 dark:text-slate-500">Usa el ingreso ya sin la parte exenta.</p>
        </label>

        {resultado && (
          <SpringCard
            className="mt-6 rounded-2xl border border-blue-700/40 p-5 text-white"
            style={{
              background: 'linear-gradient(135deg,#1e3a8a 0%,#1d4ed8 60%,#2563eb 100%)',
              boxShadow: '0 6px 32px rgba(30,58,138,0.4),0 1px 0 rgba(255,255,255,0.12) inset',
            }}
          >
            <p className="text-xs font-medium uppercase tracking-wider text-blue-300">ISR a retener</p>
            <p className="mt-1 text-4xl font-bold tabular-nums">{mxn(resultado.isrARetener)}</p>
            {resultado.cubiertoPorSubsidio && (
              <p className="mt-2 text-sm text-blue-200">El subsidio para el empleo absorbe el ISR causado.</p>
            )}
          </SpringCard>
        )}

        {resultado && (
          <section className="mt-6">
            <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">Procedimiento</h2>
            <ol className="space-y-2">
              {resultado.pasos.map((paso, i) => (
                <SpringCard
                  key={i}
                  className={`spring-enter ${glassCard} !p-4`}
                  style={{ animationDelay: `${i * 0.05}s` }}
                >
                  <p className="text-sm font-semibold text-blue-800 dark:text-blue-300">{paso.etiqueta}</p>
                  <p className="mt-1 text-sm tabular-nums text-slate-600 dark:text-slate-300">{paso.detalle}</p>
                </SpringCard>
              ))}
            </ol>
          </section>
        )}

        {!resultado && (
          <div className="mt-10 rounded-2xl border border-dashed border-slate-300/70 p-8 text-center text-slate-400 dark:border-slate-700 dark:text-slate-500">
            <p className="text-sm">Escribe un sueldo mensual para ver el cálculo y su procedimiento.</p>
          </div>
        )}
      </main>
    </div>
  );
}

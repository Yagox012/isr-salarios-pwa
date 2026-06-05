import { useState, useMemo } from 'react';
import { calcularIsrMensual } from '../../lib/isr';
import { fiscalConfig } from '../../content/fiscalConfig';

const mxn = (n: number) =>
  n.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' });

export default function IsrMensualCalculator() {
  const [sueldoTexto, setSueldoTexto] = useState('');

  const sueldo = parseFloat(sueldoTexto);
  const valido = !Number.isNaN(sueldo) && sueldo > 0;

  const resultado = useMemo(
    () => (valido ? calcularIsrMensual(sueldo) : null),
    [sueldo, valido],
  );

  return (
    <div className="text-slate-800 dark:text-slate-100">
      <header className="bg-blue-900 px-5 pb-6 pt-[max(1.5rem,env(safe-area-inset-top))] text-white">
        <p className="text-xs font-medium uppercase tracking-widest text-blue-300">Calculadora · Unidad 1</p>
        <h1 className="mt-1 text-2xl font-bold leading-tight">ISR mensual de sueldos</h1>
        <p className="mt-1 text-sm text-blue-200">Art. 96 LISR · cifras vigentes {fiscalConfig.vigencia}</p>
      </header>

      <main className="mx-auto max-w-md px-5 py-6">
        <label className="block">
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Ingreso mensual gravado</span>
          <div className="mt-2 flex items-center rounded-xl border border-slate-300 bg-white px-4 shadow-sm focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-100 dark:border-slate-700 dark:bg-slate-900 dark:focus-within:ring-blue-900">
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
          <div className="mt-6 rounded-2xl bg-blue-900 p-5 text-white shadow-lg">
            <p className="text-xs font-medium uppercase tracking-wider text-blue-300">ISR a retener</p>
            <p className="mt-1 text-4xl font-bold tabular-nums">{mxn(resultado.isrARetener)}</p>
            {resultado.cubiertoPorSubsidio && (
              <p className="mt-2 text-sm text-blue-200">El subsidio para el empleo absorbe el ISR causado.</p>
            )}
          </div>
        )}

        {resultado && (
          <section className="mt-6">
            <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">Procedimiento</h2>
            <ol className="space-y-2">
              {resultado.pasos.map((paso, i) => (
                <li key={i} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                  <p className="text-sm font-semibold text-blue-800 dark:text-blue-300">{paso.etiqueta}</p>
                  <p className="mt-1 text-sm tabular-nums text-slate-600 dark:text-slate-300">{paso.detalle}</p>
                </li>
              ))}
            </ol>
          </section>
        )}

        {!resultado && (
          <div className="mt-10 rounded-2xl border border-dashed border-slate-300 p-8 text-center text-slate-400 dark:border-slate-700 dark:text-slate-500">
            <p className="text-sm">Escribe un sueldo mensual para ver el cálculo y su procedimiento.</p>
          </div>
        )}
      </main>
    </div>
  );
}

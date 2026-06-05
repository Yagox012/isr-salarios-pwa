/**
 * ============================================================================
 *  isr.ts  —  Motor de cálculo del ISR mensual de sueldos (art. 96 LISR)
 * ============================================================================
 *  Funciones PURAS (sin UI). Leen exclusivamente de fiscalConfig.ts.
 *  Devuelven el resultado + el procedimiento paso a paso para mostrarlo.
 * ============================================================================
 */

import { fiscalConfig, type RenglonTarifa } from '../content/fiscalConfig';

/** Un paso del procedimiento, para mostrar en la calculadora. */
export interface PasoCalculo {
  etiqueta: string;
  detalle: string;
  /** Valor numérico del paso (cuando aplica). */
  valor?: number;
}

export interface ResultadoIsrMensual {
  baseGravable: number;
  renglon: RenglonTarifa;
  excedente: number;
  impuestoMarginal: number;
  cuotaFija: number;
  isrCausado: number;
  subsidioAplicable: number;
  /** ISR que finalmente se retiene al trabajador (nunca negativo). */
  isrARetener: number;
  /** true si el subsidio absorbió todo el ISR (retención = 0). */
  cubiertoPorSubsidio: boolean;
  pasos: PasoCalculo[];
}

/** Redondea a 2 decimales (centavos). */
const r2 = (n: number): number => Math.round(n * 100) / 100;

/** Da formato de pesos para los textos del procedimiento. */
const mxn = (n: number): string =>
  n.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' });

/**
 * Ubica el renglón de una tarifa que corresponde a una base gravable.
 * El último renglón (limiteSuperior = null) significa "En adelante".
 */
export function ubicarRenglon(base: number, tarifa: RenglonTarifa[]): RenglonTarifa {
  const encontrado = tarifa.find(
    (r) => base >= r.limiteInferior && (r.limiteSuperior === null || base <= r.limiteSuperior),
  );
  // Si la base es mayor que todos los topes, cae en el último renglón.
  return encontrado ?? tarifa[tarifa.length - 1];
}

/**
 * Calcula el subsidio para el empleo aplicable a un ingreso mensual gravado.
 * Desde la reforma 2024, solo REDUCE el ISR; el excedente NO se entrega al trabajador.
 */
export function calcularSubsidioEmpleo(ingresoGravado: number): number {
  const { montoMensualMaximo, topeIngresoMensualGravado } = fiscalConfig.subsidioEmpleo;
  return ingresoGravado <= topeIngresoMensualGravado ? montoMensualMaximo : 0;
}

/**
 * Calcula el ISR mensual a retener por sueldos y salarios.
 * @param baseGravable Ingreso mensual gravado (ya sin ingresos exentos).
 */
export function calcularIsrMensual(baseGravable: number): ResultadoIsrMensual {
  const tarifa = fiscalConfig.isr.tarifaMensual;
  const renglon = ubicarRenglon(baseGravable, tarifa);

  const excedente = r2(baseGravable - renglon.limiteInferior);
  const impuestoMarginal = r2(excedente * (renglon.porcentajeExcedente / 100));
  const cuotaFija = renglon.cuotaFija;
  const isrCausado = r2(impuestoMarginal + cuotaFija);

  const subsidioAplicable = calcularSubsidioEmpleo(baseGravable);
  const isrARetener = r2(Math.max(0, isrCausado - subsidioAplicable));
  const cubiertoPorSubsidio = isrCausado - subsidioAplicable <= 0;

  const pasos: PasoCalculo[] = [
    {
      etiqueta: '1. Base gravable',
      detalle: `Ingreso mensual gravado: ${mxn(baseGravable)}`,
      valor: baseGravable,
    },
    {
      etiqueta: '2. Ubicar renglón de la tarifa',
      detalle: `Límite inferior ${mxn(renglon.limiteInferior)} · tasa ${renglon.porcentajeExcedente.toFixed(2)}% · cuota fija ${mxn(cuotaFija)}`,
    },
    {
      etiqueta: '3. Excedente del límite inferior',
      detalle: `${mxn(baseGravable)} − ${mxn(renglon.limiteInferior)} = ${mxn(excedente)}`,
      valor: excedente,
    },
    {
      etiqueta: '4. Impuesto marginal',
      detalle: `${mxn(excedente)} × ${renglon.porcentajeExcedente.toFixed(2)}% = ${mxn(impuestoMarginal)}`,
      valor: impuestoMarginal,
    },
    {
      etiqueta: '5. ISR causado',
      detalle: `${mxn(impuestoMarginal)} + cuota fija ${mxn(cuotaFija)} = ${mxn(isrCausado)}`,
      valor: isrCausado,
    },
    {
      etiqueta: '6. Subsidio para el empleo',
      detalle:
        subsidioAplicable > 0
          ? `Ingreso ≤ ${mxn(fiscalConfig.subsidioEmpleo.topeIngresoMensualGravado)} → subsidio ${mxn(subsidioAplicable)}`
          : `Ingreso > ${mxn(fiscalConfig.subsidioEmpleo.topeIngresoMensualGravado)} → sin subsidio`,
      valor: subsidioAplicable,
    },
    {
      etiqueta: '7. ISR a retener',
      detalle: cubiertoPorSubsidio
        ? `El subsidio absorbe el ISR causado → retención ${mxn(0)}`
        : `${mxn(isrCausado)} − ${mxn(subsidioAplicable)} = ${mxn(isrARetener)}`,
      valor: isrARetener,
    },
  ];

  return {
    baseGravable,
    renglon,
    excedente,
    impuestoMarginal,
    cuotaFija,
    isrCausado,
    subsidioAplicable,
    isrARetener,
    cubiertoPorSubsidio,
    pasos,
  };
}

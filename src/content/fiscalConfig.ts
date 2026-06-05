/**
 * ============================================================================
 *  fiscalConfig.ts  —  ÚNICA FUENTE DE VERDAD de cifras fiscales
 * ============================================================================
 *  Materia: ISR a salarios, seguridad social e impuestos locales sobre nóminas
 *  Vigencia: ejercicio fiscal 2026
 *
 *  ⚠️ REGLA DE ORO: Ninguna cifra numérica fiscal debe escribirse en otro
 *  archivo. Calculadoras, quizzes y teoría SIEMPRE leen de aquí.
 *  Para actualizar cada año, lee ACTUALIZAR_CIFRAS.md
 *
 *  Fuentes oficiales (verificadas):
 *   - UMA 2026: INEGI, DOF 09/01/2026 (vigente desde 01/02/2026)
 *   - Tarifas ISR art. 96 y 152: SAT, Anexo 8 RMF 2026, DOF 28/12/2025
 *   - Subsidio para el empleo 2026: Decreto DOF 31/12/2025
 *   - Salario mínimo 2026: CONASAMI (vigente desde 01/01/2026)
 *   - ISN CDMX: Art. 158 Código Fiscal CDMX
 *   - ISN EdoMéx: Código Financiero del Estado de México
 *   - Cuotas IMSS/INFONAVIT: LSS y Ley del INFONAVIT
 * ============================================================================
 */

// ---------------------------------------------------------------------------
//  Tipos
// ---------------------------------------------------------------------------

/** Un renglón de cualquier tarifa de ISR (art. 96 / 152). */
export interface RenglonTarifa {
  limiteInferior: number;
  /** null = "En adelante" (último renglón). */
  limiteSuperior: number | null;
  cuotaFija: number;
  /** Porcentaje sobre el excedente del límite inferior (ej. 6.4 = 6.40%). */
  porcentajeExcedente: number;
}

/** Cuota repartida entre patrón y trabajador (obrero). */
export interface CuotaObreroPatronal {
  /** % a cargo del patrón. */
  patron: number;
  /** % a cargo del trabajador (obrero). 0 si no aplica. */
  obrero: number;
  /** Base sobre la que se aplica el %. */
  base: 'SBC' | 'UMA' | 'SBC_excedente_3UMA';
  nota?: string;
}

export interface FiscalConfig {
  vigencia: number;
  uma: { diario: number; mensual: number; anual: number; vigenciaDesde: string };
  salarioMinimo: {
    generalDiario: number;
    generalMensual: number;
    zonaLibreFronteraNorteDiario: number | null;
    vigenciaDesde: string;
  };
  isr: {
    tarifaMensual: RenglonTarifa[];
    tarifaAnual: RenglonTarifa[];
  };
  subsidioEmpleo: {
    porcentajeUmaMensual: number;
    montoMensualMaximo: number;
    topeIngresoMensualGravado: number;
    nota: string;
  };
  imss: {
    topeSbcEnUma: number;
    seguros: Record<string, CuotaObreroPatronal>;
    riesgoTrabajoNota: string;
    cesantiaVejezPatronalNota: string;
  };
  infonavit: { aportacionPatronal: number; base: 'SBC' };
  impuestoSobreNominas: {
    cdmx: { tasaGeneral: number; reduccionMicro: number; reduccionPequenia: number; nota: string };
    edomex: { tasaGeneral: number; nota: string };
  };
}

// ---------------------------------------------------------------------------
//  Configuración 2026
// ---------------------------------------------------------------------------

export const fiscalConfig: FiscalConfig = {
  vigencia: 2026,

  // UMA — INEGI (vigente 01/02/2026). Mensual = diario × 30.4; anual = mensual × 12.
  uma: {
    diario: 117.31,
    mensual: 3566.22,
    anual: 42794.64,
    vigenciaDesde: '2026-02-01',
  },

  // Salario mínimo — CONASAMI (vigente 01/01/2026). General +13% vs 2025.
  salarioMinimo: {
    generalDiario: 315.04,
    generalMensual: 9577.22, // 315.04 × 30.4
    zonaLibreFronteraNorteDiario: null, // PENDIENTE: verificar valor oficial ZLFN 2026
    vigenciaDesde: '2026-01-01',
  },

  isr: {
    // Tarifa MENSUAL art. 96 LISR — Anexo 8 RMF 2026 (sección B.V).
    tarifaMensual: [
      { limiteInferior: 0.01,      limiteSuperior: 844.59,     cuotaFija: 0.0,       porcentajeExcedente: 1.92 },
      { limiteInferior: 844.60,    limiteSuperior: 7168.51,    cuotaFija: 16.22,     porcentajeExcedente: 6.40 },
      { limiteInferior: 7168.52,   limiteSuperior: 12598.02,   cuotaFija: 420.95,    porcentajeExcedente: 10.88 },
      { limiteInferior: 12598.03,  limiteSuperior: 14644.64,   cuotaFija: 1011.68,   porcentajeExcedente: 16.00 },
      { limiteInferior: 14644.65,  limiteSuperior: 17533.64,   cuotaFija: 1339.14,   porcentajeExcedente: 17.92 },
      { limiteInferior: 17533.65,  limiteSuperior: 35362.83,   cuotaFija: 1856.84,   porcentajeExcedente: 21.36 },
      { limiteInferior: 35362.84,  limiteSuperior: 55736.68,   cuotaFija: 5665.16,   porcentajeExcedente: 23.52 },
      { limiteInferior: 55736.69,  limiteSuperior: 106410.50,  cuotaFija: 10457.09,  porcentajeExcedente: 30.00 },
      { limiteInferior: 106410.51, limiteSuperior: 141880.66,  cuotaFija: 25659.23,  porcentajeExcedente: 32.00 },
      { limiteInferior: 141880.67, limiteSuperior: 425641.99,  cuotaFija: 37009.69,  porcentajeExcedente: 34.00 },
      { limiteInferior: 425642.00, limiteSuperior: null,       cuotaFija: 133488.54, porcentajeExcedente: 35.00 },
    ],
    // Tarifa ANUAL art. 152 LISR (declaración anual) — Anexo 8 RMF 2026 (sección C.II).
    tarifaAnual: [
      { limiteInferior: 0.01,       limiteSuperior: 10135.11,    cuotaFija: 0.0,        porcentajeExcedente: 1.92 },
      { limiteInferior: 10135.12,   limiteSuperior: 86022.11,    cuotaFija: 194.59,     porcentajeExcedente: 6.40 },
      { limiteInferior: 86022.12,   limiteSuperior: 151176.19,   cuotaFija: 5051.37,    porcentajeExcedente: 10.88 },
      { limiteInferior: 151176.20,  limiteSuperior: 175735.66,   cuotaFija: 12140.13,   porcentajeExcedente: 16.00 },
      { limiteInferior: 175735.67,  limiteSuperior: 210403.69,   cuotaFija: 16069.64,   porcentajeExcedente: 17.92 },
      { limiteInferior: 210403.70,  limiteSuperior: 424353.97,   cuotaFija: 22282.14,   porcentajeExcedente: 21.36 },
      { limiteInferior: 424353.98,  limiteSuperior: 668840.14,   cuotaFija: 67981.92,   porcentajeExcedente: 23.52 },
      { limiteInferior: 668840.15,  limiteSuperior: 1276925.98,  cuotaFija: 125485.07,  porcentajeExcedente: 30.00 },
      { limiteInferior: 1276925.99, limiteSuperior: 1702567.97,  cuotaFija: 307910.81,  porcentajeExcedente: 32.00 },
      { limiteInferior: 1702567.98, limiteSuperior: 5107703.92,  cuotaFija: 444116.23,  porcentajeExcedente: 34.00 },
      { limiteInferior: 5107703.93, limiteSuperior: null,        cuotaFija: 1601862.46, porcentajeExcedente: 35.00 },
    ],
  },

  // Subsidio para el empleo 2026 (Decreto DOF 31/12/2025).
  // Monto mensual = UMA mensual × 15.02%. Solo reduce el ISR; el excedente NO se entrega al trabajador.
  // Nota transitoria: en ENERO 2026 se aplica 15.59% sobre la UMA vigente de 2025.
  subsidioEmpleo: {
    porcentajeUmaMensual: 15.02,
    montoMensualMaximo: 535.65, // 3566.22 × 15.02%
    topeIngresoMensualGravado: 11492.66,
    nota: 'Aplica solo si el ingreso mensual gravado no excede el tope. No puede exceder el ISR causado.',
  },

  // Cuotas obrero-patronales del Seguro Social (LSS). Topes de SBC en UMA.
  imss: {
    topeSbcEnUma: 25,
    seguros: {
      // Enfermedades y Maternidad
      eym_especie_cuotaFija:    { patron: 20.40, obrero: 0.0,   base: 'UMA',                nota: 'Cuota fija por cada trabajador (art. 106-I LSS).' },
      eym_especie_excedente:    { patron: 1.10,  obrero: 0.40,  base: 'SBC_excedente_3UMA', nota: 'Sobre el SBC que exceda 3 UMA (art. 106-II LSS).' },
      eym_dinero:               { patron: 0.70,  obrero: 0.25,  base: 'SBC',                nota: 'Prestaciones en dinero (art. 107 LSS).' },
      eym_gastosMedicosPension: { patron: 1.05,  obrero: 0.375, base: 'SBC',                nota: 'Gastos médicos pensionados (art. 25 LSS).' },
      // Invalidez y Vida
      invalidezVida:            { patron: 1.75,  obrero: 0.625, base: 'SBC',                nota: 'Art. 147 LSS.' },
      // Retiro, Cesantía y Vejez (RCV)
      retiro:                   { patron: 2.00,  obrero: 0.0,   base: 'SBC',                nota: 'Art. 168-I LSS.' },
      cesantiaVejez_obrero:     { patron: 0.0,   obrero: 1.125, base: 'SBC',                nota: 'Cuota obrera fija (art. 168-II LSS).' },
      // Guarderías y Prestaciones Sociales
      guarderias:               { patron: 1.00,  obrero: 0.0,   base: 'SBC',                nota: 'Art. 211 LSS.' },
    },
    riesgoTrabajoNota:
      'Riesgos de trabajo: prima VARIABLE según siniestralidad de cada empresa (mín. 0.50%). Se captura por separado.',
    cesantiaVejezPatronalNota:
      'PENDIENTE VERIFICAR 2026: la cuota PATRONAL de Cesantía y Vejez es progresiva según SBC (reforma 2020, transición 2023-2030). Confirmar la tabla del año en la LSS / IMSS antes de usarla en la calculadora.',
  },

  // Aportación de vivienda
  infonavit: {
    aportacionPatronal: 5.00,
    base: 'SBC',
  },

  // Impuestos locales sobre nóminas (a cargo del PATRÓN, no se descuenta al trabajador)
  impuestoSobreNominas: {
    cdmx: {
      tasaGeneral: 4.00, // vigente desde 2025, sin cambio en 2026 (Art. 158 Código Fiscal CDMX)
      reduccionMicro: 1.00,   // microempresas 0-10 trabajadores -> 3% efectivo
      reduccionPequenia: 0.50, // pequeñas 11-50 trabajadores -> 3.5% efectivo
      nota: 'Sobre erogaciones por remuneraciones al trabajo personal subordinado.',
    },
    edomex: {
      tasaGeneral: 3.00, // Código Financiero del Estado de México
      nota: 'Verificar adicionales/sobretasas estatales vigentes para el ejercicio.',
    },
  },
};

export default fiscalConfig;

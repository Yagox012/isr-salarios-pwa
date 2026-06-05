import IsrMensualCalculator from '../features/calculators/IsrMensualCalculator';

/**
 * Vista de Calculadoras. Por ahora muestra la de ISR mensual.
 * Más adelante será una lista: ISR, Cuotas IMSS, INFONAVIT, ISN (CDMX/EdoMéx).
 */
export default function Calculadoras() {
  return <IsrMensualCalculator />;
}

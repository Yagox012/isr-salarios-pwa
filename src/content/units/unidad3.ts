import type { Unidad } from './types';

export const unidad3: Unidad = {
  id: 'u3',
  numero: 3,
  titulo: 'Impuestos sobre nóminas de la CDMX y el Estado de México',
  descripcion:
    'El impuesto local sobre nóminas (ISN): sujetos, base, tasa y época de pago, según el Código Fiscal de la CDMX y el Código Financiero del Estado de México.',
  horasTeoricas: 8,
  temas: [
    {
      id: 'u3t1',
      titulo: 'Características generales del ISN',
      articulosReferencia: ['Código Fiscal CDMX', 'Código Financiero del Estado de México'],
      teoria: [
        'El Impuesto Sobre Nóminas (ISN) es un impuesto estatal (local) que grava las erogaciones por concepto de remuneraciones al trabajo personal subordinado. Es un impuesto a cargo del PATRÓN: no se descuenta del salario del trabajador, sino que constituye un costo laboral adicional para la empresa.',
        'Como cada entidad federativa tiene su propia legislación, la tasa, la base gravable, las exenciones y la época de pago pueden variar de un estado a otro. Por regla general es un impuesto de pago mensual, que se entera a más tardar alrededor del día 17 del mes siguiente.',
        'La base se integra con el total de las erogaciones gravadas por remuneraciones al trabajo subordinado (sueldos, salarios y prestaciones gravadas). Algunos conceptos pueden estar expresamente exentos en la ley local de cada estado, por lo que la base no necesariamente coincide entre entidades.',
        'Un criterio relevante es el de territorialidad: el ISN se causa en el estado donde se presta el servicio (donde labora físicamente el trabajador). Una empresa con sucursales en varios estados paga el ISN de cada entidad por los trabajadores que laboran en ella. Además, el ISN es deducible para efectos del ISR federal.',
      ],
      flashcards: [
        { id: 'u3t1f1', pregunta: '¿Quién paga el ISN?', respuesta: 'El patrón; no se descuenta al trabajador, es un costo laboral de la empresa.' },
        { id: 'u3t1f2', pregunta: '¿Qué grava el ISN?', respuesta: 'Las erogaciones por remuneraciones al trabajo personal subordinado.' },
        { id: 'u3t1f3', pregunta: '¿Dónde se causa el ISN (territorialidad)?', respuesta: 'En el estado donde el trabajador presta físicamente el servicio.' },
        { id: 'u3t1f4', pregunta: '¿El ISN es deducible para el ISR?', respuesta: 'Sí, el ISN pagado es deducible para efectos del ISR federal.' },
      ],
      quiz: [
        {
          id: 'u3t1q1',
          tipo: 'verdadero_falso',
          pregunta: 'El ISN se descuenta del salario del trabajador.',
          opciones: [
            { texto: 'Verdadero', correcta: false },
            { texto: 'Falso', correcta: true },
          ],
          explicacion: 'Falso: el ISN está a cargo del patrón; es un costo de la empresa, no un descuento al trabajador.',
        },
        {
          id: 'u3t1q2',
          tipo: 'opcion_multiple',
          pregunta: '¿Quién es el sujeto obligado al pago del ISN?',
          opciones: [
            { texto: 'El patrón', correcta: true },
            { texto: 'El trabajador', correcta: false },
            { texto: 'El municipio', correcta: false },
            { texto: 'El SAT', correcta: false },
          ],
          explicacion: 'El ISN es a cargo del patrón por las erogaciones al trabajo subordinado.',
        },
        {
          id: 'u3t1q3',
          tipo: 'opcion_multiple',
          pregunta: '¿Qué grava el ISN?',
          opciones: [
            { texto: 'Las erogaciones por remuneraciones al trabajo personal subordinado', correcta: true },
            { texto: 'Las utilidades de la empresa', correcta: false },
            { texto: 'El valor de las ventas', correcta: false },
            { texto: 'Los dividendos pagados', correcta: false },
          ],
          explicacion: 'El ISN grava las erogaciones por remuneraciones al trabajo personal subordinado.',
        },
        {
          id: 'u3t1q4',
          tipo: 'verdadero_falso',
          pregunta: 'El ISN se causa en el estado donde el trabajador presta físicamente el servicio.',
          opciones: [
            { texto: 'Verdadero', correcta: true },
            { texto: 'Falso', correcta: false },
          ],
          explicacion: 'Correcto: por territorialidad, el ISN se causa donde se presta el servicio.',
        },
        {
          id: 'u3t1q5',
          tipo: 'verdadero_falso',
          pregunta: 'El ISN pagado es deducible para efectos del ISR federal.',
          opciones: [
            { texto: 'Verdadero', correcta: true },
            { texto: 'Falso', correcta: false },
          ],
          explicacion: 'Correcto: el ISN es una contribución deducible para el ISR.',
        },
      ],
    },
    {
      id: 'u3t2',
      titulo: 'ISN en la Ciudad de México',
      articulosReferencia: ['Código Fiscal de la CDMX, art. 156-159'],
      teoria: [
        'En la Ciudad de México el ISN se regula en el Código Fiscal local. La tasa general es del 4% sobre la base gravable (las erogaciones por remuneraciones al trabajo personal subordinado), conforme al artículo 158. Esta tasa subió del 3% al 4% a partir de 2025.',
        'Existen estímulos por tamaño de empresa: las microempresas (0 a 10 trabajadores) pueden obtener una reducción que deja una tasa efectiva del 3%, y las pequeñas empresas (11 a 50 trabajadores) una reducción que deja una tasa efectiva del 3.5%. Conviene verificar los requisitos vigentes para aplicarlos.',
        'La base se integra con sueldos, salarios y demás prestaciones gravadas pagadas en el mes; ciertos conceptos están expresamente exentos en el Código Fiscal local. El impuesto es de pago mensual.',
      ],
      flashcards: [
        { id: 'u3t2f1', pregunta: '¿Cuál es la tasa general del ISN en la CDMX?', respuesta: '4% sobre la base gravable (subió del 3% al 4% en 2025).' },
        { id: 'u3t2f2', pregunta: '¿Hay beneficios por tamaño de empresa en CDMX?', respuesta: 'Sí: microempresas tasa efectiva 3% y pequeñas empresas 3.5%, mediante estímulos.' },
        { id: 'u3t2f3', pregunta: '¿Qué ordenamiento regula el ISN en la CDMX?', respuesta: 'El Código Fiscal de la Ciudad de México (art. 158).' },
      ],
      quiz: [
        {
          id: 'u3t2q1',
          tipo: 'opcion_multiple',
          pregunta: 'La tasa general del ISN en la Ciudad de México es del:',
          opciones: [
            { texto: '4%', correcta: true },
            { texto: '3%', correcta: false },
            { texto: '2%', correcta: false },
            { texto: '5%', correcta: false },
          ],
          explicacion: 'La tasa general vigente del ISN en la CDMX es del 4% sobre la base gravable.',
        },
        {
          id: 'u3t2q2',
          tipo: 'opcion_multiple',
          pregunta: 'Una microempresa (0 a 10 trabajadores) en CDMX puede tener una tasa efectiva de:',
          opciones: [
            { texto: '3%', correcta: true },
            { texto: '4%', correcta: false },
            { texto: '2%', correcta: false },
            { texto: '5%', correcta: false },
          ],
          explicacion: 'Con la reducción de 1 punto, la microempresa llega a una tasa efectiva del 3%.',
        },
        {
          id: 'u3t2q3',
          tipo: 'opcion_multiple',
          pregunta: 'Una pequeña empresa (11 a 50 trabajadores) en CDMX puede tener una tasa efectiva de:',
          opciones: [
            { texto: '3.5%', correcta: true },
            { texto: '4%', correcta: false },
            { texto: '3%', correcta: false },
            { texto: '2.5%', correcta: false },
          ],
          explicacion: 'Con la reducción de 0.5 puntos, la pequeña empresa llega a una tasa efectiva del 3.5%.',
        },
        {
          id: 'u3t2q4',
          tipo: 'verdadero_falso',
          pregunta: 'La tasa del ISN en la CDMX subió del 3% al 4% a partir de 2025.',
          opciones: [
            { texto: 'Verdadero', correcta: true },
            { texto: 'Falso', correcta: false },
          ],
          explicacion: 'Correcto: la tasa general pasó de 3% a 4% desde 2025 y se mantiene en 2026.',
        },
        {
          id: 'u3t2q5',
          tipo: 'opcion_multiple',
          pregunta: '¿Qué ordenamiento regula el ISN en la Ciudad de México?',
          opciones: [
            { texto: 'El Código Fiscal de la CDMX', correcta: true },
            { texto: 'El Código Financiero del Estado de México', correcta: false },
            { texto: 'La Ley del ISR', correcta: false },
            { texto: 'La Ley Federal del Trabajo', correcta: false },
          ],
          explicacion: 'El ISN de la CDMX está en su Código Fiscal local (art. 158).',
        },
      ],
    },
    {
      id: 'u3t3',
      titulo: 'ISN en el Estado de México',
      articulosReferencia: ['Código Financiero del Estado de México y Municipios'],
      teoria: [
        'En el Estado de México el ISN se regula en el Código Financiero del Estado de México y Municipios. La tasa general es del 3% sobre las erogaciones por remuneraciones al trabajo personal subordinado.',
        'Igual que en la CDMX, la base se integra con los pagos gravados al trabajo subordinado y existen conceptos exentos definidos en el propio Código. El impuesto es de pago mensual.',
        'Como las disposiciones estatales se actualizan cada ejercicio, conviene verificar la tasa vigente, los conceptos exentos y la posible existencia de adicionales o sobretasas antes de calcular el impuesto.',
      ],
      flashcards: [
        { id: 'u3t3f1', pregunta: '¿Cuál es la tasa general del ISN en el Estado de México?', respuesta: '3% sobre las remuneraciones al trabajo personal subordinado.' },
        { id: 'u3t3f2', pregunta: '¿Qué ordenamiento regula el ISN en el Estado de México?', respuesta: 'El Código Financiero del Estado de México y Municipios.' },
      ],
      quiz: [
        {
          id: 'u3t3q1',
          tipo: 'opcion_multiple',
          pregunta: 'La tasa general del ISN en el Estado de México es del:',
          opciones: [
            { texto: '3%', correcta: true },
            { texto: '4%', correcta: false },
            { texto: '2%', correcta: false },
            { texto: '5%', correcta: false },
          ],
          explicacion: 'La tasa general del ISN en el Estado de México es del 3%.',
        },
        {
          id: 'u3t3q2',
          tipo: 'opcion_multiple',
          pregunta: '¿Qué ordenamiento regula el ISN en el Estado de México?',
          opciones: [
            { texto: 'El Código Financiero del Estado de México y Municipios', correcta: true },
            { texto: 'El Código Fiscal de la CDMX', correcta: false },
            { texto: 'La Ley del Seguro Social', correcta: false },
            { texto: 'La Ley del ISR', correcta: false },
          ],
          explicacion: 'El ISN mexiquense se regula en el Código Financiero del Estado de México y Municipios.',
        },
        {
          id: 'u3t3q3',
          tipo: 'verdadero_falso',
          pregunta: 'El ISN del Estado de México es de pago mensual.',
          opciones: [
            { texto: 'Verdadero', correcta: true },
            { texto: 'Falso', correcta: false },
          ],
          explicacion: 'Correcto: como regla general, el ISN se entera mensualmente.',
        },
        {
          id: 'u3t3q4',
          tipo: 'opcion_multiple',
          pregunta: 'El ISN del Estado de México lo paga:',
          opciones: [
            { texto: 'El patrón', correcta: true },
            { texto: 'El trabajador', correcta: false },
            { texto: 'El municipio', correcta: false },
            { texto: 'El SAT', correcta: false },
          ],
          explicacion: 'Como todo ISN, está a cargo del patrón por las erogaciones al trabajo subordinado.',
        },
      ],
    },
  ],
};

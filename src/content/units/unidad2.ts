import type { Unidad } from './types';

export const unidad2: Unidad = {
  id: 'u2',
  numero: 2,
  titulo: 'Aportaciones de seguridad social (IMSS e INFONAVIT)',
  descripcion:
    'Cómo se integra el salario base de cotización, los seguros del régimen obligatorio y el cálculo de las cuotas obrero-patronales y la aportación al INFONAVIT.',
  horasTeoricas: 18,
  temas: [
    {
      id: 'u2t1',
      titulo: 'Salario Base de Cotización (SBC) e integración',
      articulosReferencia: ['LSS art. 27', 'LSS art. 28', 'LSS art. 30'],
      teoria: [
        'El Salario Base de Cotización (SBC) es la cantidad sobre la que se calculan las cuotas al IMSS. Conforme al artículo 27 de la LSS, se integra con la cuota diaria y con todos los pagos que el trabajador recibe por su trabajo: gratificaciones, percepciones, alimentación, habitación, primas, comisiones, prestaciones en especie y cualquier otra cantidad o prestación que se le entregue por sus servicios.',
        'Para un salario fijo, el SBC se obtiene multiplicando el salario diario por un Factor de Integración (FI), que suma el valor proporcional diario de las prestaciones mínimas de ley. La fórmula es: FI = 1 + (días de aguinaldo / 365) + (días de vacaciones × prima vacacional / 365).',
        'En 2026, el FI mínimo de ley para un trabajador en su primer año es 1.0493, considerando 15 días de aguinaldo, 12 días de vacaciones y 25% de prima vacacional. Este valor cambió por la reforma de "Vacaciones Dignas" (vigente desde 2023): antes el primer año eran 6 días de vacaciones y el factor mínimo era 1.0452. El FI debe recalcularse cada aniversario, porque los días de vacaciones aumentan con la antigüedad.',
        'Según el tipo de salario, el SBC se determina distinto (art. 30 LSS): salario FIJO → se aplica el factor de integración; salario VARIABLE (comisiones, destajo) → se promedian las percepciones del bimestre inmediato anterior; salario MIXTO → la parte fija se integra con el factor y la parte variable se promedia.',
        'No todo integra el SBC: el artículo 27 excluye, cumpliendo requisitos, conceptos como instrumentos de trabajo, las aportaciones al fondo de ahorro y el ahorro (con topes), la alimentación y habitación onerosas, la PTU, entre otros. El SBC tiene además un límite superior de 25 UMA (art. 28 LSS).',
      ],
      flashcards: [
        { id: 'u2t1f1', pregunta: '¿Qué es el SBC?', respuesta: 'El salario base de cotización: la cantidad sobre la que se calculan las cuotas al IMSS (art. 27 LSS).' },
        { id: 'u2t1f2', pregunta: '¿Cuál es la fórmula del factor de integración (salario fijo)?', respuesta: 'FI = 1 + (días de aguinaldo / 365) + (días de vacaciones × prima vacacional / 365).' },
        { id: 'u2t1f3', pregunta: '¿Cuál es el FI mínimo de ley en 2026 (primer año)?', respuesta: '1.0493 (15 días de aguinaldo, 12 de vacaciones y 25% de prima vacacional), por la reforma de vacaciones dignas.' },
        { id: 'u2t1f4', pregunta: '¿Cómo se integra el salario variable?', respuesta: 'Con el promedio de las percepciones del bimestre inmediato anterior (art. 30 LSS).' },
        { id: 'u2t1f5', pregunta: '¿Cuál es el tope máximo del SBC?', respuesta: '25 UMA (art. 28 LSS).' },
      ],
      quiz: [
        {
          id: 'u2t1q1',
          tipo: 'opcion_multiple',
          pregunta: '¿Cuál es el límite superior del SBC?',
          opciones: [
            { texto: '25 UMA', correcta: true },
            { texto: '10 UMA', correcta: false },
            { texto: '15 UMA', correcta: false },
            { texto: 'No tiene tope', correcta: false },
          ],
          explicacion: 'El SBC se topa en 25 UMA para efectos de las cuotas al IMSS (art. 28 LSS).',
        },
        {
          id: 'u2t1q2',
          tipo: 'opcion_multiple',
          pregunta: 'El factor de integración mínimo de ley en 2026 (primer año) es:',
          opciones: [
            { texto: '1.0493', correcta: true },
            { texto: '1.0452', correcta: false },
            { texto: '1.1500', correcta: false },
            { texto: '1.0000', correcta: false },
          ],
          explicacion: 'Tras la reforma de vacaciones dignas (12 días el primer año), el FI mínimo subió de 1.0452 a 1.0493.',
        },
        {
          id: 'u2t1q3',
          tipo: 'opcion_multiple',
          pregunta: 'El SBC sirve, ante todo, para:',
          opciones: [
            { texto: 'Calcular las cuotas obrero-patronales del IMSS', correcta: true },
            { texto: 'Determinar el ISR anual del trabajador', correcta: false },
            { texto: 'Fijar el salario mínimo', correcta: false },
            { texto: 'Calcular el aguinaldo', correcta: false },
          ],
          explicacion: 'El SBC es la base sobre la que se determinan las cuotas al IMSS (art. 27 LSS).',
        },
        {
          id: 'u2t1q4',
          tipo: 'verdadero_falso',
          pregunta: 'El salario variable se integra con el promedio de las percepciones del bimestre inmediato anterior.',
          opciones: [
            { texto: 'Verdadero', correcta: true },
            { texto: 'Falso', correcta: false },
          ],
          explicacion: 'Correcto: para el salario variable, el art. 30 LSS manda promediar las percepciones del bimestre anterior.',
        },
        {
          id: 'u2t1q5',
          tipo: 'opcion_multiple',
          pregunta: 'La fórmula del factor de integración para un salario fijo es:',
          opciones: [
            { texto: '1 + (aguinaldo/365) + (vacaciones × prima vacacional / 365)', correcta: true },
            { texto: 'salario diario × UMA', correcta: false },
            { texto: '1 + (salario mínimo / 365)', correcta: false },
            { texto: 'aguinaldo + prima vacacional', correcta: false },
          ],
          explicacion: 'El FI suma el valor proporcional diario del aguinaldo y de la prima vacacional sobre las vacaciones.',
        },
      ],
    },
    {
      id: 'u2t2',
      titulo: 'Seguros del régimen obligatorio y cuotas obrero-patronales',
      articulosReferencia: ['LSS art. 11', 'LSS arts. 106, 107, 147, 168, 211'],
      teoria: [
        'El régimen obligatorio del IMSS comprende cinco seguros (art. 11 LSS): Riesgos de Trabajo; Enfermedades y Maternidad; Invalidez y Vida; Retiro, Cesantía en Edad Avanzada y Vejez (RCV); y Guarderías y Prestaciones Sociales.',
        'Enfermedades y Maternidad (EyM): incluye una cuota fija patronal del 20.40% de la UMA por cada trabajador (prestaciones en especie); una cuota adicional sobre el SBC que exceda de 3 UMA (patrón 1.10%, obrero 0.40%); prestaciones en dinero (patrón 0.70%, obrero 0.25%); y gastos médicos de pensionados (patrón 1.05%, obrero 0.375%).',
        'Invalidez y Vida (IV): patrón 1.75%, obrero 0.625% del SBC. Guarderías y Prestaciones Sociales: patrón 1.00% del SBC (sin cuota obrera).',
        'Retiro, Cesantía y Vejez (RCV): el Retiro es 2.00% a cargo del patrón. En Cesantía y Vejez el trabajador aporta 1.125% fijo, mientras que la cuota patronal es PROGRESIVA según el nivel de SBC y aumenta cada año dentro de la transición prevista por la reforma de pensiones de 2020 (que concluye en 2030).',
        'Riesgos de Trabajo (RT): la prima es VARIABLE, según la siniestralidad de cada empresa (con un mínimo y un máximo de ley); cada patrón la determina y revisa anualmente. Por eso no es un porcentaje único.',
        'El patrón es el responsable de calcular las cuotas, retener la parte obrera vía nómina y enterar el total al IMSS. Las cuotas de EyM, IV, Guarderías y RT se pagan mensualmente, mientras que RCV (e INFONAVIT) se enteran de forma bimestral.',
      ],
      flashcards: [
        { id: 'u2t2f1', pregunta: '¿Cuántos seguros integran el régimen obligatorio?', respuesta: 'Cinco: Riesgos de Trabajo; Enfermedades y Maternidad; Invalidez y Vida; RCV; y Guarderías y Prestaciones Sociales (art. 11 LSS).' },
        { id: 'u2t2f2', pregunta: '¿Cuánto aporta el patrón en Invalidez y Vida?', respuesta: '1.75% del SBC (el obrero, 0.625%).' },
        { id: 'u2t2f3', pregunta: '¿Por qué la prima de Riesgos de Trabajo no es fija?', respuesta: 'Es variable según la siniestralidad de cada empresa; se determina y revisa anualmente.' },
        { id: 'u2t2f4', pregunta: '¿Qué tiene de especial la cuota patronal de Cesantía y Vejez?', respuesta: 'Es progresiva según el SBC y aumenta cada año por la transición de la reforma de pensiones 2020 (hasta 2030).' },
        { id: 'u2t2f5', pregunta: '¿Quién entera las cuotas al IMSS?', respuesta: 'El patrón, que retiene la parte obrera y entera el total.' },
      ],
      quiz: [
        {
          id: 'u2t2q1',
          tipo: 'verdadero_falso',
          pregunta: 'El régimen obligatorio del IMSS comprende cinco seguros.',
          opciones: [
            { texto: 'Verdadero', correcta: true },
            { texto: 'Falso', correcta: false },
          ],
          explicacion: 'Correcto: son cinco ramos de aseguramiento (art. 11 LSS).',
        },
        {
          id: 'u2t2q2',
          tipo: 'opcion_multiple',
          pregunta: 'La prima del seguro de Riesgos de Trabajo:',
          opciones: [
            { texto: 'Es variable según la siniestralidad de la empresa', correcta: true },
            { texto: 'Es fija en 2% para todas las empresas', correcta: false },
            { texto: 'La paga el trabajador', correcta: false },
            { texto: 'Se calcula sobre la UMA', correcta: false },
          ],
          explicacion: 'La prima de RT depende de la siniestralidad de cada empresa y se revisa cada año.',
        },
        {
          id: 'u2t2q3',
          tipo: 'opcion_multiple',
          pregunta: '¿Cuál NO es uno de los cinco seguros del régimen obligatorio?',
          opciones: [
            { texto: 'Seguro de desempleo', correcta: true },
            { texto: 'Enfermedades y Maternidad', correcta: false },
            { texto: 'Invalidez y Vida', correcta: false },
            { texto: 'Guarderías y Prestaciones Sociales', correcta: false },
          ],
          explicacion: 'El seguro de desempleo no forma parte de los cinco ramos del art. 11 LSS.',
        },
        {
          id: 'u2t2q4',
          tipo: 'opcion_multiple',
          pregunta: 'En el seguro de Retiro, la cuota a cargo del patrón es del:',
          opciones: [
            { texto: '2.00% del SBC', correcta: true },
            { texto: '1.75% del SBC', correcta: false },
            { texto: '1.125% del SBC', correcta: false },
            { texto: '5.00% del SBC', correcta: false },
          ],
          explicacion: 'El Retiro (parte del RCV) es 2.00% del SBC a cargo del patrón (art. 168-I LSS).',
        },
        {
          id: 'u2t2q5',
          tipo: 'verdadero_falso',
          pregunta: 'La cuota obrera de Cesantía y Vejez es del 1.125% del SBC.',
          opciones: [
            { texto: 'Verdadero', correcta: true },
            { texto: 'Falso', correcta: false },
          ],
          explicacion: 'Correcto: el trabajador aporta 1.125% fijo; la cuota patronal de cesantía y vejez es progresiva.',
        },
      ],
    },
    {
      id: 'u2t3',
      titulo: 'Aportación al INFONAVIT',
      articulosReferencia: ['Ley del INFONAVIT art. 29'],
      teoria: [
        'El patrón está obligado a aportar el 5% del SBC de cada trabajador al Instituto del Fondo Nacional de la Vivienda para los Trabajadores (INFONAVIT). Esta aportación es exclusivamente a cargo del patrón; no se descuenta al trabajador.',
        'La aportación se entera de forma bimestral, junto con las cuotas de RCV, y se deposita en la subcuenta de vivienda del trabajador, que forma parte de su cuenta individual.',
        'Cuando el trabajador tiene un crédito de vivienda otorgado por el INFONAVIT, además de la aportación patronal del 5%, el patrón debe aplicar y enterar los descuentos correspondientes al crédito (que sí se descuentan al trabajador) según el aviso de retención del Instituto.',
      ],
      flashcards: [
        { id: 'u2t3f1', pregunta: '¿Cuánto aporta el patrón al INFONAVIT?', respuesta: 'El 5% del SBC de cada trabajador.' },
        { id: 'u2t3f2', pregunta: '¿La aportación del 5% al INFONAVIT es obrero-patronal?', respuesta: 'No: es exclusivamente a cargo del patrón; no se descuenta al trabajador.' },
        { id: 'u2t3f3', pregunta: '¿Con qué periodicidad se entera la aportación al INFONAVIT?', respuesta: 'Bimestral, junto con las cuotas de RCV.' },
      ],
      quiz: [
        {
          id: 'u2t3q1',
          tipo: 'opcion_multiple',
          pregunta: 'La aportación patronal al INFONAVIT es del:',
          opciones: [
            { texto: '5% del SBC', correcta: true },
            { texto: '2% del SBC', correcta: false },
            { texto: '5% de la UMA', correcta: false },
            { texto: '5% del salario mínimo', correcta: false },
          ],
          explicacion: 'El patrón aporta el 5% del SBC al INFONAVIT.',
        },
        {
          id: 'u2t3q2',
          tipo: 'verdadero_falso',
          pregunta: 'La aportación del 5% al INFONAVIT se descuenta del salario del trabajador.',
          opciones: [
            { texto: 'Verdadero', correcta: false },
            { texto: 'Falso', correcta: true },
          ],
          explicacion: 'Falso: es exclusivamente a cargo del patrón; no se descuenta al trabajador.',
        },
        {
          id: 'u2t3q3',
          tipo: 'opcion_multiple',
          pregunta: '¿Con qué periodicidad se entera la aportación al INFONAVIT?',
          opciones: [
            { texto: 'Bimestral', correcta: true },
            { texto: 'Mensual', correcta: false },
            { texto: 'Anual', correcta: false },
            { texto: 'Semanal', correcta: false },
          ],
          explicacion: 'La aportación de vivienda se entera de forma bimestral, junto con el RCV.',
        },
        {
          id: 'u2t3q4',
          tipo: 'opcion_multiple',
          pregunta: '¿Dónde se deposita la aportación del 5%?',
          opciones: [
            { texto: 'En la subcuenta de vivienda del trabajador', correcta: true },
            { texto: 'En la subcuenta de retiro', correcta: false },
            { texto: 'En una cuenta bancaria del patrón', correcta: false },
            { texto: 'En el fondo de ahorro de la empresa', correcta: false },
          ],
          explicacion: 'Se deposita en la subcuenta de vivienda, parte de la cuenta individual del trabajador.',
        },
      ],
    },
  ],
};

import type { Unidad } from './types';

export const unidad1: Unidad = {
  id: 'u1',
  numero: 1,
  titulo: 'Ingresos por salarios y conceptos asimilados. Tratamiento en ISR',
  descripcion:
    'El núcleo del curso: qué es un salario, qué ingresos se le asimilan, qué está exento y cómo se calcula el ISR mensual y anual del trabajador.',
  horasTeoricas: 38,
  temas: [
    // ---------------------------------------------------------------- Tema 1
    {
      id: 'u1t1',
      titulo: 'Concepto de salario y servicio personal subordinado',
      articulosReferencia: ['LISR art. 94', 'LISR arts. 94-99', 'LFT art. 82'],
      teoria: [
        'El artículo 94 de la LISR define como ingresos por la prestación de un servicio personal subordinado a los salarios y demás prestaciones que deriven de una relación laboral. La definición es amplia: incluye el sueldo, las prestaciones, la participación de los trabajadores en las utilidades (PTU) y las prestaciones percibidas como consecuencia de la terminación de la relación laboral (por ejemplo, indemnizaciones).',
        'El elemento que define a un salario es la SUBORDINACIÓN: la relación en la que el trabajador queda bajo la dirección y dependencia de un patrón, quien fija las condiciones, horarios y forma de realizar el trabajo. Sin subordinación no hay salario; habría, en su caso, honorarios por servicios independientes, que tributan en otro capítulo del Título IV.',
        'Distinguir correctamente entre salario y honorario es crucial, porque determina: la tarifa y forma de retención del ISR, el derecho a prestaciones laborales, la obligación de seguridad social (IMSS/INFONAVIT) y la deducibilidad para el patrón. Una mala clasificación puede generar créditos fiscales y multas.',
        'El tratamiento fiscal de los salarios se concentra en el Capítulo I del Título IV de la LISR (artículos 94 a 99): el artículo 94 da el concepto y los asimilados; el 93 (del capítulo de disposiciones generales) regula los ingresos exentos; el 96 establece el cálculo de la retención mensual; los artículos 97 y 152 el cálculo y la tarifa anual; y los artículos 98 y 99 las obligaciones de trabajadores y patrones.',
        'Es importante notar que la propia ley extiende este tratamiento a ciertos ingresos que, sin derivar de una relación laboral subordinada, "se asimilan a salarios" (tema siguiente). Por eso el artículo 94 no solo define el salario, sino que enlista esos conceptos equiparados.',
      ],
      flashcards: [
        { id: 'u1t1f1', pregunta: '¿Qué caracteriza a un ingreso por salario?', respuesta: 'La prestación de un servicio personal subordinado: una relación laboral con subordinación y dependencia del trabajador respecto al patrón.' },
        { id: 'u1t1f2', pregunta: '¿Qué artículos de la LISR regulan los salarios?', respuesta: 'El Capítulo I del Título IV, artículos 94 a 99 (más el art. 93 para exentos).' },
        { id: 'u1t1f3', pregunta: '¿La PTU se considera ingreso por salarios?', respuesta: 'Sí, la LISR le da el tratamiento de ingreso por salarios para efectos del ISR.' },
        { id: 'u1t1f4', pregunta: '¿Por qué importa distinguir salario de honorario?', respuesta: 'Porque cambia la retención de ISR, las prestaciones laborales, la seguridad social y la deducibilidad para el patrón.' },
      ],
      quiz: [
        {
          id: 'u1t1q1',
          tipo: 'opcion_multiple',
          pregunta: '¿Cuál es el elemento esencial que genera ingresos por salarios?',
          opciones: [
            { texto: 'La subordinación', correcta: true },
            { texto: 'La independencia del prestador', correcta: false },
            { texto: 'El monto del pago', correcta: false },
            { texto: 'La duración del contrato', correcta: false },
          ],
          explicacion: 'La subordinación (dirección y dependencia respecto al patrón) es lo que distingue al salario de un honorario independiente.',
        },
        {
          id: 'u1t1q2',
          tipo: 'verdadero_falso',
          pregunta: 'Los ingresos por salarios se regulan en el Capítulo I del Título IV de la LISR.',
          opciones: [
            { texto: 'Verdadero', correcta: true },
            { texto: 'Falso', correcta: false },
          ],
          explicacion: 'Correcto: los artículos 94 a 99 integran ese capítulo.',
        },
      ],
    },
    // ---------------------------------------------------------------- Tema 2
    {
      id: 'u1t2',
      titulo: 'Conceptos asimilados a salarios',
      articulosReferencia: ['LISR art. 94, fracc. I-VII'],
      teoria: [
        'Los "asimilados a salarios" son ingresos que, sin derivar necesariamente de una relación laboral subordinada, reciben el mismo tratamiento fiscal que los salarios: se les retiene el ISR con la tarifa del artículo 96. El artículo 94 los enumera en siete fracciones.',
        'Fracción I: remuneraciones de funcionarios y trabajadores de la Federación, entidades federativas y municipios. Fracción II: rendimientos y anticipos de los miembros de sociedades cooperativas de producción, y anticipos a miembros de sociedades y asociaciones civiles. Fracción III: honorarios a miembros de consejos directivos, de vigilancia o consultivos, y a administradores, comisarios y gerentes generales.',
        'Fracción IV: honorarios preponderantes, es decir, de quien presta servicios principalmente a un solo prestatario (cuando más del 50% de sus ingresos del año anterior provienen de él) y los realiza en sus instalaciones. Fracción V: honorarios por servicios profesionales independientes que opten por asimilarse. Fracción VI: ingresos por actividades empresariales (comisionistas) que opten por asimilarse. Fracción VII: ingresos por ejercer la opción de adquirir acciones o títulos del empleador, sin costo o a precio menor al de mercado.',
        'Distinción clave: las fracciones I, II, III y VII son OBLIGATORIAS (se asimilan por ministerio de ley). Las fracciones IV, V y VI son por OPCIÓN: el contribuyente debe comunicar por escrito al prestatario que opta por tributar como asimilado.',
        'Desde la reforma de 2021-2022, las fracciones IV, V y VI tienen un tope: si los ingresos por asimilados exceden $75,000,000 al año, la persona debe dejar el esquema y tributar en el régimen de actividades empresariales y profesionales.',
        'Dos diferencias importantes frente al salario verdadero: los asimilados NO tienen derecho al subsidio para el empleo, y no generan automáticamente todas las prestaciones laborales ni de seguridad social. El SAT vigila el uso del esquema cuando se utiliza para simular relaciones que en realidad son de subordinación.',
      ],
      flashcards: [
        { id: 'u1t2f1', pregunta: '¿Qué son los ingresos asimilados a salarios?', respuesta: 'Ingresos que, sin ser salario, reciben el mismo tratamiento fiscal que los salarios y se les retiene con la tarifa del art. 96 (art. 94 LISR).' },
        { id: 'u1t2f2', pregunta: 'Menciona conceptos asimilados a salarios.', respuesta: 'Funcionarios públicos, cooperativistas, honorarios a consejeros/administradores, honorarios preponderantes, servicios profesionales y actividades empresariales por opción, y opción de acciones del empleador.' },
        { id: 'u1t2f3', pregunta: '¿Cuáles asimilados son obligatorios y cuáles opcionales?', respuesta: 'Obligatorios: fracc. I, II, III y VII. Por opción (aviso por escrito): fracc. IV, V y VI.' },
        { id: 'u1t2f4', pregunta: '¿Cuál es el tope para los asimilados de las fracc. IV, V y VI?', respuesta: '$75,000,000 al año; si se rebasa, se pasa al régimen de actividades empresariales y profesionales.' },
        { id: 'u1t2f5', pregunta: '¿Los asimilados tienen subsidio para el empleo?', respuesta: 'No: a diferencia del salario, los asimilados no tienen derecho al subsidio para el empleo.' },
      ],
      quiz: [
        {
          id: 'u1t2q1',
          tipo: 'opcion_multiple',
          pregunta: '¿Cuál de los siguientes es un ingreso asimilado a salarios?',
          opciones: [
            { texto: 'Honorarios a miembros de consejos directivos', correcta: true },
            { texto: 'Dividendos', correcta: false },
            { texto: 'Intereses bancarios', correcta: false },
            { texto: 'Renta de un inmueble', correcta: false },
          ],
          explicacion: 'Los honorarios a consejeros se asimilan a salarios (art. 94, fracc. III); los demás tributan en otros capítulos del Título IV.',
        },
        {
          id: 'u1t2q2',
          tipo: 'verdadero_falso',
          pregunta: 'Los ingresos asimilados a salarios tienen derecho al subsidio para el empleo.',
          opciones: [
            { texto: 'Verdadero', correcta: false },
            { texto: 'Falso', correcta: true },
          ],
          explicacion: 'Falso: los asimilados se gravan con la tarifa del art. 96, pero no tienen derecho al subsidio para el empleo.',
        },
      ],
    },
    // ---------------------------------------------------------------- Tema 3
    {
      id: 'u1t3',
      titulo: 'Ingresos exentos del trabajador',
      articulosReferencia: ['LISR art. 93'],
      teoria: [
        'El artículo 93 enumera los ingresos que no pagan ISR, total o parcialmente. En la nómina, la mayoría de las exenciones relevantes están topadas en UMA (Unidad de Medida y Actualización). Lo que excede el tope es gravable y se acumula a los demás ingresos del trabajador.',
        'Prestaciones del trabajador de salario mínimo (fracc. I): están exentas las prestaciones distintas del salario y el tiempo extraordinario dentro de los límites de la legislación laboral. Para el resto de los trabajadores, el tiempo extraordinario está exento al 50%, con un tope de 5 UMA por semana; el excedente es gravable.',
        'Gratificaciones y primas (fracc. XIV): el aguinaldo está exento hasta 30 días de UMA; la prima vacacional y la PTU, hasta 15 días de UMA por cada concepto; la prima dominical, hasta 1 UMA por cada domingo laborado.',
        'Previsión social (fracc. VIII y IX): vales de despensa, fondo de ahorro, ayudas y similares pueden estar exentos cuando se otorgan de forma general y cumplen los requisitos y topes de ley. Indemnizaciones por riesgo de trabajo o enfermedad (fracc. III): exentas conforme a la ley.',
        'Separación e indemnizaciones (fracc. XIII): los pagos por separación están exentos hasta 90 UMA por cada año de servicio. Jubilaciones y pensiones (fracc. IV): exentas hasta 15 UMA diarias; el excedente es gravable.',
        'Un punto fino que suele preguntarse: aunque el texto de la ley aún dice "salario mínimo", desde la desindexación de 2016 esas referencias deben leerse en UMA. Además, las exenciones aplican por el total del concepto en el ejercicio (no por cada patrón), lo que es relevante para quien tuvo varios empleos en el año.',
      ],
      flashcards: [
        { id: 'u1t3f1', pregunta: '¿Hasta cuánto está exento el aguinaldo?', respuesta: 'Hasta 30 días de UMA; el excedente es gravable.' },
        { id: 'u1t3f2', pregunta: '¿Exención de prima vacacional y PTU?', respuesta: 'Hasta 15 días de UMA por cada concepto.' },
        { id: 'u1t3f3', pregunta: '¿Cómo se exenta el tiempo extraordinario?', respuesta: '50% exento con tope de 5 UMA por semana (los trabajadores de salario mínimo, dentro de los límites de la LFT).' },
        { id: 'u1t3f4', pregunta: '¿Exención de la prima dominical?', respuesta: 'Hasta 1 UMA por cada domingo laborado.' },
        { id: 'u1t3f5', pregunta: '¿Exención de pagos por separación?', respuesta: 'Hasta 90 UMA por cada año de servicio (art. 93, fracc. XIII).' },
        { id: 'u1t3f6', pregunta: '¿Por qué la ley dice "salario mínimo" pero se usa UMA?', respuesta: 'Por la desindexación de 2016; las referencias en salario mínimo se entienden en UMA.' },
      ],
      quiz: [
        {
          id: 'u1t3q1',
          tipo: 'opcion_multiple',
          pregunta: 'El aguinaldo está exento de ISR hasta el equivalente de:',
          opciones: [
            { texto: '30 días de UMA', correcta: true },
            { texto: '15 días de UMA', correcta: false },
            { texto: '90 días de UMA', correcta: false },
            { texto: 'El 100% sin tope', correcta: false },
          ],
          explicacion: 'El art. 93 exenta el aguinaldo hasta 30 días de UMA; lo que exceda es gravable.',
        },
        {
          id: 'u1t3q2',
          tipo: 'verdadero_falso',
          pregunta: 'La prima vacacional y la PTU están exentas hasta 15 días de UMA cada una.',
          opciones: [
            { texto: 'Verdadero', correcta: true },
            { texto: 'Falso', correcta: false },
          ],
          explicacion: 'Correcto: 15 días de UMA por cada concepto, de forma independiente.',
        },
        {
          id: 'u1t3q3',
          tipo: 'opcion_multiple',
          pregunta: 'Los pagos por separación están exentos hasta:',
          opciones: [
            { texto: '90 UMA por año de servicio', correcta: true },
            { texto: '30 UMA por año de servicio', correcta: false },
            { texto: '15 UMA por año de servicio', correcta: false },
            { texto: '100% sin tope', correcta: false },
          ],
          explicacion: 'La fracc. XIII del art. 93 exenta la separación hasta 90 UMA por cada año de servicio.',
        },
      ],
    },
    // ---------------------------------------------------------------- Tema 4
    {
      id: 'u1t4',
      titulo: 'Cálculo del ISR mensual y subsidio para el empleo',
      articulosReferencia: ['LISR art. 96', 'Decreto del subsidio para el empleo'],
      teoria: [
        'La retención mensual del ISR de salarios es un pago provisional a cuenta del impuesto anual. La base gravable es el ingreso del mes ya depurado de la parte exenta (es decir, total de percepciones gravadas).',
        'El cálculo con la tarifa del artículo 96 sigue cinco pasos: (1) ubicar la base gravable en el renglón cuyo límite inferior y superior la contienen; (2) restar el límite inferior para obtener el excedente; (3) multiplicar el excedente por el porcentaje del renglón (impuesto marginal); (4) sumar la cuota fija del renglón → ISR causado; (5) restar el subsidio para el empleo → ISR a retener.',
        'El subsidio para el empleo busca aliviar la carga de los trabajadores de menores ingresos. Para 2026, el monto mensual equivale al 15.02% de la UMA mensual (alrededor de $535.65) y aplica solo cuando el ingreso mensual gravado no rebasa el tope de $11,492.66. (En enero de 2026 se usó un porcentaje transitorio del 15.59% sobre la UMA de 2025.)',
        'Desde la reforma de 2024, el subsidio únicamente REDUCE el ISR causado; si el subsidio resulta mayor que el ISR, la retención es cero, pero la diferencia ya no se entrega en efectivo al trabajador (como ocurría con el esquema anterior).',
        'El patrón es el responsable de calcular, retener y enterar el ISR ante el SAT, normalmente a más tardar el día 17 del mes siguiente. La calculadora de esta app aplica exactamente estos pasos con las cifras vigentes guardadas en la configuración fiscal.',
      ],
      flashcards: [
        { id: 'u1t4f1', pregunta: 'Pasos del cálculo del ISR mensual.', respuesta: 'Ubicar renglón → excedente sobre el límite inferior → × % del renglón → + cuota fija = ISR causado → − subsidio = ISR a retener.' },
        { id: 'u1t4f2', pregunta: '¿Qué es la base gravable mensual?', respuesta: 'El total de percepciones del mes ya sin la parte exenta del art. 93.' },
        { id: 'u1t4f3', pregunta: '¿Cuánto es el subsidio para el empleo en 2026 y su tope?', respuesta: '15.02% de la UMA mensual (≈ $535.65), aplicable si el ingreso gravado no rebasa $11,492.66.' },
        { id: 'u1t4f4', pregunta: '¿Qué pasa si el subsidio supera al ISR causado?', respuesta: 'La retención es cero y, desde 2024, el excedente del subsidio no se entrega al trabajador.' },
        { id: 'u1t4f5', pregunta: '¿Cuándo entera el patrón la retención?', respuesta: 'Normalmente a más tardar el día 17 del mes siguiente.' },
      ],
      quiz: [
        {
          id: 'u1t4q1',
          tipo: 'opcion_multiple',
          pregunta: 'Tras obtener el excedente sobre el límite inferior, ¿qué sigue en el cálculo?',
          opciones: [
            { texto: 'Multiplicarlo por el porcentaje del renglón', correcta: true },
            { texto: 'Sumarle el valor de la UMA', correcta: false },
            { texto: 'Restarle el aguinaldo', correcta: false },
            { texto: 'Dividirlo entre 12', correcta: false },
          ],
          explicacion: 'El excedente se multiplica por el % del renglón para obtener el impuesto marginal, al que luego se suma la cuota fija.',
        },
        {
          id: 'u1t4q2',
          tipo: 'verdadero_falso',
          pregunta: 'Desde 2024, si el subsidio para el empleo excede el ISR, la diferencia se entrega en efectivo al trabajador.',
          opciones: [
            { texto: 'Verdadero', correcta: false },
            { texto: 'Falso', correcta: true },
          ],
          explicacion: 'Falso: desde 2024 el subsidio solo reduce el ISR; el excedente ya no se entrega al trabajador.',
        },
      ],
    },
    // ---------------------------------------------------------------- Tema 5
    {
      id: 'u1t5',
      titulo: 'ISR anual y declaración anual del trabajador',
      articulosReferencia: ['LISR art. 97', 'LISR art. 98', 'LISR art. 152'],
      teoria: [
        'Las retenciones mensuales son provisionales; el impuesto definitivo del ejercicio se determina con la tarifa anual del artículo 152, que tiene la misma estructura (límite inferior, cuota fija, porcentaje) pero con cantidades anuales.',
        'Por regla general, el patrón calcula el impuesto anual de sus trabajadores (art. 97) y, si hay diferencia, la compensa en las siguientes retenciones. Sin embargo, el patrón NO hace el cálculo anual en ciertos casos: cuando el trabajador dejó de prestar servicios antes del 1 de diciembre, cuando obtuvo ingresos de dos o más patrones, cuando sus ingresos por salarios excedieron $400,000, o cuando el trabajador comunicó por escrito que presentará su propia declaración.',
        'El trabajador está obligado a presentar su declaración anual (art. 98, fracc. III) cuando: tuvo dos o más patrones en el año, percibió otros ingresos acumulables (honorarios, arrendamiento, etc.), sus ingresos por salarios superaron $400,000, o avisó por escrito al patrón que declarará por su cuenta.',
        'En la declaración anual se confrontan las retenciones provisionales contra el impuesto anual. El trabajador puede aplicar deducciones personales (art. 151) —como gastos médicos, intereses hipotecarios o colegiaturas, dentro de los topes— que pueden generar un saldo a favor (devolución) o, en su caso, un saldo a cargo.',
        'La declaración anual de las personas físicas se presenta en abril del año siguiente al ejercicio.',
      ],
      flashcards: [
        { id: 'u1t5f1', pregunta: '¿Quién hace por regla general el cálculo anual del trabajador?', respuesta: 'El patrón (art. 97), salvo las excepciones en que el trabajador debe declarar por su cuenta.' },
        { id: 'u1t5f2', pregunta: '¿Cuándo debe el trabajador presentar declaración anual?', respuesta: 'Con dos o más patrones, otros ingresos acumulables, salarios mayores a $400,000, o aviso por escrito al patrón.' },
        { id: 'u1t5f3', pregunta: '¿Qué tarifa se usa para el ISR anual?', respuesta: 'La tarifa anual del artículo 152.' },
        { id: 'u1t5f4', pregunta: '¿Qué puede deducir el trabajador en su anual?', respuesta: 'Deducciones personales del art. 151 (gastos médicos, intereses hipotecarios, colegiaturas, etc.) dentro de topes.' },
        { id: 'u1t5f5', pregunta: '¿Cuándo se presenta la declaración anual de personas físicas?', respuesta: 'En abril del año siguiente al ejercicio.' },
      ],
      quiz: [
        {
          id: 'u1t5q1',
          tipo: 'verdadero_falso',
          pregunta: 'Un trabajador que tuvo dos patrones en el año está obligado a presentar declaración anual.',
          opciones: [
            { texto: 'Verdadero', correcta: true },
            { texto: 'Falso', correcta: false },
          ],
          explicacion: 'Tener dos o más patrones en el ejercicio obliga al trabajador a presentar su declaración anual (art. 98, fracc. III).',
        },
        {
          id: 'u1t5q2',
          tipo: 'opcion_multiple',
          pregunta: '¿Qué artículo contiene la tarifa anual del ISR de personas físicas?',
          opciones: [
            { texto: 'Artículo 152', correcta: true },
            { texto: 'Artículo 96', correcta: false },
            { texto: 'Artículo 93', correcta: false },
            { texto: 'Artículo 94', correcta: false },
          ],
          explicacion: 'El art. 152 contiene la tarifa anual; el 96 es la mensual.',
        },
      ],
    },
    // ---------------------------------------------------------------- Tema 6
    {
      id: 'u1t6',
      titulo: 'Obligaciones de patrones y trabajadores',
      articulosReferencia: ['LISR art. 98', 'LISR art. 99'],
      teoria: [
        'El patrón actúa como retenedor y, conforme al artículo 99, debe: efectuar y enterar las retenciones mensuales; calcular el impuesto anual de cada trabajador (salvo las excepciones del art. 97); expedir y entregar el CFDI de nómina (que funciona como constancia de pagos y retenciones); solicitar las constancias y los datos de RFC a quienes contrate; e inscribir al RFC a los trabajadores que no estén registrados.',
        'El patrón también debe proporcionar, a más tardar el 15 de febrero, la información de los pagos y retenciones del ejercicio anterior; con el esquema de CFDI de nómina, esta obligación se cumple a través de los comprobantes timbrados.',
        'El trabajador, por su parte (art. 98), debe: proporcionar los datos necesarios para su inscripción al RFC; comunicar por escrito a su patrón si presta servicios a otro empleador, para evitar que se le aplique el subsidio para el empleo por duplicado; solicitar las constancias de retención; y presentar la declaración anual cuando esté obligado a hacerlo.',
        'El reparto correcto de estas obligaciones es lo que permite que el sistema de retención provisional funcione y que el impuesto definitivo se determine bien en la declaración anual.',
      ],
      flashcards: [
        { id: 'u1t6f1', pregunta: 'Menciona tres obligaciones del patrón en ISR de salarios.', respuesta: 'Retener y enterar el ISR, calcular el impuesto anual y expedir CFDI de nómina (también solicitar RFC e inscribir trabajadores).' },
        { id: 'u1t6f2', pregunta: '¿Qué debe comunicar el trabajador con más de un empleo?', respuesta: 'Avisar por escrito a sus patrones para que no se aplique el subsidio para el empleo por duplicado.' },
        { id: 'u1t6f3', pregunta: '¿Cómo cumple el patrón la informativa de pagos y retenciones?', respuesta: 'A través del timbrado de los CFDI de nómina del ejercicio.' },
      ],
      quiz: [
        {
          id: 'u1t6q1',
          tipo: 'opcion_multiple',
          pregunta: '¿Cuál es una obligación del patrón como retenedor?',
          opciones: [
            { texto: 'Expedir CFDI de nómina', correcta: true },
            { texto: 'Presentar siempre la declaración anual del trabajador ante el SAT por él', correcta: false },
            { texto: 'Pagar el IMSS del trabajador descontándolo del subsidio', correcta: false },
            { texto: 'Determinar su propio salario base de cotización', correcta: false },
          ],
          explicacion: 'Expedir el CFDI de nómina (constancia de pagos y retenciones) es una obligación del patrón conforme al art. 99.',
        },
      ],
    },
  ],
};

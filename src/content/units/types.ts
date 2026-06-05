/**
 * Tipos del contenido de estudio.
 * El contenido vive como DATOS (no mezclado con la UI), para editarlo fácilmente.
 */

export interface Flashcard {
  id: string;
  pregunta: string;
  respuesta: string;
}

export interface QuizOpcion {
  texto: string;
  correcta: boolean;
}

export interface QuizReactivo {
  id: string;
  tipo: 'opcion_multiple' | 'verdadero_falso';
  pregunta: string;
  opciones: QuizOpcion[];
  /** Retroalimentación que se muestra al responder. */
  explicacion: string;
}

export interface Tema {
  id: string;
  titulo: string;
  /** Artículos/leyes de referencia (para mostrar junto a la teoría). */
  articulosReferencia: string[];
  /** Teoría breve: cada elemento es un párrafo. */
  teoria: string[];
  flashcards: Flashcard[];
  quiz: QuizReactivo[];
}

export interface Unidad {
  id: string;
  numero: number;
  titulo: string;
  descripcion: string;
  horasTeoricas: number;
  temas: Tema[];
}

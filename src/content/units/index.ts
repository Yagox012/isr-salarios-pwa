import type { Unidad } from './types';
import { unidad1 } from './unidad1';
import { unidad2 } from './unidad2';
import { unidad3 } from './unidad3';

export type { Unidad, Tema, Flashcard, QuizReactivo, QuizOpcion } from './types';

/** Las 3 unidades del programa 2534, en orden. */
export const unidades: Unidad[] = [unidad1, unidad2, unidad3];

/** Busca una unidad por su id. */
export const getUnidad = (id: string): Unidad | undefined =>
  unidades.find((u) => u.id === id);

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from 'react';

export type EstadoTema = 'no_iniciado' | 'pendiente' | 'completado';

interface ProgresoTema {
  teoriaLeida: boolean;
  flashcardsRepasadas: boolean;
  quizAprobado: boolean;
  quizPorcentaje: number;
}

type ProgresoMap = Record<string, ProgresoTema>;

const STORAGE_KEY = 'isr-progreso-v1';
/** Porcentaje mínimo para aprobar un quiz (semáforo verde). */
export const UMBRAL_QUIZ = 80;

const vacio: ProgresoTema = {
  teoriaLeida: false,
  flashcardsRepasadas: false,
  quizAprobado: false,
  quizPorcentaje: 0,
};

interface ProgressContextValue {
  progreso: ProgresoMap;
  getProgresoTema: (temaId: string) => ProgresoTema;
  estadoTema: (temaId: string) => EstadoTema;
  marcarTeoriaLeida: (temaId: string) => void;
  marcarFlashcardsRepasadas: (temaId: string) => void;
  registrarQuiz: (temaId: string, porcentaje: number) => void;
  reiniciar: () => void;
}

const ProgressContext = createContext<ProgressContextValue | null>(null);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [progreso, setProgreso] = useState<ProgresoMap>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as ProgresoMap) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progreso));
    } catch {
      /* almacenamiento no disponible */
    }
  }, [progreso]);

  const actualizar = (temaId: string, cambios: Partial<ProgresoTema>) =>
    setProgreso((prev) => ({
      ...prev,
      [temaId]: { ...vacio, ...prev[temaId], ...cambios },
    }));

  const value: ProgressContextValue = {
    progreso,
    getProgresoTema: (id) => progreso[id] ?? vacio,
    marcarTeoriaLeida: (id) => actualizar(id, { teoriaLeida: true }),
    marcarFlashcardsRepasadas: (id) => actualizar(id, { flashcardsRepasadas: true }),
    registrarQuiz: (id, p) =>
      actualizar(id, { quizPorcentaje: p, quizAprobado: p >= UMBRAL_QUIZ }),
    reiniciar: () => setProgreso({}),
    estadoTema: (id) => {
      const p = progreso[id];
      if (!p) return 'no_iniciado';
      if (p.teoriaLeida && p.flashcardsRepasadas && p.quizAprobado) return 'completado';
      if (p.teoriaLeida || p.flashcardsRepasadas || p.quizPorcentaje > 0) return 'pendiente';
      return 'no_iniciado';
    },
  };

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error('useProgress debe usarse dentro de <ProgressProvider>');
  return ctx;
}

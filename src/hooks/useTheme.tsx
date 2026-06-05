import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';

export type Tema = 'claro' | 'oscuro' | 'sistema';

const STORAGE_KEY = 'isr-tema';

function sistemaPrefiereOscuro(): boolean {
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

function aplicarTema(tema: Tema) {
  const oscuro = tema === 'oscuro' || (tema === 'sistema' && sistemaPrefiereOscuro());
  document.documentElement.classList.toggle('dark', oscuro);
}

interface ThemeContextValue {
  tema: Tema;
  setTema: (t: Tema) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [tema, setTemaState] = useState<Tema>(() => {
    try {
      return (localStorage.getItem(STORAGE_KEY) as Tema) || 'sistema';
    } catch {
      return 'sistema';
    }
  });

  // Aplica el tema cuando cambia.
  useEffect(() => {
    aplicarTema(tema);
    try {
      localStorage.setItem(STORAGE_KEY, tema);
    } catch {
      /* almacenamiento no disponible */
    }
  }, [tema]);

  // Si está en "sistema", reacciona a los cambios del dispositivo.
  useEffect(() => {
    if (tema !== 'sistema') return;
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => aplicarTema('sistema');
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [tema]);

  return (
    <ThemeContext.Provider value={{ tema, setTema: setTemaState }}>
      {children}
    </ThemeContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme debe usarse dentro de <ThemeProvider>');
  return ctx;
}

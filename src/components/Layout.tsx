import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useRef, useState, useEffect, useCallback } from 'react';

/* --- Íconos --- */
const base = 'h-[22px] w-[22px]';
const IconInicio = () => (
  <svg className={base} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9.5 12 3l9 6.5" /><path d="M5 9v11h14V9" />
  </svg>
);
const IconUnidades = () => (
  <svg className={base} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3 21 8l-9 5-9-5z" /><path d="M3 13l9 5 9-5" /><path d="M3 17l9 5 9-5" />
  </svg>
);
const IconCalc = () => (
  <svg className={base} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="5" y="3" width="14" height="18" rx="2" /><line x1="8" y1="7" x2="16" y2="7" />
    <line x1="8" y1="11" x2="8" y2="11" /><line x1="12" y1="11" x2="12" y2="11" /><line x1="16" y1="11" x2="16" y2="11" />
    <line x1="8" y1="15" x2="8" y2="15" /><line x1="12" y1="15" x2="12" y2="15" />
  </svg>
);
const IconQuiz = () => (
  <svg className={base} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 11l3 3 9-9" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
  </svg>
);
const IconAjustes = () => (
  <svg className={base} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H2a2 2 0 0 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H8a1.65 1.65 0 0 0 1-1.51V2a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V8a1.65 1.65 0 0 0 1.51 1H22a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

const tabs = [
  { to: '/',             label: 'Inicio',   Icon: IconInicio,   end: true  },
  { to: '/unidades',     label: 'Unidades', Icon: IconUnidades, end: false },
  { to: '/calculadoras', label: 'Cálculos', Icon: IconCalc,     end: false },
  { to: '/quizzes',      label: 'Quizzes',  Icon: IconQuiz,     end: false },
  { to: '/ajustes',      label: 'Ajustes',  Icon: IconAjustes,  end: false },
];

const N = tabs.length;

export default function Layout() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const tabsRef  = useRef<HTMLDivElement>(null);
  const releaseTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const activeIndex = tabs.findIndex(({ to, end }) =>
    end ? pathname === to : pathname === to || pathname.startsWith(to + '/')
  );

  /*
   * Máquina de estados del indicador:
   *
   * continuousT = null  → posición calculada desde activeIndex (idle / post-spring)
   * continuousT = número → posición explícita (durante drag o snap final)
   * isPressing          → si el dedo está apoyado (controla forma y tamaño)
   * dragIndex           → tab bajo el dedo (para navegar al soltar)
   *
   * La transición spring se activa solo cuando isPressing=false.
   * Así evitamos el doble salto al soltar.
   */
  const [continuousT, setContinuousT] = useState<number | null>(null);
  const [isPressing,  setIsPressing]  = useState(false);
  const [dragIndex,   setDragIndex]   = useState<number | null>(null);

  /* Posición del indicador: explícita si la tenemos, sino desde activeIndex */
  const indicatorT = continuousT !== null ? continuousT : activeIndex * 100;

  /* Convierte clientX → { T: posición continua, idx: tab más cercano } */
  const fromX = useCallback((clientX: number) => {
    if (!tabsRef.current) return { T: activeIndex * 100, idx: activeIndex };
    const { left, width } = tabsRef.current.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (clientX - left) / width));
    const T   = Math.max(0, Math.min((N - 1) * 100, (ratio * N - 0.5) * 100));
    const idx = Math.max(0, Math.min(N - 1, Math.floor(ratio * N)));
    return { T, idx };
  }, [activeIndex]);

  /* touchmove no-passive para preventDefault (bloquea scroll) */
  useEffect(() => {
    const el = tabsRef.current;
    if (!el) return;
    const onMove = (e: TouchEvent) => {
      e.preventDefault();
      const { T, idx } = fromX(e.touches[0].clientX);
      setContinuousT(T);
      setDragIndex(idx);
    };
    el.addEventListener('touchmove', onMove, { passive: false });
    return () => el.removeEventListener('touchmove', onMove);
  }, [fromX]);

  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    clearTimeout(releaseTimer.current);
    /*
     * El indicador se QUEDA donde está (activeIndex * 100).
     * Solo activamos isPressing (escala + forma circular).
     * El drag real empieza con touchMove.
     */
    setContinuousT(activeIndex * 100);
    setDragIndex(activeIndex);
    setIsPressing(true);
  };

  const handleTouchEnd = () => {
    const finalIdx = dragIndex ?? activeIndex;
    /*
     * 1. Fijamos continuousT al destino ANTES de desactivar isPressing.
     *    Así la transición spring va desde la posición actual → destino,
     *    sin jamás pasar por el viejo activeIndex (que causa el salto errático).
     * 2. Desactivamos isPressing → habilita la transición spring.
     * 3. Navegamos → actualiza pathname/activeIndex en segundo plano.
     * 4. Después del spring (500 ms) limpiamos continuousT; para entonces
     *    activeIndex ya coincide con finalIdx y no hay movimiento visible.
     */
    setContinuousT(finalIdx * 100);
    setIsPressing(false);
    navigate(tabs[finalIdx].to);
    releaseTimer.current = setTimeout(() => {
      setContinuousT(null);
      setDragIndex(null);
    }, 500);
  };

  return (
    <div className="min-h-[100dvh] bg-slate-50 dark:bg-slate-950">
      <main style={{ paddingBottom: 'calc(max(env(safe-area-inset-bottom), 12px) + 6rem)' }}>
        <Outlet />
      </main>

      {/* ── Liquid Glass Nav ── */}
      <div
        className="fixed inset-x-0 bottom-0 z-10 flex justify-center"
        style={{ paddingBottom: 'max(env(safe-area-inset-bottom), 12px)' }}
      >
        <nav
          className="relative mx-4 w-full max-w-md rounded-[2rem]"
          style={{
            background: 'rgba(255,255,255,0.38)',
            backdropFilter: 'blur(32px) saturate(1.8)',
            WebkitBackdropFilter: 'blur(32px) saturate(1.8)',
            border: '1px solid rgba(255,255,255,0.55)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.12), 0 1px 0 rgba(255,255,255,0.6) inset',
            /* overflow visible para que el indicador salga por arriba al presionar */
            overflow: 'visible',
          }}
        >
          {/* Dark-mode overlay (clip a rounded corners manualmente) */}
          <div
            className="pointer-events-none absolute inset-0 rounded-[2rem] hidden dark:block"
            style={{ background: 'rgba(15,23,42,0.45)' }}
          />

          {/* Indicador — posición continua, forma cambia al presionar */}
          <div
            className="pointer-events-none absolute inset-y-0 flex items-center justify-center"
            style={{
              width: `${100 / N}%`,
              padding: '4px 5px',
              zIndex: 1,
              transform: `translateX(${indicatorT}%)`,
              /* Spring al soltar; sin transición mientras arrastra */
              transition: isPressing
                ? 'none'
                : 'transform 0.42s cubic-bezier(0.34,1.56,0.64,1)',
            }}
          >
            <div
              style={{
                width: '100%',
                height: '100%',
                background: 'radial-gradient(ellipse at 50% 45%, rgba(219,234,254,0.05) 0%, rgba(147,197,253,0.38) 60%, rgba(96,165,250,0.28) 100%)',
                border: '1.5px solid rgba(96,165,250,0.55)',
                boxShadow: '0 1px 16px rgba(59,130,246,0.18), 0 1px 0 rgba(255,255,255,0.7) inset',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                /*
                 * Pill → óvalo/círculo al presionar.
                 * transform-origin bottom: crece hacia arriba saliendo de la nav.
                 */
                borderRadius: isPressing ? '50%' : '1.2rem',
                transform: isPressing ? 'scale(1.35)' : 'scale(1)',
                transformOrigin: 'center bottom',
                transition: [
                  'border-radius 0.2s cubic-bezier(0.34,1.56,0.64,1)',
                  'transform 0.22s cubic-bezier(0.34,1.56,0.64,1)',
                ].join(', '),
              }}
            />
          </div>

          {/* Tabs */}
          <div
            ref={tabsRef}
            className="relative flex"
            style={{
              zIndex: 2,
              touchAction: 'none',
              WebkitUserSelect: 'none',
              userSelect: 'none',
            }}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onContextMenu={e => e.preventDefault()}
          >
            {tabs.map(({ to, label, Icon, end }) => {
              const isActive = end
                ? pathname === to
                : pathname === to || pathname.startsWith(to + '/');
              return (
                <button
                  key={to}
                  type="button"
                  onClick={() => navigate(to)}
                  className={`flex flex-1 flex-col items-center gap-0.5 py-3 text-[10px] font-semibold ${
                    isActive ? 'text-blue-800 dark:text-white' : 'text-slate-500 dark:text-slate-400'
                  }`}
                  style={{
                    transform: isActive ? 'scale(1.08)' : 'scale(1)',
                    transition: 'transform 0.3s cubic-bezier(0.34,1.56,0.64,1), color 0.2s',
                    WebkitTapHighlightColor: 'transparent',
                    background: 'none',
                    border: 'none',
                    outline: 'none',
                  }}
                >
                  <Icon />
                  <span>{label}</span>
                </button>
              );
            })}
          </div>
        </nav>
      </div>
    </div>
  );
}

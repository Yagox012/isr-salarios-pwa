import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useRef, useState, useEffect, useCallback } from 'react';

/* --- Íconos --- */
const base = 'h-[1.375rem] w-[1.375rem]';
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
  const tabsRef        = useRef<HTMLDivElement>(null);
  const releaseTimer   = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const collapseTimer  = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const activeIndex = tabs.findIndex(({ to, end }) =>
    end ? pathname === to : pathname === to || pathname.startsWith(to + '/')
  );

  const [continuousT, setContinuousT] = useState<number | null>(null);
  const [isExpanded,  setIsExpanded]  = useState(false);
  const [isDragging,  setIsDragging]  = useState(false);
  const isDraggingRef = useRef(false);
  const [dragIndex,   setDragIndex]   = useState<number | null>(null);
  const [glowKey,     setGlowKey]     = useState(0);
  const [glowPhase,   setGlowPhase]   = useState<'press' | 'release' | null>(null);
  const [glowX,       setGlowX]       = useState(50);
  const [isDark,      setIsDark]      = useState(() =>
    document.documentElement.classList.contains('dark')
  );

  useEffect(() => {
    const el = document.documentElement;
    const obs = new MutationObserver(() =>
      setIsDark(el.classList.contains('dark'))
    );
    obs.observe(el, { attributeFilter: ['class'] });
    return () => obs.disconnect();
  }, []);

  const getGlowX = useCallback((clientX: number) => {
    if (!tabsRef.current) return 50;
    const { left, width } = tabsRef.current.getBoundingClientRect();
    return Math.max(0, Math.min(100, ((clientX - left) / width) * 100));
  }, []);

  const indicatorT = continuousT !== null ? continuousT : activeIndex * 100;
  const navScale   = isExpanded ? 1.08 : 1;

  const navTransition = 'transform 0.58s cubic-bezier(0.34,1.56,0.64,1)';

  const fromX = useCallback((clientX: number) => {
    if (!tabsRef.current) return { T: activeIndex * 100, idx: activeIndex };
    const { left, width } = tabsRef.current.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (clientX - left) / width));
    const T   = Math.max(0, Math.min((N - 1) * 100, (ratio * N - 0.5) * 100));
    const idx = Math.max(0, Math.min(N - 1, Math.floor(ratio * N)));
    return { T, idx };
  }, [activeIndex]);

  /* touchmove no-passive para preventDefault */
  useEffect(() => {
    const el = tabsRef.current;
    if (!el) return;
    const onMove = (e: TouchEvent) => {
      e.preventDefault();
      if (!isDraggingRef.current) {
        isDraggingRef.current = true;
        setIsDragging(true);
      }
      const { T, idx } = fromX(e.touches[0].clientX);
      setContinuousT(T);
      setDragIndex(idx);
      setGlowX(getGlowX(e.touches[0].clientX));
    };
    el.addEventListener('touchmove', onMove, { passive: false });
    return () => el.removeEventListener('touchmove', onMove);
  }, [fromX, getGlowX]);

  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    clearTimeout(releaseTimer.current);
    clearTimeout(collapseTimer.current);
    isDraggingRef.current = false;
    const { T, idx } = fromX(e.touches[0].clientX);
    setIsDragging(false);
    setIsExpanded(true);
    setContinuousT(T);
    setDragIndex(idx);
    setGlowX(getGlowX(e.touches[0].clientX));
    setGlowPhase('press');
    setGlowKey(k => k + 1);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    e.preventDefault();
    isDraggingRef.current = false;
    const finalIdx = dragIndex ?? activeIndex;
    setContinuousT(finalIdx * 100);
    setIsDragging(false);
    navigate(tabs[finalIdx].to);
    setGlowX(getGlowX(e.changedTouches[0].clientX));
    setGlowPhase('release');
    setGlowKey(k => k + 1);
    collapseTimer.current = setTimeout(() => {
      setIsExpanded(false);
      releaseTimer.current = setTimeout(() => {
        setContinuousT(null);
        setDragIndex(null);
      }, 600);
    }, 150);
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
          className="relative mx-6 w-full max-w-md rounded-[2rem]"
          style={{
            background: 'rgba(15,23,42,0.32)',
            backdropFilter: 'blur(40px) saturate(2)',
            WebkitBackdropFilter: 'blur(40px) saturate(2)',
            border: '1px solid rgba(148,163,184,0.22)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.32), 0 1px 0 rgba(148,163,184,0.12) inset',
            overflow: 'hidden',
            willChange: 'transform',
            transform: `scale(${navScale})`,
            transformOrigin: 'center bottom',
            transition: navTransition,
          }}
        >
            {/* Dark-mode overlay */}
            {/* Burst — mask lateral suaviza bordes antes del clip */}
            {glowPhase && (
              <div
                key={glowKey}
                className="pointer-events-none absolute inset-0"
                style={{
                  background: `radial-gradient(ellipse 160% 130% at ${glowX}% 50%, ${
                    isDark
                      ? 'rgba(255,255,255,0.42) 0%, rgba(200,230,255,0.20) 28%, rgba(200,230,255,0.05) 46%, transparent 55%'
                      : 'rgba(255,255,255,1.00) 0%, rgba(210,240,255,0.75) 22%, rgba(210,240,255,0.14) 40%, transparent 52%'
                  })`,
                  maskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
                  WebkitMaskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
                  transformOrigin: `${glowX}% 50%`,
                  animation: glowPhase === 'press'
                    ? 'nav-glow-press 0.85s ease-out forwards'
                    : 'nav-glow-release 0.85s ease-out forwards',
                }}
              />
            )}
            {/* Held */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background: `radial-gradient(ellipse 55% 130% at ${glowX}% 50%, ${
                  isDark
                    ? 'rgba(255,255,255,0.22) 0%, rgba(200,230,255,0.08) 38%, transparent 55%'
                    : 'rgba(255,255,255,0.82) 0%, rgba(210,240,255,0.38) 32%, transparent 52%'
                })`,
                maskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
                WebkitMaskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
                opacity: isExpanded ? 1 : 0,
                transition: isExpanded ? 'opacity 0.5s ease' : 'opacity 0.35s ease',
              }}
            />

            {/* Indicador — pill rectangular */}
            <div
              className="pointer-events-none absolute inset-y-0 flex items-center justify-center"
              style={{
                width: `${100 / N}%`,
                padding: '4px 5px',
                zIndex: 1,
                transform: `translateX(${indicatorT}%)`,
                transition: isDragging
                  ? 'none'
                  : 'transform 0.38s cubic-bezier(0.34,1.56,0.64,1)',
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
                  borderRadius: '1.2rem',
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
                    className={`flex flex-1 flex-col items-center gap-0.5 py-3 text-[0.625rem] font-semibold transition-colors duration-150 ${
                      isActive
                        ? 'text-slate-900 dark:text-white'
                        : 'text-slate-500 dark:text-slate-300'
                    }`}
                    style={{
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

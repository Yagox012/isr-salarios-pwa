import { NavLink, Outlet, useLocation } from 'react-router-dom';

/* --- Íconos (SVG en línea, estilo Feather) --- */
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
  { to: '/', label: 'Inicio',   Icon: IconInicio,   end: true  },
  { to: '/unidades',     label: 'Unidades',  Icon: IconUnidades, end: false },
  { to: '/calculadoras', label: 'Cálculos',  Icon: IconCalc,     end: false },
  { to: '/quizzes',      label: 'Quizzes',   Icon: IconQuiz,     end: false },
  { to: '/ajustes',      label: 'Ajustes',   Icon: IconAjustes,  end: false },
];

export default function Layout() {
  const { pathname } = useLocation();

  const activeIndex = tabs.findIndex(({ to, end }) =>
    end ? pathname === to : pathname === to || pathname.startsWith(to + '/')
  );

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
        <nav className="relative mx-4 w-full max-w-md overflow-hidden rounded-[2rem]"
          style={{
            background: 'rgba(255,255,255,0.38)',
            backdropFilter: 'blur(32px) saturate(1.8)',
            WebkitBackdropFilter: 'blur(32px) saturate(1.8)',
            border: '1px solid rgba(255,255,255,0.55)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.12), 0 1px 0 rgba(255,255,255,0.6) inset',
          }}
        >
          {/* Dark-mode overlay */}
          <div className="pointer-events-none absolute inset-0 hidden dark:block rounded-[2rem]"
            style={{ background: 'rgba(15,23,42,0.45)' }}
          />

          {/* Sliding glass indicator circle */}
          {activeIndex >= 0 && (
            <div
              className="pointer-events-none absolute inset-y-0 flex items-center justify-center"
              style={{
                width: '20%',
                transform: `translateX(${activeIndex * 100}%)`,
                transition: 'transform 0.42s cubic-bezier(0.34, 1.56, 0.64, 1)',
              }}
            >
              <div
                className="h-[3.2rem] w-[3.2rem] rounded-full"
                style={{
                  background: 'rgba(255,255,255,0.55)',
                  boxShadow: '0 2px 16px rgba(0,0,0,0.10), 0 1px 0 rgba(255,255,255,0.9) inset',
                  border: '1px solid rgba(255,255,255,0.75)',
                  backdropFilter: 'blur(8px)',
                  WebkitBackdropFilter: 'blur(8px)',
                }}
              />
            </div>
          )}

          {/* Tabs */}
          <div className="relative flex">
            {tabs.map(({ to, label, Icon, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) =>
                  `flex flex-1 flex-col items-center gap-0.5 py-3 text-[11px] font-semibold transition-all duration-300 ${
                    isActive
                      ? 'text-blue-900 dark:text-white'
                      : 'text-slate-400/90 dark:text-slate-400'
                  }`
                }
                style={({ isActive }) => ({
                  transform: isActive ? 'scale(1.08)' : 'scale(1)',
                  transition: 'transform 0.3s cubic-bezier(0.34,1.56,0.64,1), color 0.2s',
                })}
              >
                <Icon />
                <span>{label}</span>
              </NavLink>
            ))}
          </div>
        </nav>
      </div>
    </div>
  );
}

interface PlaceholderProps {
  titulo: string;
  subtitulo: string;
  mensaje: string;
}

/** Pantalla temporal con la cabecera académica, para secciones aún por construir. */
export default function Placeholder({ titulo, subtitulo, mensaje }: PlaceholderProps) {
  return (
    <div className="text-slate-800">
      <header className="bg-blue-900 px-5 pb-6 pt-[max(1.5rem,env(safe-area-inset-top))] text-white">
        <p className="text-xs font-medium uppercase tracking-widest text-blue-300">{subtitulo}</p>
        <h1 className="mt-1 text-2xl font-bold leading-tight">{titulo}</h1>
      </header>
      <main className="mx-auto max-w-md px-5 py-6">
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center">
          <p className="text-sm text-slate-500">{mensaje}</p>
          <p className="mt-3 text-xs font-medium uppercase tracking-wide text-slate-400">
            Próximamente
          </p>
        </div>
      </main>
    </div>
  );
}

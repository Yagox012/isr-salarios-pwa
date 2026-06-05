import { useState, type ComponentPropsWithoutRef, type ElementType } from 'react';

/**
 * SpringCard<T> — física de resorte al presionar.
 * Comprime rápido (0.08s ease-out) → rebota al soltar con overshoot (0.52s spring).
 * Funciona como cualquier elemento: <SpringCard as={Link} to="..."> o <SpringCard as="button">
 */
export function SpringCard<T extends ElementType = 'div'>({
  as,
  children,
  style,
  ...props
}: {
  as?: T;
  children?: React.ReactNode;
  style?: React.CSSProperties;
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'style'>) {
  const [pressed, setPressed] = useState(false);
  const Tag = (as ?? 'div') as ElementType;
  return (
    <Tag
      {...props}
      style={{
        ...style,
        transform: pressed ? 'scale(0.964)' : 'scale(1)',
        transition: pressed
          ? 'transform 0.08s ease-out'
          : 'transform 0.52s cubic-bezier(0.34,1.56,0.64,1)',
      }}
      onTouchStart={() => setPressed(true)}
      onTouchEnd={() => setPressed(false)}
      onTouchCancel={() => setPressed(false)}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
    >
      {children}
    </Tag>
  );
}

/** Clases reutilizables para tarjetas Liquid Glass */
export const glassCard =
  'rounded-2xl border border-white/75 bg-white/72 p-5 backdrop-blur-xl ' +
  'shadow-[0_2px_20px_rgba(0,0,0,0.07),0_1px_0_rgba(255,255,255,0.88)_inset] ' +
  'dark:border-slate-700/40 dark:bg-slate-900/65 ' +
  'dark:shadow-[0_2px_20px_rgba(0,0,0,0.28),0_1px_0_rgba(255,255,255,0.04)_inset]';
